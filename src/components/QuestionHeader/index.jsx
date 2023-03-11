import React from 'react'

import './index.css'

import { Link } from 'react-router-dom'

// icons
import { IoMdArrowRoundBack } from 'react-icons/io'
import { HiOutlineShare } from 'react-icons/hi'

const QuestionHeader = ({ question, handleShare }) => {
    return (
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
    )
}

export default QuestionHeader