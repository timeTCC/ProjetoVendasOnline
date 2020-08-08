export const login = (user) => {
    return{
        type: 'USER/LOGIN',
        payload: user
    }
}

export const logout = () => {
    return{
        type: 'USER/LOGOUT',
    }
}