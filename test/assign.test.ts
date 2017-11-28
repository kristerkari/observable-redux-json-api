import { __assign, assignPolyfill } from "../src/assign";

describe("Typescript helper __assign", () => {
  it("should have assign function defined in jsonapi file", () => {
    expect(typeof __assign).toBe("function");
  });

  it("should clone objects", () => {
    const o1 = { a: 1 };
    const o2 = { b: 2 };
    const o3 = { c: 3 };
    expect(__assign({}, { a: 1 })).toEqual({ a: 1 });
    expect(__assign(o1, o2, o3)).toEqual({ a: 1, b: 2, c: 3 });
    expect(__assign(o1)).toEqual({ a: 1, b: 2, c: 3 });
  });
});

describe("assign polyfill", () => {
  it("should be defined", () => {
    expect(typeof assignPolyfill).toBe("function");
  });

  it("should clone objects", () => {
    const o1 = { a: 1 };
    const o2 = { b: 2 };
    const o3 = { c: 3 };
    expect(assignPolyfill({}, { a: 1 })).toEqual({ a: 1 });
    expect(assignPolyfill(o1, o2, o3)).toEqual({ a: 1, b: 2, c: 3 });
    expect(assignPolyfill(o1)).toEqual({ a: 1, b: 2, c: 3 });
  });
});
