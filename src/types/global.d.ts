/**
 * 一部のkeyをoptionalにします
 * @example
 * type User = { name: string, email: string, age: number }
 * Optional<User, "name" | "age">
 * // => { name?: string, email: string, age?: number }
 */
declare type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
