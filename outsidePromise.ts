/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

export interface OutsidePromise<Res> {
  promise: Promise<Res>;
  resolve: (value: Res) => void;
  // deno-lint-ignore no-explicit-any
  reject: (reason?: any) => void;
}

export function createNewPromise<Res>(): OutsidePromise<Res> {
  let resolve, reject;
  const promise = new Promise((res: (value: Res) => void, rej) => {
    [resolve, reject] = [res, rej];
  });
  return {
    promise: promise,
    resolve: (resolve ? resolve : () => {}),
    reject: (reject ? reject : () => {}),
  };
}