import { useContext } from 'react'
import { ConnectionContext } from '../../contexts/ConnectionContext'

// icons
import { HiOutlineShare } from 'react-icons/hi'

// libs
import Lottie from 'react-lottie-player'

import notFound from '../../assets/notfound.json'
import './index.css'

const QuestionsList = ({ questions, handleNavigateToQuestion }) => {

  const { handleShare } = useContext(ConnectionContext);

  return (
    <ul className='questionsList'>
      {
        questions.length === 0 ?
          <div className="notFound">
            <Lottie
              loop
              animationData={notFound}
              play
              style={{ width: '50%', height: '50%' }}
            />
          </div>
          :
          questions.map((question) => {
            return (

              <li className='question' key={question.id}>
                <div className='info' onClick={() => handleNavigateToQuestion(question.id)}>
                  <img src={question.thumb_url} alt={question.thumb_url} />
                  <div className='infoDetails'>
                  <p className='date'>{
                      new Date(question.published_at).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })
                    }</p>
                    <h2 className='title'>{question.question}</h2>
                  </div>
                </div>
                <HiOutlineShare
                  size={30}
                  onClick={() => handleShare(question.id)}
                  style={{ cursor: 'pointer' }}
                />
              </li>

            )
          })
      }



    </ul>
  )
}

export default QuestionsList