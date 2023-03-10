import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './index.css'

import Header from '../../components/Header'
import Loading from '../../components/Loading'

import api from '../../services/api'

const Questions = () => {

  let navigate = useNavigate();
  const [questions, setQuestions] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)

  async function fetchQuestions() {
    // GET /questions?limit={limit}&offset={offset}&filter={filter} 
    try {
      const response = await api.get(`/questions?limit=${limit}&offset=${offset}&filter=${search}`)
      setQuestions(response.data)
      setLoading(false)
      setError(null)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  function handleNavigateToQuestion(id) {
    navigate(`/questions/${id}`)
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  return (
    <>
      <Header />
      <div className='container'>

        {
          loading ? <Loading /> :
            <>
              <form className='form' >
                <input
                  style={{ marginBottom: '2rem' }}
                  placeholder='Search questions'
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value)
                  }}
                />
                <button className='button' type="submit">Search</button>
              </form>

              <ul className='questionsList'>
                {
                  questions.map((question) => {
                    return (
                      <li className='question' key={question.id} onClick={() => handleNavigateToQuestion(question.id)}>
                        <img src={question.thumb_url} alt={question.thumb_url} />
                        <div className='info'>
                          <h2 className='title'>{question.question}</h2>
                          <p className='date'>{
                            new Date(question.published_at).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })
                          }</p>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>

              <button>
                Next
              </button>

              <span>page 1 of 10</span>

              <button>
                Previous
              </button>
            </>
        }
      </div>
    </>
  )
}

export default Questions