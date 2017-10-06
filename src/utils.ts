import "rxjs/add/observable/dom/ajax";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
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
