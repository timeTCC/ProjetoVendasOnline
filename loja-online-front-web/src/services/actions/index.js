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

export const setCategoryPage = (categoryName) => {
    return{
        type: 'CATEGORY_PAGE/SET',
        payload: categoryName
    }
}

export const setLoading = (isLoading) => {
    return{
        type: 'LOADING/SET',
        payload: isLoading
    }
}
