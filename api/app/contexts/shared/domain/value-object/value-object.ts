import { InvalidArgumentError } from "../invalid-argument-error"

type Primitives = string | number | boolean | Date

export abstract class ValueObject<T extends Primitives> {
  public readonly value: T

  constructor(value: T) {
    this.value = value
    this.ensureValueIsDefined(value)
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentError(
        "[PrimitiveValueObject] Value must be defined: " + this.constructor.name
      )
    }
  }

  equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    )
  }

  toString(): string {
    return this.value.toString()
  }
}
