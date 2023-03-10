import React, { createContext, useState, useEffect } from 'react'

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
            console.log(error)
        }
    }

    function handleRetry() {
        checkServerHealth()
    }

    useEffect(() => {
        checkServerHealth()
    }, [])

    return (
        <ConnectionContext.Provider value={{ health, handleRetry }}>
            {children}
        </ConnectionContext.Provider>
    )
}