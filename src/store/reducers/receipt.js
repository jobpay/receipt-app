const initialState = {
    receipts: [],
  };
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RECEIPT":
        return {
            ...state,
            receipts: state.receipts.concat(action.receipt)
        };
    case "UPDATE_RECEIPTS":
        return {
          ...state,
          receipts: [...action.receipts]
        }
    case "DELETE_RECEIPT":
        return {
            ...state,
            receipts: state.receipts.filter(r => r.id === action.receiptId),
        };
    default:
      return state;
  }
};
  
export default reducer;
  