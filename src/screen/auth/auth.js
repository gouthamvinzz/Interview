import React from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { login } from "../../redux/action";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (key, event) => {
    this.setState({ [key]: event});
  };
  login() {
    const { email, password } = this.state;
    var validEmail = false;
    var validPassword = false;
    if (email == "" || password == "") {
      Toast.show("Fields cannot be empty");
    } else {
      if (email && password) {
        validEmail = this.checkEmail(email);
        validPassword = this.checkPassword(password);
        if (validEmail && validPassword) {
          this.props.login(this.state.email, this.state.password);
        } else if (!validEmail) {
          Toast.show("Enter a valid Email");
        } else if (!validPassword) {
          Toast.show("Password must have atleast one capital letter");
        }
      }
    }
  
  }
  checkPassword(password) {
    var re = /[A-Z]+/;
    return re.test(password);
  }
  checkEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(e) => this.handleChange("email", e)}
          placeholder="Email"
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(e) => this.handleChange("password", e)}
          placeholder="Password"
        ></TextInput>

        <TouchableOpacity style={styles.btn} onPress={() => this.login()}>
          <Text>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    loginData: state.auth.loginData,
    numResult: state.auth.numResult,
    userDetails: state.auth.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(login(email, password));
    },
  };
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 150,
  },
  input: {
    alignSelf: "stretch",
    padding: 10,
    marginLeft: 50,
    borderBottomColor: "#000",
    margin: 5,
    marginRight: 50,

    borderBottomColor: "#000",
    borderBottomWidth: 2,
  },
  btn: {
    marginTop: 20,
    alignSelf: "stretch",
    backgroundColor: "lightgray",
    borderRadius: 20,
    padding: 10,
    margin: 10,
    marginLeft: 100,
    marginRight: 100,
    alignItems: "center",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
