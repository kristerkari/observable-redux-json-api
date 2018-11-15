declare module "observable-redux-json-api" {
  import { Action } from "redux";
  import { ThunkAction } from "redux-thunk";
  function createResource<R, S, E>(resource: Resource): ThunkAction<R, S, E>;
  function readEndpoint<R, S, E>(endpoint: Path): ThunkAction<R, S, E>;
  function updateResource<R, S, E>(resource: object): ThunkAction<R, S, E>;
  function deleteResource<R, S, E>(resource: object): ThunkAction<R, S, E>;
  function hydrateStore<R, S, E>(resource: object): ThunkAction<R, S, E>;
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
