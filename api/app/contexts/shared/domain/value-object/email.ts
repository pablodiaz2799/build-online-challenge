import { ValueObject } from "./value-object"
import { InvalidEmailError } from "../invalid-email-error"

export class EmailValueObject extends ValueObject<string> {
  constructor(value: string, isOptional = false) {
    super(value)

    if (
      !isOptional ||
      (value !== undefined && value !== null && value !== "")
    ) {
      this.ensureIsValidEmail(value)
    }
  }

  private ensureIsValidEmail(value: string): void {
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(value)) {
      throw new InvalidEmailError(value)
    }
  }
}
