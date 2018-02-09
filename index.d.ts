declare module "observable-redux-json-api" {
  import { Action, Reducer } from "redux";
  import { ThunkAction } from "redux-thunk";
  function createResource(resource: Resource): ThunkAction<any, any, any>;
  function readEndpoint(endpoint: Path): ThunkAction<any, any, any>;
  function updateResource(resource: object): ThunkAction<any, any, any>;
  function deleteResource(resource: object): ThunkAction<any, any, any>;
  function hydrateStore(resource: object): ThunkAction<any, any, any>;
  function setAccessToken(token: Token): Action;
  function setEndpointHost(host: string): Action;
  function setEndpointPath(path: string): Action;
  function setHeader(headers: object): Action;
  function setHeaders(headers: Headers): Action;

  // type reducer = Reducer<any>;
  const reducer: any;

  type Headers = {
    Authorization?: string | null | undefined;
    "Content-type"?: string | null | undefined;
    Accept?: string | null | undefined;
  };

  type Resource = {
    id?: number | undefined | null;
    type: string;
    attributes: object;
    relationships?: object | undefined;
  };

  type Token = string | null;

  type Path = string;
}
