export const buildQueryString = (
  searchParams: URLSearchParams,
  allowedParams: string[]
): string => {
  const backendParams = new URLSearchParams();

  allowedParams.forEach((param) => {
    const value = searchParams.get(param);
    if (value) {
      backendParams.append(param, value);
    }
  });

  return backendParams.toString();
};
