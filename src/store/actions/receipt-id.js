export const incrementReceiptId = ({receiptId}) => {
    return {
        type: 'ADD_RECEIPT_ID',
        receiptId,
    };
}