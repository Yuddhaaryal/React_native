import dishes from './dishes';
import comments from './comments';
import leaders from '.leaders';
import promotions from './promotions';
import { combineReducers, applyMiddleWare, createStore} from 'react-redux';

const  ConfigureStore= () => {
    const store= createStore(
    combineReducers({
        dishes,
        promotions,
        leaders,
        comments
    }), applyMiddleWare(thunk,logger)
    )
    return store
}
export default ConfigureStore;