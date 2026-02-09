import { useState, useEffect, useCallback } from 'react'
import { checkApiHealth } from '@/lib/api'

export function useApiHealth() {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkHealth = useCallback(async () => {
    setIsChecking(true)
    try {
      const healthy = await checkApiHealth()
      setIsHealthy(healthy)
      return healthy
    } catch (error) {
      setIsHealthy(false)
      return false
    } finally {
      setIsChecking(false)
    }
  }, [])

  useEffect(() => {
    checkHealth()
  }, [checkHealth])

  return { isHealthy, isChecking, checkHealth }
}
