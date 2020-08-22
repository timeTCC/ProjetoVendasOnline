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

export const setEditingProduct = (product) => {
    return{
        type: 'PRODUCT/SET',
        payload: product
    }
}

export const setEditingProductCatName = (catName) => {
    return{
        type: 'PRODUCT/SET_CAT_NAME',
        payload: catName
    }
}

export const unsetEditingProduct = () => {
    return{
        type: 'PRODUCT/UNSET'
    }
}
