import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import PropTypes from 'prop-types'

export default function ProtectedRoute (props) {
  const { children } = props
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />
  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}
