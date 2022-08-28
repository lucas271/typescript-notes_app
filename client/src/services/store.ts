import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

const rootReducer = {

}

const store = configureStore<any>({
    reducer: rootReducer,

})

export default store