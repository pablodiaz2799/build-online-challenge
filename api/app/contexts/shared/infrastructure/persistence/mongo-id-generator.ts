import { IdGenerator } from "contexts/shared/domain/id-generator"
import mongoose from "mongoose"
import { injectable } from "tsyringe"

@injectable()
export class MongoIdGenerator implements IdGenerator {
  generate(): string {
    return new mongoose.Types.ObjectId().toHexString()
  }
}
