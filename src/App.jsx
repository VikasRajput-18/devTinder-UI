import React from 'react'
import { Button } from './components/ui/button'
import Header from './components/header'

function App() {

  return (
    <section className="bg-card-foreground h-screen w-full">
      <Header />
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button>Button</Button>
      </div>
    </section>
  )
}

export default App
