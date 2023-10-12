import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const defaultProvider = {
    user: null,
    setUser: () => null,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(defaultProvider.user)
    const navigate = useNavigate()
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = window.localStorage.getItem("token");
            if (storedToken) {
                try {
                    const response = await fetch('http://localhost:3001/me', {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                    } else {
                        console.error(`Server responded with status: ${response.status}`);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        }

        initAuth();
    }, []);


    const handleLogin = (params, errorCallback) => {
        fetch('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    if (res.status === 401) {
                        return Promise.reject(new Error('Identifiant ou mot de passe incorrect'))
                    }
                }
            })
            .then(data => {
                setUser(data)
                window.localStorage.setItem("token", data.token)
                navigate('/')
                window.location.reload()
            })
            .catch(err => {
                if (errorCallback) errorCallback(err)
            })
    }


    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('userData')
        window.localStorage.removeItem("token")
        navigate('/login')
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
