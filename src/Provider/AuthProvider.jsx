import { createContext, useEffect, useState } from "react"
import propTypes from 'prop-types'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.confing";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

export const authContext = createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    //sign in with google
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //sign in user with email and password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //update user's profile
    const profileUpdate = (name, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName : name,
            photoURL : photoURL
        })
    }

    //log out user
    const logOut = async () => {
        setLoading(true);
        await axiosPublic('/logout', {withCredentials : true})
        return signOut(auth);
    }

    //get token
    const getToken = async email => {
        const {data} = await axiosPublic.post('/jwt', {email}, {withCredentials : true});
        return data;
    }

    //save user info
    const saveUser = async user => {
        const userInfo = {
            name : user?.displayName,
            image : user?.photoURL,
            email : user?.email,
            role : 'user'
        }

        const {data} = await axiosPublic.post('/users', userInfo);
        return data;
    }

    //track user info
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                getToken(currentUser?.email);
            }
            setLoading(false);
        });

        return () => unSubscribe();
    }, [])

    const authInfo = {
        user,
        loading,
        googleSignIn,
        createUser,
        signIn,
        profileUpdate,
        logOut,
        saveUser
    }

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    )
}

AuthProvider.propTypes = {
    children : propTypes.node.isRequired
}

export default AuthProvider