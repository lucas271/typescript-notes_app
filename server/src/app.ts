import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routes from './Routes'
dotenv.config()

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.routes()

    this.database()
  }

  private middlewares ():void {
    this.express.use(cors({ origin: process.env.CLIENT, credentials: true }))
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(express.json())
  }

  private database ():void {
    mongoose.connect(`${process.env.DATABASE}`)
  }

  private routes ():void {
    this.express.use(routes)
  }
}

export default new App().express
