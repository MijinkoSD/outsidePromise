/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

export interface OutsidePromise {
  promise: Promise<unknown>;
  resolve: (value: unknown) => void;
  // deno-lint-ignore no-explicit-any
  reject: (reason?: any) => void;
}

export function createNewPromise(): OutsidePromise {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    [resolve, reject] = [res, rej];
  });
  return {
    promise: promise,
    resolve: (resolve ? resolve : () => {}),
    reject: (reject ? reject : () => {}),
  };
}
