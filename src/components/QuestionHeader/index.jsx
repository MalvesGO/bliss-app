import {useContext} from 'react'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import { Link } from 'react-router-dom'

import './index.css'

// icons
import { IoMdArrowRoundBack } from 'react-icons/io'
import { HiOutlineShare } from 'react-icons/hi'

const QuestionHeader = ({ question }) => {

    const { handleShare } = useContext(ConnectionContext);

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
                onClick={() => handleShare(question.id)}
                style={{ cursor: 'pointer' }}
            />
        </div>
    )
}

export default QuestionHeader