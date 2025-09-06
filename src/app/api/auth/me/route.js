import { NextResponse } from 'next/server'
import { verifyJwt } from '@/lib/jwt'

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value
        if (!token) return NextResponse.json({ authenticated: false }, { status: 401 })
        const payload = await verifyJwt(token)
        return NextResponse.json({ authenticated: true, user: payload })
    } catch {
        return NextResponse.json({ authenticated: false }, { status: 401 })
    }
}