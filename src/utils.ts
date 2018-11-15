import { __assign } from "./assign";
import { AjaxResponse, Observable } from "./rxjs-imports";

export { __assign }; // workaround to stop TS removing __assign import as unused

export const jsonContentTypes = [
  "application/json",
  "application/vnd.api+json"
];

export const apiRequest = (url: string, options = {}): Observable<any> => {
  return Observable.ajax({
    url,
    ...options,
    responseType: "json"
  }).map((res: AjaxResponse) => {
    if (res.status >= 200 && res.status < 300) {
      if (res.status === 204) {
        return res;
      }
      const header = res.xhr.getResponseHeader("Content-Type");
      if (
        typeof header === "string" &&
        jsonContentTypes.some(contentType => header.indexOf(contentType) > -1)
      ) {
        return res.response;
      }
    }
    return res;
  });
};

export const hasOwnProperties = (obj, propertyTree) => {
  if (obj instanceof Object === false) {
    return false;
  }
  const property = propertyTree[0];
  const hasProperty = obj.hasOwnProperty(property);
  if (hasProperty) {
    if (propertyTree.length === 1) {
      return hasProperty;
    }
    return hasOwnProperties(obj[property], propertyTree.slice(1));
  }
  return false;
};

export function find(array: any, predicate: Function) {
  for (let i = 0; i < array.length; i += 1) {
    if (predicate(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
}

export function findIndex(array: any, predicate: Function) {
  if (array.length === 0) {
    return -1;
  }

  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }

  return -1;
}
