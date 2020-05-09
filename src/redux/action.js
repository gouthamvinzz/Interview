import uniqueId from "lodash.uniqueid";
import Toast from "react-native-simple-toast";

const setLoginInData = (loginInData) => {
  return {
    type: "setLoginInData",
    value: loginInData,
  };
};

const setProductData = (productData) => {
  return {
    type: "setProductData",
    value: productData,
  };
};
const deleteProductData = (productId) => {
  return {
    type: "deleteProductData",
    value:productId,
  };
};

const login = (email, password) => {
  return function (dispatch) {
    var loggedIn = false;
    var name = "";
    var loginData = {};
    if (
      email.toLowerCase() == "clarion@clarion.com" &&
      password == "Clarion123"
    ) {
      name = email.substring(0, email.lastIndexOf("@"));
      loggedIn = true;
    } else {
      Toast.show("Incorrect Email or Password");
    }

    loginData.userName = name;
    loginData.loggedIn = loggedIn;
    var actionSetLoginInData = setLoginInData(loginData);
    dispatch(actionSetLoginInData);
  };
};
const add = (name, rate, quality) => {
  return function (dispatch) {
    var list = {};
    list.id = uniqueId();
    list.name = name;
    list.rate = rate;
    list.quality = quality;
     var actionSetProductData = setProductData(list);
    dispatch(actionSetProductData);
  };
};

const deleteDetail = (id) => {
  return function (dispatch) {
     var actionDeleteProductData = deleteProductData(id);
    dispatch(actionDeleteProductData);
  };
};
export {
  login,
  setLoginInData,
  setProductData,
  add,
  deleteProductData,
  deleteDetail,
};
