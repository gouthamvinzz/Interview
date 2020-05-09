import { combineReducers } from 'redux'
import uniqueId from 'lodash.uniqueid';
//
// Initial State...
//

const initialState = {
  isLoggedIn: false,
  products: [
    {
      id: uniqueId(),
      name: "Toys",
      rate:"5",
      quality:"2"
    }
  ],
  userName: "",
  personData: {},
  numResult: {},
  userDetails: {},
  isLoggedIn: false,
};


const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case "setLoginInData": 
    return { ...state, isLoggedIn: action.value.loggedIn,userName: action.value.userName};
  
    default: 
      return state;
  }
}

const productReducer = (state = initialState, action) => {
  switch(action.type) {
    case "setProductData": 
    return { ...state,  products: state.products.concat([action.value])};
    case "deleteProductData":
      return { ...state,  products: state.products.filter((product)=>product.id !== action.value)};
    default: 
      return state;
  }
}

export default rootReducer=combineReducers({
  auth:authReducer,
  product:productReducer
});

