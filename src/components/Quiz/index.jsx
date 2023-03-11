import React from 'react'
import './index.css'

const Quiz = ({question, choices, active, setActive, handleVote}) => {
    return (
        <div className='quizContainer'>
            <img className='image_url' src={question.image_url} alt={question.image_url} />
            <div className='questionsOptions'>
                <p>Select an answer</p>
                <hr />
                {
                    choices.map((choice) => {
                        return (
                            <div key={choice.choice}
                                onClick={() => setActive(choice.choice)}
                                className={active === choice.choice ? "selected" : "option"}>
                                <p>{choice.choice}</p>
                            </div>
                        )
                    })
                }
                <hr />
                <button className='button' onClick={() => handleVote()}>Vote</button>
            </div>
        </div>
    )
}

export default Quiz