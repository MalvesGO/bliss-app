import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { HiOutlineShare } from 'react-icons/hi'

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
    // GET /health
    // GET /questions?limit={limit}&offset={offset}&filter={filter} 
    try {
      const response = await api.get(`/questions?limit=${limit}&offset=${offset}&filter=${search}`)
      console.log(response.data)
      setQuestions(response.data)
      setLoading(false)
      setError(null)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  function handleClick(id) {
    navigate(`/questions/${id}`)
  }

  function handleShare(question) {

    let email = prompt('Enter your email')
    let url = window.location.href;

    if (email) {
      // POST /share
      api.post(`/share?destination_email=${email}&content_url=${url}`)
        .then((response) => {
          alert('Question shared successfully')
        })
        .catch((error) => {
          alert('Error sharing question')
        })
    } else {
      alert('Please enter a valid email')
    }
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
                      <li className='question' key={question.id} onClick={() => handleClick(question.id)}>
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

                        <HiOutlineShare 
                        fontSize={26} 
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleShare(question)
                        }
                        } />

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