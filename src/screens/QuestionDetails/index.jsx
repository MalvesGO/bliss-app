import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import { IoMdArrowRoundBack } from 'react-icons/io'

import './index.css'

import api from '../../services/api'

import Header from '../../components/Header'
import Loading from '../../components/Loading'

const QuestionDetails = () => {

  const params = useParams();

  const [question, setQuestion] = useState([])
  const [choices, setChoices] = useState([])
  const [loading, setLoading] = useState(true)

  async function getQuestion() {
    // GET /questions/:question_id
    try {
      const response = await api.get(`/questions/${params.question_id}`)
      setLoading(false)
      setQuestion(response.data)
      setChoices(response.data.choices)
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
              <div className="questionDetails">

                <div className='questionHeader'>
                  <div>
                    <h2>{question.question}</h2>
                    <p>{question.published_at}</p>
                  </div>

                  <Link to='/questions'>
                    <IoMdArrowRoundBack size={30} />
                  </Link>
                  
                </div>

                <img className='image_url' src={question.image_url} alt={question.image_url} />

                <div className='questionCards'>
                  {
                    choices.map((choice) => {
                      return (
                        <div key={choice.choice} className='questionCard'>
                          <p>{choice.choice}</p>
                          <p>{choice.votes}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </>
          )
        }
      </div>
    </>
  )
}

export default QuestionDetails