import { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ConnectionProvider, ConnectionContext } from './contexts/ConnectionContext'

import './App.css'

import Questions from './screens/Questions'
import QuestionDetails from './screens/QuestionDetails'
import Loading from './components/Loading'
import NoConnection from './components/NoConnection'

function App() {

  const Connection = ({ children }) => {

    const { health, handleRetry } = useContext(ConnectionContext);

    if (health !== 'OK' && health) {
      return <Loading />
    } else {
      if (health === 'OK') {
        return children
      } else {
        return (
          <NoConnection/>
        )
      }
    }
  }

  return (
    <BrowserRouter>
      <ConnectionProvider>
        <Routes>
          <Route
            exact path="/questions"
            element={
              <Connection>
                <Questions />
              </Connection>
            } />
          <Route
            path="/questions/:question_id"
            element={
              <Connection>
                <QuestionDetails />
              </Connection>
            } />
        </Routes>
      </ConnectionProvider>
    </BrowserRouter>
  )
}

export default App
