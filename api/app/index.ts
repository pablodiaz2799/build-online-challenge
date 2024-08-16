import "reflect-metadata"
import { Server } from "./server"
import { container } from "tsyringe"

const app = container.resolve(Server)
exports.default = app.up()
