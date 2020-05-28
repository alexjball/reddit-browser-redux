export const pause = (timeoutMs = 0) =>
  new Promise(resolve => setTimeout(() => resolve(), timeoutMs));

export const settablePromise = () => {
  let resolve, reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  promise.resolve = value => {
    resolve(value);
    return promise;
  };
  promise.reject = value => {
    reject(value);
    return promise;
  };
  return promise;
};
