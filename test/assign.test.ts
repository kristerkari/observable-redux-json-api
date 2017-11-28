import { assignPolyfill as __assign } from "../src/assign";

describe("assign polyfill", () => {
  it("should be defined", () => {
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
