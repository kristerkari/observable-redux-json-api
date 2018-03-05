import * as pluralize from "pluralize";
import { __assign } from "./assign";
import { find, findIndex, hasOwnProperties } from "./utils";

const equal = require("deep-equal");
const imm = require("object-path-immutable");

export { __assign }; // workaround to stop TS removing __assign import as unused

export const makeUpdateReverseRelationship = (
  resource,
  relationship,
  newRelation: any = {
    type: resource.type,
    id: resource.id
  }
) => {
  return foreignResources => {
    const idx = findIndex(
      foreignResources,
      item => item.id === relationship.data.id
    );

    if (idx === -1) {
      return foreignResources;
    }

    const [singular, plural] = [1, 2].map(i => pluralize(resource.type, i));
    const relCase = find([singular, plural], r =>
      hasOwnProperties(foreignResources[idx], ["relationships", r])
    );

    if (!relCase) {
      return foreignResources;
    }

    const relPath = ["relationships", relCase, "data"];
    const idxRelPath = [idx].concat(relPath);

    const immutableForeingResources = imm(foreignResources);

    if (!hasOwnProperties(foreignResources[idx], relPath)) {
      return immutableForeingResources.push(idxRelPath, newRelation).value();
    }

    const foreignResourceRel =
      foreignResources[idx].relationships[relCase].data;

    if (
      (newRelation &&
        Array.isArray(foreignResourceRel) &&
        findIndex(
          ~foreignResourceRel, // tslint:disable-line no-bitwise
          rel => rel.id === newRelation.id && rel.type === newRelation.type
        )) ||
      (newRelation &&
        foreignResourceRel &&
        foreignResourceRel.id === newRelation.id &&
        foreignResourceRel.type === newRelation.type)
    ) {
      return foreignResources;
    } else if (Array.isArray(foreignResourceRel) && !newRelation) {
      const relIdx = findIndex(
        foreignResourceRel,
        item => item.id === resource.id
      );

      if (foreignResourceRel[relIdx]) {
        const deletePath = [idx, "relationships", singular, "data", relIdx];
        return imm(foreignResources)
          .del(deletePath)
          .value();
      }

      return foreignResources;
    }

    if (relCase === singular) {
      return immutableForeingResources.set(idxRelPath, newRelation).value();
    }

    return immutableForeingResources.push(idxRelPath, newRelation).value();
  };
};

const stateContainsResource = (state, resource) => {
  const updatePath = [resource.type, "data"];

  if (hasOwnProperties(state, updatePath)) {
    return (
      findIndex(state[resource.type].data, item => item.id === resource.id) > -1
    );
  }

  return false;
};

export const addLinksToState = (state, links, options) => {
  if (options === undefined || options.indexLinks === undefined) {
    return state;
  }

  const indexLinkName = options.indexLinks;
  const newState = imm.set(state, `links.${indexLinkName}`, links);

  return newState;
};

export const updateOrInsertResource = (state, resource) => {
  if (typeof resource !== "object") {
    return state;
  }

  let newState = state;
  const updatePath = [resource.type, "data"];

  if (stateContainsResource(state, resource)) {
    const resources = state[resource.type].data;
    const idx = findIndex(resources, item => item.id === resource.id);

    if (resource.relationships) {
      const relationships = {};
      for (const relationship in resource.relationships) {
        if (!resource.relationships[relationship].data) {
          relationships[relationship] =
            resources[idx].relationships[relationship];
        }
      }

      __assign(resource.relationships, relationships);
    }

    if (!equal(resources[idx], resource)) {
      newState = imm.set(newState, updatePath.concat(idx), resource);
    }
  } else {
    newState = imm.push(newState, updatePath, resource);
  }

  const rels = resource.relationships;

  if (!rels) {
    return newState;
  }

  Object.keys(rels).forEach(relKey => {
    if (!hasOwnProperties(rels[relKey], ["data", "type"])) {
      return;
    }

    const entityPath = [rels[relKey].data.type, "data"];

    if (!hasOwnProperties(newState, entityPath)) {
      return;
    }

    const updateReverseRelationship = makeUpdateReverseRelationship(
      resource,
      rels[relKey]
    );

    newState = imm.set(
      newState,
      entityPath,
      updateReverseRelationship(newState[rels[relKey].data.type].data)
    );
  });

  return newState;
};

export const removeResourceFromState = (state, resource) => {
  const index = findIndex(state[resource.type].data, e => e.id === resource.id);
  const path = [resource.type, "data", index];
  const entityRelationships = resource.relationships || {};

  return Object.keys(entityRelationships).reduce((newState, key) => {
    if (!resource.relationships[key].data) {
      return newState;
    }

    const entityPath = [resource.relationships[key].data.type, "data"];

    if (hasOwnProperties(state, entityPath)) {
      const updateReverseRelationship = makeUpdateReverseRelationship(
        resource,
        resource.relationships[key],
        null
      );

      return newState.set(
        entityPath,
        updateReverseRelationship(
          state[resource.relationships[key].data.type].data
        )
      );
    }

    return newState;
  }, imm(state).del(path));
};

export const updateOrInsertResourcesIntoState = (state, resources) =>
  resources.reduce(updateOrInsertResource, state);

export const setIsInvalidatingForExistingResource = (
  state,
  { type, id },
  value: any = null
) => {
  const idx = findIndex(state[type].data, e => e.id === id && e.type === type);
  const updatePath = [type, "data", idx, "isInvalidating"];

  return value === null
    ? imm(state).del(updatePath)
    : imm(state).set(updatePath, value);
};

export const ensureResourceTypeInState = (state, type) => {
  const path = [type, "data"];
  return hasOwnProperties(state, [type])
    ? state
    : imm(state)
        .set(path, [])
        .value();
};
