/**
 * Helper for change store in non-action function
 *
 * Should be define in target model in actions section
 *
 * @param callback Function in which you will change target store
 * @returns T
 */
export function runInAction<T = void>(fn: () => T): T {
  return fn() as T;
}
