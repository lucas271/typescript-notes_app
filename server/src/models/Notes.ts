import { UserModel } from './User'
import { v4 } from 'uuid'

interface noteInterface {
  title: string;
  date: Date;
  text: string;
  done: boolean;
  _id: string;
}

class Notes {
  public body: {
    title: string;
    date?: Date;
    text: string;
    done?: boolean;
    userId: string;
    noteId?: string;
  }

  public errors: string[]
  public note: null | noteInterface

  constructor (body: { title: string, date?:Date, text: string, done?:boolean, userId: string, noteId?: string,}) {
    this.body = body
    this.errors = []
    this.note = null
  }

  public async editNote () {
    if (!this.body.title && !this.body?.text) return this.errors.push('Empty fields')
    if (!this.body.userId) return this.errors.push('No user logged')
    if (!this.body.date) this.body.date = new Date()
    if (!this.body.done) this.body.done = false

    const user = await UserModel.findOne({ _id: this.body.userId })
    if (!user) return this.errors.push('no user found')
    const notes:noteInterface[] = user.notes
    if (!notes) return this.errors.push('no notes found')
    const noteToBeUpdated: noteInterface | undefined = notes.find(note => note._id === this.body.noteId)
    if (!noteToBeUpdated) return this.errors.push('note does not exist')
    const index = notes.indexOf(noteToBeUpdated)
    notes[notes.indexOf(noteToBeUpdated)] = {
      title: this.body.title,
      text: this.body.text,
      done: this.body.done,
      date: this.body.date,
      _id: notes[notes.indexOf(noteToBeUpdated)]._id
    }

    await UserModel.updateOne({ _id: this.body.userId }, { notes })

    this.note = {
      title: this.body.title,
      text: this.body.text,
      done: this.body.done,
      date: this.body.date,
      _id: notes[index]._id
    }
  }

  public async handleDone () {
    if (!this.body.userId) return this.errors.push('No user logged')

    const user = await UserModel.findOne({ _id: this.body.userId })
    if (!user) return this.errors.push('no user found')
    const notes:noteInterface[] = user.notes
    if (!notes) return this.errors.push('no notes found')

    const noteToBeUpdated: noteInterface | undefined = notes.find(note => note._id === this.body.noteId)
    if (!noteToBeUpdated) return this.errors.push('note does not exist')
    const index = notes.indexOf(noteToBeUpdated)
    notes[index] = {
      ...notes[index],
      done: !notes[index].done
    }
    await UserModel.updateOne({ _id: this.body.userId }, { notes })
    this.note = {
      ...notes[index]
    }
  }

  public async newNote () {
    if (!this.body.title && !this.body?.text) return this.errors.push('Empty fields')
    if (!this.body.userId) return this.errors.push('No user logged')
    if (!this.body.date) this.body.date = new Date()
    if (!this.body.done) this.body.done = false
    const _id = v4()

    await UserModel.updateOne({ _id: this.body.userId }, {
      $push: {
        notes: {
          title: this.body.title,
          text: this.body.text,
          done: this.body.done,
          date: this.body.date,
          _id
        }
      }
    })

    this.note = {
      title: this.body.title,
      text: this.body.text,
      done: this.body.done,
      date: this.body.date,
      _id
    }
  }

  public async deleteNote () {
    if (!this.body.userId) return this.errors.push('no user id received')
    if (!this.body.noteId) return this.errors.push('no note id received')

    const user = await UserModel.findOne({ _id: this.body.userId })
    if (!user) return this.errors.push('No user found')

    const notes: noteInterface[] = user?.notes
    const noteToBeDeleted = notes.find((note) => note._id === this.body.noteId)
    if (!noteToBeDeleted) return this.errors.push('note to be deleted does not exist on DB')

    await UserModel.updateOne({ _id: this.body.userId }, { $pull: { notes: noteToBeDeleted } })
    this.note = noteToBeDeleted
  }
}

export default Notes
