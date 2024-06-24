import { createContext, useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "../../firebase/firebase.config";
import axios from "axios";

const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [theme, setTheme] = useState("")
    const [user, setUser] = useState(null);
    console.log(user)
    const [loading, setLoading] = useState(true)


    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (fullName, image) => {
        return updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: image
        }).then(() => {
            setUser({
                displayName: fullName,
                photoURL: image
            })
        })
    }

    
    const saveUser = async (user) => {
        const currentUser = {
            email: user?.email,
            name: user?.displayName,
            image: user?.photoURL,
            role: "member"
        }
        const { data } = await axios.put(`${import.meta.env.VITE_Api_Url}/user`, currentUser)
        return data
    }

    const logOut = async () => {
        setLoading(true)
        await axios.post(`https://mcpitc-server.vercel.app/logout`, {
            withCredentials: true
        })
        return signOut(auth)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            saveUser(currentUser)
            setLoading(false)
        })
        return () => {
            unSubscribe()
        }
    }, []);

    const authInfo = { user, loading, theme, setTheme, createUser, updateUserProfile, signInUser, logOut }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider