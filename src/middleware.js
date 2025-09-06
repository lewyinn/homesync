import { NextResponse } from 'next/server'
import { verifyJwt } from './lib/jwt'

const PROTECTED_PAGES = ['/admin']
const AUTH_PAGES = ['/login', '/register']

function isSafeRelative(p) {
    return typeof p === 'string' && p.startsWith('/') && !p.startsWith('//')
}

export async function middleware(req) {
    const { pathname, searchParams } = req.nextUrl
    const isAdminPage = PROTECTED_PAGES.some(p => pathname.startsWith(p))
    const isAdminApi = pathname.startsWith('/api/admin')
    const isAuthPage = AUTH_PAGES.some(p => pathname === p)

    const token = req.cookies.get('token')?.value

    // If visiting /login or /register but already logged in -> bounce to next or /admin
    if (isAuthPage && token) {
        try { await verifyJwt(token) } catch { /* invalid token -> treat as not logged in */ return NextResponse.next() }
        const next = req.nextUrl.searchParams.get('next')
        const redirectTo = isSafeRelative(next) ? next : '/admin/dashboard'
        const url = new URL(redirectTo, req.url)
        return NextResponse.redirect(url)
    }

    // Not accessing protected areas -> allow
    if (!isAdminPage && !isAdminApi) return NextResponse.next()

    // Protected routes require valid token
    if (!token) {
        if (isAdminApi) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        const loginUrl = new URL('/login', req.url)
        loginUrl.searchParams.set('next', pathname + (req.nextUrl.search || ''))
        return NextResponse.redirect(loginUrl)
    }

    try {
        await verifyJwt(token)
        return NextResponse.next()
    } catch {
        if (isAdminApi) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        const loginUrl = new URL('/login', req.url)
        loginUrl.searchParams.set('next', pathname + (req.nextUrl.search || ''))
        return NextResponse.redirect(loginUrl)
    }
}


export const config = {
    matcher: ['/login', '/register', '/admin/:path*', '/api/admin/:path*']
}