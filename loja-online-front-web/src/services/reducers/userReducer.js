const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'USER/LOGIN':
            return action.payload;
        case 'USER/LOGOUT':
            return null;
        default:
            return state;
    }
}

export default userReducer;