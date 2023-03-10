import './index.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// api
import api from '../../services/api'

// components
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import Search from '../../components/Search'
import QuestionsList from '../../components/QuestionsList'
import Pagination from '../../components/Pagination'

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
          loading ?
            <Loading />
            :
            <>
              {/* search component */}
              <Search search={search} setSearch={setSearch} fetchQuestions={fetchQuestions} cancelSearch={cancelSearch} />

              {/* questions list component */}
              <QuestionsList questions={questions} handleNavigateToQuestion={handleNavigateToQuestion} />

              {/* pagination component */}
              <Pagination offset={offset} setOffset={setOffset} limit={limit} setLimit={setLimit} total={total} />
            </>
        }
      </div>
    </>
  )
}

export default Questions