import { Request, Response } from 'express'
import Notes from '../models/Notes'

class NoteController {
  public async updateNote (req:Request, res:Response): Promise<Response> {
    try {
      const notes = new Notes(req.body)
      await notes.editNote()

      if (notes.errors.length > 0) return res.send({ errors: [...notes.errors] })
      return res.send({ note: notes.note })
    } catch (error) {
      return res.send({ errors: ['server error'] })
    }
  }

  public async handleDone (req:Request, res:Response): Promise<Response> {
    try {
      const notes = new Notes(req.body)
      await notes.handleDone()

      if (notes.errors.length > 0) return res.send({ errors: [...notes.errors] })
      return res.send({ note: notes.note })
    } catch (error) {
      return res.send({ errors: ['server error'] })
    }
  }

  public async createNote (req:Request, res:Response): Promise<Response> {
    try {
      const notes = new Notes(req.body)
      await notes.newNote()

      if (notes.errors.length > 0) return res.send({ errors: [...notes.errors] })
      return res.send({ note: notes.note })
    } catch (error) {
      return res.send({ errors: ['server error'] })
    }
  }

  public async deleteNote (req:Request, res:Response): Promise<Response> {
    try {
      const notes = new Notes(req.body)
      await notes.deleteNote()

      if (notes.errors.length > 0) return res.send({ errors: [...notes.errors] })
      return res.send({ note: notes.note })
    } catch (error) {
      return res.send({ erros: ['server error'] })
    }
  }
}

export default new NoteController()
