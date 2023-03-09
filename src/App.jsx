import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import api from './services/api'

import Questions from './screens/Questions'
import QuestionDetails from './screens/QuestionDetails'

function App() {

  const [health, setHealth] = useState([])

  async function serverHealth() {
    // GET /health
    try {
      const response = await api.get('/health')
      setHealth(response.data.status)
    } catch (error) {
      console.log(error)
    }
  }

  function handleRetry() {
    serverHealth()
  }

  useEffect(() => {
    serverHealth()
  }, [])

  return (
    <>
      {health === 'OK' ? (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Questions />} />
            <Route path="/questions/:question_id" element={<QuestionDetails />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <div className="serverDown">
          <div className='message'>
            <h1>Server is down</h1>
            <button className='buttonRetry' onClick={handleRetry}>
              Retry
            </button>
          </div>
        </div>
      )
      }
    </>
  )
}

export default App
