import React from 'react'


const Nav_Reducer = (state,action) => {

    switch (action.type) {
        case "LOGIN_TOGGLE":
            {
                return { ...state, login_logout_toggle_state: action.payload.login_logout_toggle_state }
            }
        case "LOGIN_TOGGLE":
            {
                return { ...state, account_toggle_state: action.payload.account_toggle_state }
            }
        default:
            {
                return action.payload
            }
    }
}

export default Nav_Reducer