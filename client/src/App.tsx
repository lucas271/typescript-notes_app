import React from 'react'
import { Provider } from 'react-redux'
import store from './services/store'

import RoutesComponent from './Routes'
import './styles/global.scss'

function App () {
  return (
    <div className="App">
      <Provider store={store}>
        <RoutesComponent />
      </Provider>
    </div>
  )
}

export default App
