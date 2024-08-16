/* eslint-disable */
type Methods<T> = {
  [P in keyof T]: T[P] extends Function ? P : never
}[keyof T]

type MethodsAndProperties<T> = { [key in keyof T]: T[key] }

type Properties<T> = Omit<MethodsAndProperties<T>, Methods<T>>

type PrimitiveTypes = string | number | boolean | Date | undefined | null

//If T is a primitive type, the type T itself is returned.
//If T is an object with a value property, the type U is inferred from the value property and returned.
//If T is an array of objects with a value property, an array of type U is returned.
//If T is an array of values, an array of type ValueObjectValue<U> is returned.

//If T is an object with properties whose values need to be extracted then the Properties<T> type is used to extract the properties of T excluding any methods.
//For each property, the type U is inferred and returned.

// If none of the above conditions are met, the type never is returned.
type ValueObjectValue<T> = T extends PrimitiveTypes
  ? T
  : T extends { value: infer U }
  ? U
  : T extends Array<{ value: infer U }>
  ? U[]
  : T extends Array<infer U>
  ? Array<ValueObjectValue<U>>
  : T extends { [K in keyof Properties<T>]: infer U }
  ? { [K in keyof Properties<T>]: ValueObjectValue<Properties<T>[K]> }
  : never

export type Primitives<T> = {
  [key in keyof Properties<T>]: ValueObjectValue<T[key]>
}
