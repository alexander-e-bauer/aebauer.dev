export function withAbort<TArgs extends any[], TRes>(fn: (...args: TArgs) => Promise<TRes>) {
  let controller: AbortController | null = null;

  return async (...args: TArgs): Promise<TRes> => {
    if (controller) controller.abort();
    controller = new AbortController();
    try {
      return await fn(...args);
    } finally {
      controller = null;
    }
  };
}