import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import rootReducer from './state/reducers/rootReducer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

