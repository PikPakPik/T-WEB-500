import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Constantes pour les URLs et les clés
const API_URL = 'http://localhost:3001';
const TOKEN_KEY = 'token';

const defaultProvider = {
    user: null,
    setUser: () => null,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(defaultProvider.user);
    const navigate = useNavigate();
    
    useEffect(() => {
        const initAuth = async () => {
            // Utilisation de la constante pour le TOKEN_KEY et la méthode getItem pour récupérer le token
            const storedToken = window.localStorage.getItem(TOKEN_KEY);
            if (storedToken) {
                try {
                    // Utilisation de la constante pour API_URL et la méthode fetch pour récupérer les données
                    const response = await fetch(`${API_URL}/me`, {
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
                    window.localStorage.removeItem(TOKEN_KEY);
                    window.location.href = '/login';
                    console.error(err);
                }
            }
        }

        initAuth();
    }, []);

    // Fonction pour gérer l'authentification
    const handleLogin = (params, errorCallback) => {
        // Utilisation de la constante pour API_URL et la méthode fetch pour envoyer les données 
        fetch(`${API_URL}/login`, {
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
                    return Promise.reject(new Error('Identifiant ou mot de passe incorrect'));
                }
            }
        })
        .then(data => {
            // Utilisation de la constante pour le TOKEN_KEY et la méthode setItem pour stocker le token
            window.localStorage.setItem(TOKEN_KEY, data.token);
            fetch(`${API_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setUser(data);
                if(data.isSuperman === true) {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            })
        })
        .catch(err => {
            if (errorCallback) errorCallback(err);
        });
    }

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        setUser(null);
        // Utilisation de la constante pour le TOKEN_KEY et la méthode removeItem pour supprimer le token
        window.localStorage.removeItem(TOKEN_KEY);
        navigate('/login');
        window.location.reload();
    }

    const values = {
        user,
        setUser,
        login: handleLogin,
        logout: handleLogout
    };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };