type TAnyObject<T extends symbol | string | number = string> = Record<
  T,
  unknown
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TValueOf<T> = T extends any[] ? T[number] : T[keyof T];

type TArrayElement<A> = A extends readonly (infer T)[] ? T : never;
