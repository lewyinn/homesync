import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')

export async function signJwt(payload, exp = '7d') {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(exp)
        .sign(secret)
}

export async function verifyJwt(token) {
    const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] })
    return payload
}