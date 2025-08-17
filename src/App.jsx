import React from 'react'
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter } from "react-router"
import { RouterProvider } from 'react-router';

import { Provider } from 'react-redux'

import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { store } from './store/store';
import Layout from './components/layout';
import Connections from './pages/Connections';
import Requests from './pages/Requests';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // default route "/"
        element: <Home />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "connections",
        element: <Connections />
      },
      {
        path: "requests",
        element: <Requests />
      }
    ]
  },
  {
    path: "/sign-in",
    element: <Login />
  },
  {
    path: "/sign-up",
    element: <Signup />
  },
])

function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />

      </Provider>
    </>
  )
}

export default App
