const initialState = {
  categoryId: 1001,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CATEGORY_ID":
        return {
            ...state,
            categoryId: state.categoryId + 1
        };
    default:
      return state;
  }
};

export default reducer;
