// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (
  ...a: Parameters<T>
) => TNewReturn;

// https://github.com/Microsoft/TypeScript/pull/24897
// https://github.com/Microsoft/TypeScript/issues/5453
// https://stackoverflow.com/questions/49429068/is-modifying-methods-return-type-by-decorator-possible/49429420#49429420

// Since the original question was answered typescript has improved the possible solution to this problem. With the addition of Tuples in rest parameters and spread expressions we now don't need to have all the overloads:

// type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (...a: Parameters<T>) => TNewReturn;
// Not only is this shorter but it solves a number of problems

// Optional parameters remain optional
// Argument names are preserved
// Works for any number of arguments
// Sample:

// type WithOptional = ReplaceReturnType<(n?: number)=> string, Promise<string>>;
// let x!: WithOptional; // Typed as (n?: number) => Promise<string>
// x() // Valid
// x(1); //Ok
// Original

// For a good solution you will need variadic types, but for now this answer provides a workable solution. (Posting it here as the type there is used as part of a solution to a different question).

// The basic idea is that we will extract the parameter types and recompose the function signature with the new return type. There are several disadvantages to this approach:

// Parameter names are not preserved
// Optional parameters are not handled well
// Only works for a specific number of arguments (but more can be added as needed)
// There may be other issues, but depending on your use-case this may be a good enough solution until the type system addresses this use case.

// type IsValidArg<T> = T extends object ? keyof T extends never ? false : true : true;
// type ReplaceReturnType<T, TNewReturn> = T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E, f: infer F, g: infer G, h: infer H, i: infer I, j: infer J) => infer R ? (
//     IsValidArg<J> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => TNewReturn :
//     IsValidArg<I> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => TNewReturn :
//     IsValidArg<H> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => TNewReturn :
//     IsValidArg<G> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => TNewReturn :
//     IsValidArg<F> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F) => TNewReturn :
//     IsValidArg<E> extends true ? (a: A, b: B, c: C, d: D, e: E) => TNewReturn :
//     IsValidArg<D> extends true ? (a: A, b: B, c: C, d: D) => TNewReturn :
//     IsValidArg<C> extends true ? (a: A, b: B, c: C) => TNewReturn :
//     IsValidArg<B> extends true ? (a: A, b: B) => TNewReturn :
//     IsValidArg<A> extends true ? (a: A) => TNewReturn :
//     () => TNewReturn
// ) : never
// The issue when used with optional parameters is that the optional parameter becomes required (and is of type A | undefined):

// type WithOptional = ReplaceReturnType<(n?: number)=> string, Promise<string>>;

// let x!: WithOptional;
// x(); //invalid
// x(undefined);
// x(1);
