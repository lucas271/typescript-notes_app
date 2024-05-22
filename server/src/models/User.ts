import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

export interface UserInterface extends Document{
  username: string,
  password: string,
  notes: []
}

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  notes: { type: Array, default: [], required: true },
  _id: { type: String, required: true }
}, {
  timestamps: true
})

export const UserModel = model<UserInterface>('UserNotes', UserSchema)

class User {
  public body: {
    username: string,
    password: string,
    repeatPassword?: string
  }

  public errors: string[]
  public user: null | UserInterface

  constructor (body: {password: string, repeatPassword: string, username: string}) {
    this.body = body
    this.errors = []
    this.user = null
  }

  public async login () {
    this.userValidation()
    if (this.errors.length > 0) return

    const checkIfUserExists = await UserModel.findOne({ username: this.body.username })
    if (!checkIfUserExists) return this.errors.push('user does not exist')

    const checkIfPasswordsMatch = bcrypt.compareSync(this.body.password, checkIfUserExists.password)

    if (!checkIfPasswordsMatch) return this.errors.push('wrong password')

    this.user = checkIfUserExists
  }

  public async register () {
    this.userValidation()
    if (this.errors.length > 0) return

    const checkIfUserExists = await UserModel.findOne({ username: this.body.username })
    if (checkIfUserExists) return this.errors.push('user already exists')

    const hashedPassword = bcrypt.hashSync(this.body.password, 6)

    this.user = await UserModel.create({ username: this.body.username, password: hashedPassword, _id: v4() })
  }

  private userValidation () {
    if (!this.body.username || !this.body.password) return this.errors.push('Empty spaces')

    if (this.body.password.length > 20) this.errors.push('password cannot be longer than 20 chars')
    if (this.body.password.length < 6) this.errors.push('password cannot be smaller than 20 chars')

    // validation for register
    if (!this.body.repeatPassword) return
    if (this.body.repeatPassword !== this.body.password) return this.errors.push('passwords must match')
  }
}

export default User
