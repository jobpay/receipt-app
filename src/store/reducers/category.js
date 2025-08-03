const initialState = {
    categories: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_CATEGORY":
          return {
              ...state,
              categories: [...state.categories, action.category]
          };
      case "UPDATE_CATEGORIES":
          return {
            ...state,
            categories: [...action.categories]
          }
      case "DELETE_CATEGORY":
          return {
              ...state,
              categories: state.categories.filter(r => r.id !== action.categoryId),
          };
      default:
        return state;
    }
  };
  
  export default reducer;
  