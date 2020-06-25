import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import axios from "axios";
import { verifyCredentials } from './state/actions/redux-token-auth-config.js'
import store from './state/store/configureStore.js'

axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

verifyCredentials(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

