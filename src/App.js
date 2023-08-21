import './App.css'

import { BrowserRouter, useRoutes } from 'react-router-dom'

import Desktop from './pages/Desktop'
import OfferRent from './pages/OfferRent'


import {
  useReducer,
} from 'react'

import {
  Context,
  initialState,
} from './store/Context'

import {
  reducer,
} from './store/reducer'

function RouteElements() {
  const routeElements = useRoutes([
    { path: '/', element: <Desktop /> },
    { path: '/offerrent', element: <OfferRent /> },
  ]);
  return routeElements
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <Context.Provider value={value}>
      <BrowserRouter>
        <RouteElements />
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
