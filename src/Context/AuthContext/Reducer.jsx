import React from 'react'

const Reducer = (state, action) => {

    switch (action.type) {
        case "USER_LOGIN":
            {
                return { ...state, isAuth: action.payload.isAuth, token: action.payload.token }
            }
        case "USER_LOGOUT":
            {
                return { ...state, isAuth: action.payload.isAuth, token: action.payload.token }
            }
        default:
            {
                return action.payload
            }
    }

}

export default Reducer