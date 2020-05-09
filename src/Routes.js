import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthScreen from "./screen/auth/auth";
import { createStackNavigator } from "@react-navigation/stack";
import DashBoard from "./screen/dashBoard/dashBoard";
import { connect } from "react-redux";
const Stack = createStackNavigator();
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    userName: state.auth.userName,
  };
};
const Route = (props) => {
  let root = "Auth";
  let title = "Hello " + props.userName;
  if (props.isLoggedIn) {
    root = "dashBoard";
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={root}>
        {props.isLoggedIn ? (
          <Stack.Screen name={title} component={DashBoard} title="hello" />
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default connect(mapStateToProps, null)(Route);
