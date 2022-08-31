import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'; 
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'

const app = createRoot(document.querySelector('#root'));

app.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)
