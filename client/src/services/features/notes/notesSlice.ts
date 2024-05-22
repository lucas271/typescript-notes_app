import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Note } from '../../../types/note'

const config = {
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true
}

export const createNoteThunk = createAsyncThunk('notes/createNote', async ({ title, text }: {title: string, text: string}) => {
  try {
    const user = JSON.parse(String(localStorage.getItem('user')))
    if (user) {
      const { data } = await axios.post('https://vuechatwnodeapi-1t2r.onrender.com/newNote', { title, text, userId: user._id }, config)
      if (data.errors) return { errors: data.errors }
      if (data.note) {
        localStorage.setItem('user', JSON.stringify({ ...user, notes: [data.note, ...user.notes] }))
        return { note: [data.note] }
      }
    }
    if (!user) {
      return { errors: ['no user logged in'] }
    }
  } catch (error) {
    return { errors: ['server error'] }
  }
})

export const editNoteThunk = createAsyncThunk('notes/updateNote', async ({ noteId, title, text }: {noteId: string, title: string, text: string}) => {
  try {
    const user = JSON.parse(String(localStorage.getItem('user')))
    console.log(noteId, title, text)
    if (user) {
      const { data } = await axios.put('https://vuechatwnodeapi-1t2r.onrender.com/updateNote', { title, text, userId: user._id, noteId }, config)
      if (data.errors) return { errors: data.errors }
      if (data.note) {
        const notes: Note[] = user.notes
        const noteToBeDeleted = notes.find(note => note._id === data.note._id)
        if (!noteToBeDeleted) return { errors: ['note does not exist'] }
        user.notes.splice(user.notes.indexOf(noteToBeDeleted), 1, data.note)
        localStorage.setItem('user', JSON.stringify({ ...user, notes: [...user.notes] }))
        return { note: [data.note] }
      }
    }
    if (!user) {
      return { errors: ['No user logged in'] }
    }
  } catch (error) {
    return { errors: ['server error'] }
  }
})

export const handleDone = createAsyncThunk('/notes/handleDone', async ({ noteId }: {noteId: string}) => {
  try {
    const user = JSON.parse(String(localStorage.getItem('user')))
    if (user) {
      const { data } = await axios.put('https://vuechatwnodeapi-1t2r.onrender.com/handleDone', { userId: user._id, noteId }, config)
      if (data.errors) return { errors: data.errors }
      if (data.note) {
        const notes: Note[] = user.notes
        const noteToBeEdited = notes.find(note => note._id === data.note._id)
        if (!noteToBeEdited) return { errors: ['note does not exist'] }
        user.notes.splice(user.notes.indexOf(noteToBeEdited), 1, data.note)
        localStorage.setItem('user', JSON.stringify({ ...user, notes: [...user.notes] }))
        return { note: [data.note] }
      }
    } else if (!user) {
      return { errors: ['no user logged in'] }
    }
  } catch (error) {
    return { errors: ['server error'] }
  }
})

export const deleteNoteThunk = createAsyncThunk('notes/deleteUser', async ({ noteId, title, text }: {noteId: string, title: string, text: string}) => {
  try {
    const user = JSON.parse(String(localStorage.getItem('user')))
    if (user) {
      const { data } = await axios.put('https://vuechatwnodeapi-1t2r.onrender.com/deleteNote', { title, text, userId: user._id, noteId }, config)
      if (data.errors) return { errors: data.errors }
      if (data.note) {
        const notes: Note[] = user.notes
        const noteToBeDeleted = notes.find(note => note._id === data.note._id)
        if (!noteToBeDeleted) return { errors: ['already deleted'] }
        user.notes.splice(user.notes.indexOf(noteToBeDeleted), 1)
        localStorage.setItem('user', JSON.stringify({ ...user, notes: [...user.notes] }))
        return { note: [data.note] }
      }
    }
    if (!user) {
      return { errors: ['no user logged in'] }
    }
  } catch (error) {
    return { errors: ['server error'] }
  }
})

export type NotesType = {
    notes: Note[],
    loading: boolean,
    errors: string[]
}

const initialState: NotesType = {
  notes: [],
  loading: false,
  errors: []
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(createNoteThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createNoteThunk.fulfilled, (state, action) => {
      state.errors = []
      state.loading = false
      if (action.payload?.errors) state.errors = action.payload.errors
      if (action.payload?.note) state.notes = action.payload.note
    })
    builder.addCase(createNoteThunk.rejected, (state) => {
      state.loading = false
      state.errors = ['error']
    })
    builder.addCase(deleteNoteThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteNoteThunk.fulfilled, (state, action) => {
      state.errors = []
      state.loading = false
      if (action.payload?.errors) state.errors = action.payload.errors
      if (action.payload?.note) state.notes = action.payload.note
    })
    builder.addCase(deleteNoteThunk.rejected, (state) => {
      state.loading = false
      state.errors = ['error']
    })
    builder.addCase(editNoteThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(editNoteThunk.fulfilled, (state, action) => {
      state.errors = []
      state.loading = false
      if (action.payload?.errors) state.errors = action.payload.errors
      if (action.payload?.note) state.notes = action.payload.note
    })
    builder.addCase(editNoteThunk.rejected, (state) => {
      state.loading = false
      state.errors = ['error']
    })
    builder.addCase(handleDone.pending, (state) => {
      state.loading = true
    })
    builder.addCase(handleDone.fulfilled, (state, action) => {
      state.errors = []
      state.loading = false
      if (action.payload?.errors) state.errors = action.payload.errors
      if (action.payload?.note) state.notes = action.payload.note
    })
    builder.addCase(handleDone.rejected, (state) => {
      state.loading = false
      state.errors = ['error']
    })
  }
})

export default notesSlice.reducer
