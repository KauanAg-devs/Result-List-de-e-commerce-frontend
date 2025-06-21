'use client'
import { handleIsAuthenticated } from "@/utils/isAuthenticated"
import React, { useEffect, useState } from "react"

function useAuthCheck() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await handleIsAuthenticated()
        setIsAuthenticated(authStatus)
      } catch (error) {
        console.error('Error checking authentication:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { isAuthenticated, loading }
}

export function ConditionalAuth({
  notAuthenticated, 
  authenticated
}: {
  notAuthenticated?: React.ReactNode
  authenticated?: React.ReactNode
}) {
  const { isAuthenticated, loading } = useAuthCheck()

  if (loading) return null

  return isAuthenticated ? authenticated : notAuthenticated
}