import React, { createContext, useReducer, useState } from 'react'
import Reducer from './Reducer';


const initialState = { isAuth: false, token: false }

// Creating the AuthContext 

export const AuthContext = createContext();

// CREATING THE AUTHCONTEXT PROVIDER

const AuthContextProvider = ({ children }) => {

    //  CREATING THE MAIN USER AUTHENTICATION STATE
    const [state, dispatch] = useReducer(Reducer, initialState)
    const [authState, setAuthState] = useState({ isAuth: false, token: false })
    console.log(setAuthState);

    //  USER LOGIN FUNCTION 

    const UserLogin = (token) => {
        dispatch({ type: "USER_LOGIN", payload: { isAuth: true, token: token } })
    }

    //  USER LOGOUT FUNCTION 

    const UserLogout = () => {
        dispatch({ type: "USER_LOGOUT", payload: { isAuth: false, token: false } })
    }

    return (
        <AuthContext.Provider value={{ state, authState, UserLogin, UserLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider