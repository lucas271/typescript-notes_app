import { Request, Response } from 'express'
import User from '../models/User'

class UserController {
  public async register (req: Request, res: Response): Promise<Response> {
    try {
      const user = new User(req.body)
      await user.register()

      if (user.errors.length > 0) return res.json({ errors: [...user.errors] })
      return res.json({ username: user.user?.username, notes: user.user?.notes, _id: user.user?._id })
    } catch (error) {
      return res.json({ errors: ['server error'] })
    }
  }

  public async logout (req: Request, res: Response): Promise<Response> {
    try {
      return res.json('user logged out')
    } catch (error) {
      return res.json({ errors: [error] })
    }
  }

  public async login (req: Request, res: Response): Promise<Response> {
    try {
      const user = new User(req.body)
      await user.login()

      if (user.errors.length > 0) return res.json({ errors: [...user.errors] })
      return res.json(user.user)
    } catch (error) {
      return res.json({ errors: [error] })
    }
  }
}

export default new UserController()
