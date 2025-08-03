export const incrementCategoryId = ({categoryId}) => {
    return {
        type: 'ADD_CATEGORY_ID',
        categoryId,
    };
}