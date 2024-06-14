/**
 * Creates a canceler used to abort http requests.
 * <br />
 * Pass the `canceler` to the request (usually as last argument), invoke `cancel()` to abort the request.
 */
export const createApiCallCanceler = (): {
  cancel: () => void;
  canceler: Promise<void>;
} => {
  let cancel = () => {};
  const canceler = new Promise<void>(resolve => {
    cancel = resolve;
  });
  return {canceler, cancel};
};
