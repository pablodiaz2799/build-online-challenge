import { Router } from "express"

export interface IApiBase {
  baseRoute: string
  router: Router
}
