import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function AuthLayout({ children, authentication = true }) {
    const authStatus = useSelector((state) => state.auth.status)

    if (authentication && !authStatus) {
        return <Navigate to="/login" replace />
    }

    if (!authentication && authStatus) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}
