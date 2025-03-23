export function deepmerge<T>(target: T, source: T): T {
  const result = { ...target } as T;

  for (const key in source) {
    if (typeof source[key] === "object" && source[key] !== null) {
      result[key] = deepmerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}
