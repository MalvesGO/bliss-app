import React from 'react'
import './index.css'

const QuestionsList = ({ questions, handleNavigateToQuestion }) => {
  return (
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
  )
}

export default QuestionsList