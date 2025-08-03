const initialState = {
  receiptId: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RECEIPT_ID":
        return {
            ...state,
            receiptId: state.receiptId + 1
        };
    default:
      return state;
  }
};

export default reducer;
