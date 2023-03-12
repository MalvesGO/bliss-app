import './index.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

// api
import api from '../../services/api';

// components
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Search from '../../components/Search';
import QuestionsList from '../../components/QuestionsList';
import Pagination from '../../components/Pagination';

const Questions = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const [filter, setFilter] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  async function fetchQuestions() {
    try {
      let response;
      if (filter) {
        response = await api.get(`/questions?limit=${limit}&offset=${offset}&filter=${filter}`);
      } else {
        response = await api.get(`/questions?limit=${limit}&offset=${offset}`);
      }
      setLoading(false);
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleInputChange(e) {
    setFilter(e.target.value);
  }

  function handleClearClick() {
    setFilter('');
    const queryParams = queryString.parse(location.search);
    delete queryParams.filter;
    const newQueryParams = queryString.stringify(queryParams);
    window.history.pushState({}, '', `/questions?${newQueryParams}`);
  }

  function handleNavigateToQuestion(id) {
    navigate(`/questions/${id}`);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = queryString.parse(location.search);
    queryParams.filter = filter;
    const newQueryParams = queryString.stringify(queryParams);
    window.history.pushState({}, '', `/questions?${newQueryParams}`);
    fetchQuestions();
  }

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    const filterParam = queryParams.filter;
    setFilter(filterParam || '');
  }, [location]);

  useEffect(() => {
    async function fetchQuestionsWithFilter() {
      try {
        let response = await api.get(`/questions?limit=${limit}&offset=${offset}&filter=${filter}`);
        setLoading(false);
        setQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchQuestionsWithoutFilter() {
      try {
        let response = await api.get(`/questions?limit=${limit}&offset=${offset}`);
        setLoading(false);
        setQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (filter) {
      fetchQuestionsWithFilter();
    } else {
      fetchQuestionsWithoutFilter();
    }
  }, [offset, limit, filter, location.search]);

  return (
    <>
      <Header />
      <div className='container'>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Search
              handleSearch={handleSearch}
              handleInputChange={handleInputChange}
              handleClearClick={handleClearClick}
              filter={filter}
            />
            <QuestionsList
              questions={questions}
              handleNavigateToQuestion={handleNavigateToQuestion}
            />
            <Pagination
              offset={offset}
              setOffset={setOffset}
              limit={limit}
              setLimit={setLimit}
              total={questions.length}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Questions