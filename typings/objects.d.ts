type TAnyObject<T extends symbol | string | number = string> = Record<
  T,
  unknown
>;
