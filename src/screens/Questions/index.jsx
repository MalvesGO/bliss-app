import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './index.css'

import Header from '../../components/Header'
import Loading from '../../components/Loading'

import api from '../../services/api'

const Questions = () => {

  let navigate = useNavigate();

  const [questions, setQuestions] = useState([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)

  async function fetchQuestions() {
    // GET /questions?limit={limit}&offset={offset}&filter={filter} 
    if (search === '') {
      const response = await api.get(`/questions?limit=${limit}&offset=${offset}`)
      setTotal(response.data.length)
      setQuestions(response.data)
      setLoading(false)
      return
    }
    const response = await api.get(`/questions?limit=${limit}&offset=${offset}&filter=${search}`)
    setTotal(response.data.length)
    setQuestions(response.data)
    setLoading(false)
  }

  function handleNavigateToQuestion(id) {
    navigate(`/questions/${id}`)
  }

  function cancelSearch() {
    setSearch('')
    fetchQuestions()
  }

  useEffect(() => {
    fetchQuestions()
  }, [offset])

  return (
    <>
      <Header />
      <div className='container'>

        {
          loading ? <Loading /> :
            <>
              <div className='search'>
                <input type='text' placeholder='Pesquisar' value={search} onChange={(e) => setSearch(e.target.value)} />
                <button onClick={() => fetchQuestions()}>Pesquisar</button>
                <button onClick={() => cancelSearch()}>Cancelar</button>
              </div>

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

              <div className='pagination'>
                <button onClick={() => setOffset(offset - limit)} disabled={offset === 0}>Anterior</button>
                <b>
                  PAGE: {offset / limit + 1} - RESULTS: {total}
                </b>
                <button onClick={() => setOffset(offset + limit)}>Próximo</button>
              </div>

            </>
        }
      </div>
    </>
  )
}

export default Questions