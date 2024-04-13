import { Result } from "./result";

type Fn<T> = (...args: any) => T;

type AsyncReturnType<T extends (...args: any) => PromiseLike<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

export function tryCatch<E = unknown>() {
  function retFn(fn: Fn<never>): Result<never, E>;
  function retFn<T>(
    fn: Fn<T>,
  ): T extends PromiseLike<unknown>
    ? Promise<Result<AsyncReturnType<Fn<T>>, E>>
    : Result<T, E>;
  function retFn(fn: Fn<unknown>): unknown {
    try {
      const res = fn();
      const isAsync = Promise.resolve(res) === res;

      if (isAsync)
        return Promise.resolve(res)
          .then((ret) => ({
            success: true,
            data: ret,
          }))
          .catch((error) => ({
            success: false,
            error,
          }));

      return {
        success: true,
        data: res,
      };
    } catch (e) {
      // is sync
      return {
        success: false,
        error: e,
      };
    }
  }

  return retFn;
}
