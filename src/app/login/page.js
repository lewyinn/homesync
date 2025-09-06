'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'


export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const sp = useSearchParams()


    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            if (!res.ok) throw new Error((await res.json()).message || 'Login gagal')
            const next = sp.get('next') || '/admin/dashboard'
            router.push(next)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div style={{ maxWidth: 360, margin: '80px auto', fontFamily: 'system-ui' }}>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <label>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" required style={{ width: '100%', padding: 8, margin: '8px 0' }} />
                <label>Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" required style={{ width: '100%', padding: 8, margin: '8px 0' }} />
                {error && <p style={{ color: 'crimson' }}>{error}</p>}
                <button disabled={loading} style={{ width: '100%', padding: 10 }}>
                    {loading ? 'Loading…' : 'Masuk'}
                </button>
            </form>

            <hr style={{ margin: '16px 0' }} />

            <details>
                <summary>Belum punya akun? Quick register (dev only)</summary>
                <RegisterQuick />
            </details>
        </div>
    )
}


function RegisterQuick() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')


    const doReg = async () => {
        setMsg('')
        const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, email, password }) })
        const j = await res.json()
        setMsg(res.ok ? 'Register OK, token terset — silakan buka /admin' : j.message || 'Gagal')
    }


    return (
        <div>
            <input placeholder='username' value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: 8, margin: '8px 0' }} />
            <input placeholder='email' value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 8, margin: '8px 0' }} />
            <input placeholder='password' value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 8, margin: '8px 0' }} />
            <button onClick={doReg} style={{ width: '100%', padding: 10 }}>Register</button>
            {msg && <p>{msg}</p>}
        </div>
    )
}