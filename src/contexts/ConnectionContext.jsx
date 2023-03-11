import React, { createContext, useState, useEffect } from 'react'
// libs
import Swal from 'sweetalert2'

// api
import api from '../services/api'

export const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {

    const [health, setHealth] = useState([])

    async function checkServerHealth() {
        // GET /health
        try {
            const response = await api.get('/health')
            setHealth(response.data.status)
        } catch (error) {
            setHealth(error.message)
        }
    }

    function handleRetry() {
        checkServerHealth()
    }

    // share question
    async function handleShare(question_id) {
        const url_question = `${window.location.origin}/questions/${question_id}`
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
                return api.post(`/share?destination_email=${email}&content_url=${url_question}`)
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
                    title: `Question sent to ${result.value}`
                })
            }
        })
    }

    useEffect(() => {
        checkServerHealth()
    }, [])

    return (
        <ConnectionContext.Provider value={{ health, handleRetry, handleShare }}>
            {children}
        </ConnectionContext.Provider>
    )
}