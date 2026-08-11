'use client'

import { Inter } from 'next/font/google'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { FullPageSpinner } from '@/components/shared/LoadingSpinner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [googleLoading, setGoogleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    setAuthError(null)

    try {
      await signInWithEmail(data.email, data.password)

      toast.success('Signed in successfully')
      router.replace('/dashboard')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        const message = 'Invalid email or password'
        setAuthError(message)
        toast.error(message)
      }
    }
  }

  const handleGoogleSignIn = async () => {
    setAuthError(null)
    setGoogleLoading(true)

    try {
      await signInWithGoogle()
      router.replace('/dashboard')
    } catch {
      const message = 'Google sign-in failed. Please try again.'
      setAuthError(message)
      toast.error(message)
    } finally {
      setGoogleLoading(false)
    }
  }

  const authBusy = isSubmitting || googleLoading

  return (
    <div
  className={`${inter.className} fixed inset-0 z-50 overflow-y-auto bg-[#1B2559] text-[#1A202C]`}
>
      <div className="grid min-h-full min-[769px]:grid-cols-[380px_1fr] min-[1280px]:grid-cols-2">
        {/* Left hero */}
        <section className="hidden bg-[#131A45] px-12 text-white min-[769px]:flex min-[1280px]:px-16">
          <div className="my-auto max-w-[440px]">
            <h2 className="text-[32px] leading-[40px] font-bold">
              6-IBM-RCS Infrastructure-Team 2
            </h2>

            <p className="mt-3 text-[16px] leading-6 text-white/80">
              Everything your capstone team is working on, in one place.
            </p>
          </div>
        </section>

        {/* Right login area */}
        <main className="flex min-h-full items-center justify-center bg-[#1B2559] p-6 min-[769px]:bg-white min-[769px]:p-8">
          <div className="w-full max-w-none rounded-[12px] border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_24px_rgba(16,24,40,0.12)] min-[769px]:max-w-[420px]">
            <div className="mb-6">
              <h1 className="text-[24px] leading-8 font-semibold text-[#1A202C]">
                Sign in
              </h1>

              <p className="mt-1 text-[14px] leading-5 text-[#627288]">
                Enter your credentials to continue
              </p>
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={authBusy}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-[8px] border border-[#91949A] bg-white px-4 text-[14px] font-medium text-[#1A202C] transition-colors hover:bg-slate-50 focus-visible:ring-[3px] focus-visible:ring-[#32409A] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>

              Continue with Google
            </button>

            {/* OR divider */}
            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#E2E8F0]" />
              <span className="text-[12px] leading-4 text-[#627288]">or</span>
              <div className="h-px flex-1 bg-[#E2E8F0]" />
            </div>

            {/* Authentication error */}
            {authError && (
              <div
                role="alert"
                aria-live="polite"
                className="mb-4 flex min-h-11 items-center gap-2 rounded-[8px] border-l-[3px] border-[#C0392B] bg-[#FDECEA] px-3 py-2 text-[12px] leading-4 text-[#C0392B]"
              >
                <span aria-hidden="true">▲</span>
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[14px] leading-5 font-medium text-[#1A202C]"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  disabled={authBusy}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="you@student.rmit.edu.au"
                  {...register('email')}
                  className={`h-12 w-full rounded-[8px] border bg-white px-3 text-[14px] text-[#1A202C] outline-none placeholder:text-[#627288] focus:ring-2 focus:ring-[#3D4EAE] disabled:cursor-not-allowed disabled:bg-[#F5F7FB] disabled:opacity-60 ${
                    errors.email
                      ? 'border-[#C0392B]'
                      : 'border-[#91949A]'
                  }`}
                />

                {errors.email && (
                  <p
                    id="email-error"
                    role="alert"
                    className="mt-1.5 flex items-start gap-1.5 text-[12px] leading-4 text-[#C0392B]"
                  >
                    <span aria-hidden="true">▲</span>
                    <span>{errors.email.message}</span>
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-[14px] leading-5 font-medium text-[#1A202C]"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    disabled={authBusy}
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? 'password-error' : undefined
                    }
                    placeholder="Enter your password"
                    {...register('password')}
                    className={`h-12 w-full rounded-[8px] border bg-white px-3 pr-16 text-[14px] text-[#1A202C] outline-none placeholder:text-[#627288] focus:ring-2 focus:ring-[#3D4EAE] disabled:cursor-not-allowed disabled:bg-[#F5F7FB] disabled:opacity-60 ${
                      errors.password
                        ? 'border-[#C0392B]'
                        : 'border-[#91949A]'
                    }`}
                  />

                  <button
                    type="button"
                    disabled={authBusy}
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute top-1/2 right-1 min-h-11 -translate-y-1/2 px-3 text-[12px] font-medium text-[#3D4EAE] focus-visible:ring-2 focus-visible:ring-[#3D4EAE] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                {errors.password && (
                  <p
                    id="password-error"
                    role="alert"
                    className="mt-1.5 flex items-start gap-1.5 text-[12px] leading-4 text-[#C0392B]"
                  >
                    <span aria-hidden="true">▲</span>
                    <span>{errors.password.message}</span>
                  </p>
                )}
              </div>

              {/* Sign in */}
              <button
                type="submit"
                disabled={authBusy}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#3D4EAE] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#32409A] focus-visible:ring-[3px] focus-visible:ring-[#32409A] focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting && (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  />
                )}

                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <div className="mt-4 flex min-h-11 items-center justify-center text-center text-[12px] leading-4 text-[#627288]">
              <span>Don&apos;t have an account? </span>

              <Link
                href="/auth/signup"
                className="ml-1 font-medium text-[#3D4EAE] hover:underline focus-visible:ring-2 focus-visible:ring-[#3D4EAE] focus-visible:outline-none"
              >
                Create one
              </Link>
            </div>

            {isSubmitting && (
              <p className="mt-2 text-center text-[12px] leading-4 text-[#627288]">
                Fields are disabled while the request is in flight.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}