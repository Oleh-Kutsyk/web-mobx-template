/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Helper for return correct type of this in case when
 * you get 'this Is referenced directly or indirectly in its own type annotation' error
 *
 * @param that Reference to 'this'
 * @returns T
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const returnTypedThis = <T>(that: any): T => that as T;
