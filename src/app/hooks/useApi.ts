import { useState, useCallback } from "react";

type ApiFunction<TParams extends any[], TResponse> = (
  ...args: TParams
) => Promise<TResponse>;

interface ApiState<TResponse> {
  data: TResponse | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<TParams extends any[], TResponse>(
  apiFunc: ApiFunction<TParams, TResponse>
): [(...args: TParams) => Promise<void>, ApiState<TResponse>] {
  const [state, setState] = useState<ApiState<TResponse>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: TParams) => {
      try {
        setState({ data: null, loading: true, error: null });
        const result = await apiFunc(...args);
        setState({ data: result, loading: false, error: null });
      } catch (err) {
        setState({ data: null, loading: false, error: err as Error });
        throw err;
      }
    },
    [apiFunc]
  );

  return [execute, state];
}
