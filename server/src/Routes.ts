import { Router } from 'express'
import UserController from './controllers/UserController'
import NoteController from './controllers/NoteController'

const routes = Router()

routes.post('/createUser', UserController.register)
routes.post('/loginUser', UserController.login)
routes.post('/logout', UserController.logout)

routes.post('/newNote', NoteController.createNote)
routes.put('/updateNote', NoteController.updateNote)
routes.put('/deleteNote', NoteController.deleteNote)
routes.put('/handleDone', NoteController.handleDone)

export default routes
