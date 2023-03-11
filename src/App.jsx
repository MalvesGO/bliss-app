import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { ConnectionProvider, ConnectionContext } from './contexts/ConnectionContext'

import './App.css'

import Questions from './screens/Questions'
import QuestionDetails from './screens/QuestionDetails'
import NoConnection from './components/NoConnection'

function App() {

  const Connection = ({ children }) => {
    const { health } = useContext(ConnectionContext);
    if(health === 'Network Error'){
      return <NoConnection />
    } else {
      return children
    }
  }

  return (
    <BrowserRouter>
      <ConnectionProvider>
        <Routes>
          <Route
            exact path="/"
            element={
              <Connection>
                <Navigate to="/questions" />
              </Connection>
            } />
          <Route
            path="/questions"
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
