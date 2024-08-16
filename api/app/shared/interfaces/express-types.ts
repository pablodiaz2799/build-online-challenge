import { type Request } from "express"
import { type Query, type ParamsDictionary } from "express-serve-static-core"

export interface TypedRequest<T extends Query, U> extends Request {
  body: U
  query: T
  params: ParamsDictionary
}

export interface TypedAuthRequest<T extends Query, U> extends Request {
  body: U
  query: T
  params: ParamsDictionary
  user: {
    id: string
    email: string
  }
}
