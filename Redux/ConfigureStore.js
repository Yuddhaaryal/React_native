import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { leaders } from './leaders';
import {favorites} from './favorites';
import  { persistStore, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/es/storage';

const persistConfig = {
    key: 'root',
    storage,
    debug: 'true'
}
export const ConfigureStore= ()=>{
    const store = createStore(
        persistCombineReducers(persistConfig,{
            dishes,
            comments,
            leaders,
            promotions,
            favorites
        }),
        applyMiddleware(thunk,logger)
    )
    const persistor = persistStore(store)
    return {store, persistor};
}



















