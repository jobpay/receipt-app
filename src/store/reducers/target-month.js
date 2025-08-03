const initialState = {
  targetMonth: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TARGET_MONTH":
        return {
            ...state,
            targetMonth: action.targetMonth
        };
    default:
      return state;
  }
};

export default reducer;
