import { AnyAction, configureStore, Store, ThunkDispatch } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlicer'
import notesSlice from './features/notes/notesSlice'

const rootReducer = { userSlice, notesSlice }

const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {dispatch: AppThunkDispatch}

export default store
