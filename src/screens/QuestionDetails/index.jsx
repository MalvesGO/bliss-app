import './index.css'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// libs
import Swal from 'sweetalert2'

import { IoMdArrowRoundBack } from 'react-icons/io'
import { HiOutlineShare } from 'react-icons/hi'

// api
import api from '../../services/api'

// components
import Header from '../../components/Header'
import Loading from '../../components/Loading'
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

  // share question
  async function handleShare() {

    Swal.fire({
      title: 'Share this Quiz with your friends... Enter email',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Send',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return api.post(`/share?destination_email=${email}&content_url=${window.location.href}`)
          .then(response => {
            if (response.status === 200) {
              return email
            }
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Email sent to ${result.value}`
        })
      }
    })
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
                  <div className='contentHeader'>
                    <Link to='/questions'>
                      <IoMdArrowRoundBack size={30} color='#fff' />
                    </Link>
                    <div>
                      <span className='dateQuestion'>
                        {new Date(question.published_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </span>
                      <h1 className='questionTitle'>
                        {question.question}
                      </h1>
                    </div>
                  </div>
                  <HiOutlineShare
                    size={30}
                    onClick={handleShare}
                    style={{ cursor: 'pointer' }}
                  />
                </div>

                {/* quiz component */}
                <Quiz question={question} choices={choices} active={active} setActive={setActive} handleVote={handleVote} />

              </div>
            </>
          )
        }
      </div>
    </>
  )
}

export default QuestionDetails