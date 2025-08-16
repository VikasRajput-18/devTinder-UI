import React from 'react'
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, Outlet } from "react-router"
import { RouterProvider } from 'react-router';

import { Provider } from 'react-redux'

import Header from './components/header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { store } from './store/store';

function Layout() {
  return (
    <>
      <Header />
      <main className="">
        <Outlet /> {/* <- child routes will render here */}
      </main>
    </>
  );
}

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
