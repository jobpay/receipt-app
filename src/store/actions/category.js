export const addCategory = ({category}) => {
    return {
        type: 'ADD_CATEGORY',
        category,
    };
}

export const updateCategories = ({categories}) => {
    return {
        type: 'UPDATE_CATEGORIES',
        categories,
    };    
}

export const deleteCategory = ({categoryId}) => {
    return {
        type: 'DELETE_CATEGORY',
        categoryId
    }
}