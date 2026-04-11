import { createClient } from '@/authentication/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirect = searchParams.get('redirect')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = createClient()
    
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (!error) {
        const forwardedHost = request.headers.get('x-forwarded-host')
        const isLocalEnv = process.env.NODE_ENV === 'development'
        
        // Build redirect URL with onboarding flag if needed
        let redirectUrl = next
        if (redirect === 'onboarding') {
          redirectUrl = `${next}?showOnboarding=true`
        }
        
        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${redirectUrl}`)
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${redirectUrl}`)
        } else {
          return NextResponse.redirect(`${origin}${redirectUrl}`)
        }
      }
    } catch (error) {
      console.error('Auth callback error:', error)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/signin?error=auth_failed`)
}
