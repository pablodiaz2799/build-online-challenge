/* eslint-disable */
import { container, injectable } from "tsyringe"
import express from "express"
import dotenv from "dotenv"
import http from "http"
import { RegistryService } from "./services/registry.service"
import { db } from "./config/db-config"
import cors from 'cors';


@injectable()
class Server {
  private app: express.Express | undefined
  private server: http.Server = {} as http.Server

  constructor(private registry: RegistryService) {
    // Get environment vars
    dotenv.config()
  }

  public up = (): Promise<http.Server> => {
    return new Promise((resolve, reject) => {
      this.registry.registerDependencies()
      this.registry.init()

      this.app = express()
      this.app.use(cors())
      this.app.use(express.json())
      this.app.use(express.static('public'));

      // Start Server: Main point of entry
      this.server = this.app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`)

        // Connect to database
        db.then(() => {
          console.log("Database connection successful!")
          resolve(this.server)
        }).catch((err) => {
          reject(new Error(`Unable to connect to database: ${err}`))
        })
      })

      this.registry.connect(this.app)
    })
  }
}
export { Server }
