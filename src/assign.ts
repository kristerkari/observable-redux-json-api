// tslint:disable
export var assignPolyfill = function __assign(t, ...args) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
  }
  return t;
};

export var __assign = Object.assign || assignPolyfill;
// tslint:enable
