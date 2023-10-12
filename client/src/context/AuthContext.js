import { createContext, useEffect, useState } from 'react'
import { Router } from 'react-router-dom'

const defaultProvider = {
    user: null,
    setUser: () => null,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(defaultProvider.user)

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = window.localStorage.getItem("token")
            if (storedToken) {
                fetch('http://localhost:3001/me', {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        setUser(data)
                    })
                    .catch(err => {
                        console.error(err)
                        localStorage.removeItem('token')
                        setUser(null)
                    })
            }
        }

        initAuth()
    }, [])

    const handleLogin = (params, errorCallback) => {
        console.log(params)
        fetch('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error)
                }
                setUser(data)
                window.localStorage.setItem("token", data.token)
            })
            .catch(err => {
                console.error(err)
            })
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('userData')
        window.localStorage.removeItem("token")
        window.location.reload()
    }

    const values = {
        user,
        setUser,
        login: handleLogin,
        logout: handleLogout
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
