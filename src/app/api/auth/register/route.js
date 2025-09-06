import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { signJwt } from '@/lib/jwt'

const usersPath = path.join(process.cwd(), 'data', 'users.json')

export async function POST(req) {
    try {
        const { username, email, password } = await req.json()
        if (!username || !email || !password) {
            return NextResponse.json({ message: 'username, email, password required' }, { status: 400 })
        }

        const raw = await readFile(usersPath, 'utf8')
        const users = JSON.parse(raw || '[]')

        if (users.some(u => u.email === email)) {
            return NextResponse.json({ message: 'Email already registered' }, { status: 409 })
        }

        const id = Date.now().toString(36)
        const newUser = { id, username, email, password } // NOTE: plaintext for demo only
        users.push(newUser)
        await writeFile(usersPath, JSON.stringify(users, null, 2))


        const token = await signJwt({ sub: id, username, email, role: 'user' })
        const res = NextResponse.json({ user: { id, username, email } })
        res.cookies.set('token', token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7, secure: process.env.NODE_ENV === 'production' })
        return res
    } catch (e) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }
}