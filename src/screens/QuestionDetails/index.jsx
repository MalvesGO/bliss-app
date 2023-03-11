// style
import './index.css'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// api
import api from '../../services/api'

// components
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import QuestionHeader from '../../components/QuestionHeader'
import Quiz from '../../components/Quiz'

const QuestionDetails = () => {

  const { question_id } = useParams();

  const [question, setQuestion] = useState([])
  const [choices, setChoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState();

  async function getQuestion() {
    // GET /questions/:question_id
    try {
      const response = await api.get(`/questions/${question_id}`)
      setLoading(false)
      setQuestion(response.data)
      setChoices(response.data.choices)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleVote() {
    // PUT /questions/:question_id
    try {
      const response = await api.put(`/questions/${question_id}`, { choice: active });
      if (response.status === 201) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your vote has been successfully submitted',
          showConfirmButton: false,
          timer: 3000
        })
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error in submitting your vote',
          showConfirmButton: false,
          timer: 3000
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getQuestion()
  }, [])

  return (
    <>
      <Header />
      <div className='container'>
        {
          loading ? <Loading /> : (
            <>
              {/* question header */}
              <QuestionHeader question={question} />

              {/* quiz component */}
              <Quiz
                question={question}
                choices={choices}
                active={active}
                setActive={setActive}
                handleVote={handleVote}
              />
            </>
          )
        }
      </div>
    </>
  )
}

export default QuestionDetails