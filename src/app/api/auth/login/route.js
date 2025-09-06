import { NextResponse } from 'next/server'
import { readFile, access, constants } from 'fs/promises'
import path from 'path'
import { signJwt } from '@/lib/jwt'

export const runtime = 'nodejs' // ensure Node runtime (fs allowed)
export const dynamic = 'force-dynamic'

const usersPath = path.join(process.cwd(), 'src/data', 'users.json')

async function readUsers() {
    try {
        await access(usersPath, constants.F_OK)
    } catch {
        // file not found -> treat as empty
        return []
    }
    const raw = await readFile(usersPath, 'utf8')
    if (!raw || raw.trim() === '') return []
    try {
        return JSON.parse(raw)
    } catch (e) {
        console.error('users.json parse error:', e)
        throw new Error('users.json invalid JSON')
    }
}


export async function POST(req) {
    try {
        const contentType = req.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) {
            return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 415 })
        }

        const { email, password } = await req.json()
        if (!email || !password) {
            return NextResponse.json({ message: 'email & password required' }, { status: 400 })
        }

        const users = await readUsers()
        const user = users.find(u => u.email === email && u.password === password)

        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
        }

        const token = await signJwt({ sub: user.id, username: user.username, email: user.email, role: 'user' })

        const res = NextResponse.json({ user: { id: user.id, username: user.username, email: user.email } })
        res.cookies.set('token', token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7, secure: process.env.NODE_ENV === 'production' })
        return res
    } catch (e) {
        console.error('LOGIN 500:', e)
        return NextResponse.json({ message: 'Server error: ' + (e?.message || 'unknown') }, { status: 500 })
    }
}