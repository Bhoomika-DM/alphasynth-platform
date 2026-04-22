import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

// Auth cache to prevent rate limiting
interface AuthCache {
  user: User | null
  timestamp: number
  ttl: number
}

const authCache: AuthCache = {
  user: null,
  timestamp: 0,
  ttl: 30000 // 30 seconds cache
}

/**
 * Get cached user or fetch from Supabase if cache expired
 * This prevents hitting Supabase rate limits
 */
export async function getCachedUser(): Promise<User | null> {
  const now = Date.now()
  
  // Return cached user if still valid
  if (authCache.user && (now - authCache.timestamp) < authCache.ttl) {
    return authCache.user
  }
  
  // Cache expired or empty, fetch from Supabase
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    // Silently handle auth errors (user not logged in is normal)
    if (error) {
      // Only log unexpected errors, not "session missing" which is normal
      if (error.message !== 'Auth session missing!') {
        console.error('Auth error:', error)
      }
      return null
    }
    
    // Update cache
    authCache.user = user
    authCache.timestamp = now
    
    return user
  } catch (error) {
    console.error('Failed to get user:', error)
    return null
  }
}

/**
 * Clear the auth cache (call on logout)
 */
export function clearAuthCache() {
  authCache.user = null
  authCache.timestamp = 0
}

/**
 * Force refresh the auth cache
 */
export async function refreshAuthCache(): Promise<User | null> {
  authCache.timestamp = 0 // Invalidate cache
  return getCachedUser()
}
