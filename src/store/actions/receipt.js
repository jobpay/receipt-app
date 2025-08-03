export const addReceipt = ({receipt}) => {
    return {
        type: 'ADD_RECEIPT',
        receipt,
    };
}

export const updateReceipts = ({receipts}) => {
    return {
        type: 'UPDATE_RECEIPTS',
        receipts,
    };    
}

export const deleteReceipt = ({receiptId}) => {
    return {
        type: 'DELETE_RECEIPT',
        receiptId
    }
}