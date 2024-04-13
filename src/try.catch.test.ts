import * as assert from "node:assert";
import { describe, it } from "node:test";

import { tryCatch } from "./try.catch";
import { Equal, Expect } from "./type.utils";

describe("utils", () => {
  describe("tryCatch", () => {
    it("should handle sync success", () => {
      const res = tryCatch()(() => {
        return 123;
      });

      assert.ok(res.success);
      assert.ok(res.data === 123);

      type R = typeof res;
      type TestReturnType = Expect<Equal<R["data"], number>>;
    });
    it("should handle sync failure", () => {
      const error = new Error();
      const res = tryCatch<Error>()(() => {
        throw error;
      });

      assert.ok(!res.success);
      assert.ok(res.error === error);

      type R = typeof res;
      type TestErrorType = Expect<Equal<R["error"], Error>>;
    });
    it("should handle async success", async () => {
      const res = await tryCatch()(async () => {
        return 123;
      });

      assert.ok(res.success);
      assert.ok(res.data === 123);

      type R = typeof res;
      type TestReturnType = Expect<Equal<R["data"], number>>;
    });
    it("should handle async failure", async () => {
      const error = new Error();
      const res = await tryCatch<Error>()(async () => {
        throw error;
      });

      assert.ok(!res.success);
      assert.ok(res.error === error);

      type R = typeof res;
      type TestErrorType = Expect<Equal<R["error"], Error>>;
    });
  });
});
