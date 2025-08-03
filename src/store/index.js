import {createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from "redux-persist";
import {AsyncStorage} from 'react-native';
import receiptReducer from './reducers/receipt';
import receiptIdReducer from './reducers/receipt-id';
import targetMonthReducer from './reducers/target-month';
import categoryReducer from './reducers/category';
import categoryIdReducer from './reducers/category-id';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';


const rootReducer = combineReducers({
    receipt: receiptReducer,
    receiptId: receiptIdReducer,
    targetMonth: targetMonthReducer,
    category: categoryReducer,
    categoryId: categoryIdReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'receipt', 
        'receiptId', 
        'targetMonth',
        'category',
        'categoryId'
    ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools());

export const persistor = persistStore(store);
export default store;