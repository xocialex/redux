import { combineReducers } from 'redux'
import products from './product'
import cart from './cart'


const rootReducer = combineReducers({
    products,
    cart
})

export default rootReducer