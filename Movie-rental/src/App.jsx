import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MoviesList from './components/MoviesList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MoviesList />
    </div>
  )
}

export default App
