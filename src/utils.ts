import "rxjs/add/observable/dom/ajax";
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { AjaxResponse } from "rxjs/observable/dom/AjaxObservable";

export const jsonContentTypes = [
  "application/json",
  "application/vnd.api+json"
];

export const apiRequest = (url: string, options = {}): Observable<any> => {
  return Observable.ajax({
    url,
    ...options,
    responseType: "json"
  })
    .switchMap((res: AjaxResponse): Observable<any> => {
      if (res.status >= 200 && res.status < 300) {
        if (res.status === 204) {
          return Observable.of(res);
        }
        const header = res.xhr.getResponseHeader("Content-Type");
        if (
          typeof header === "string" &&
          jsonContentTypes.some(contentType => header.indexOf(contentType) > -1)
        ) {
          return Observable.of(res.response);
        }
      }
      return Observable.of(res);
    })
    .catch((err: Response): Observable<any> => Observable.throw(err));
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
