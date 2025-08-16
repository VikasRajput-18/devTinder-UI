import React from 'react'
import { Button } from './components/ui/button'
import Header from './components/header';
import { createBrowserRouter, Outlet } from "react-router"
import { RouterProvider } from 'react-router';

function Layout() {
  return (
    <>
      <Header />
      <main className="bg-card-foreground min-h-screen w-full">
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
        element:
          <p className='text-white'>Hi My Name is Viaks</p>

      }
    ]
  },
  {
    path: "/sign-up",
    element: <div>Sign Up</div>
  },
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
