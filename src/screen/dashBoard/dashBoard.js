import React from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import { connect } from "react-redux";
import { add, deleteDetail } from "../../redux/action";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";


class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      rate: "",
      quality: "",
      modalVisible: false,
    };
  }

  //To add new product
  add(visible) {
    const { name, rate, quality } = this.state;

    if (name != "" && rate != "" && quality != "") {
      console.log(quality);
      var tempQuality = quality.toString();
      if (tempQuality == "1" || tempQuality == "2" || tempQuality == "3") {
        this.props.add(name, rate, quality);
        this.setState({ modalVisible: visible });
      } else {
        Toast.show("Quality should be 1 or 2 or 3");
      }
    } else {
      Toast.show("Fields cannot be empty");
    }
  }

  //To delete a record
  delete(id) {
    this.props.deleteDetail(id);
  }

  handleChange = (key, event) => {
    this.setState({ [key]: event });
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  //Modal to add data
  modal() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(e) => this.handleChange("name", e)}
              ></TextInput>

              <TextInput
                style={styles.input}
                placeholder="Rate"
                onChangeText={(e) => this.handleChange("rate", e)}
              ></TextInput>

              <TextInput
                style={styles.input}
                placeholder="Quality(1,2,3)"
                onChangeText={(e) => this.handleChange("quality", e)}
              ></TextInput>
              <View style={styles.modalBtn}>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    this.add(!modalVisible);
                    //   this.setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Add</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  //View for the list
  viewList(item) {
    return (
      <View>
        <View style={styles.item}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.body}>Rate:{item.rate}$</Text>
          <Text style={styles.body}>Quality:{item.quality}</Text>
          <View style={styles.customBtnDeleteView}>
            <TouchableOpacity
              style={styles.customBtnBGDelete}
              onPress={() => {
                this.delete(item.id);
              }}
            >
              <Text style={styles.customBtnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  //Calling the login action
  login() {
    this.props.login(this.state.email, this.state.password);
  }
  render() {
    return (
      <View>
        <View style={styles.customBtnView}>
          <TouchableOpacity
            style={styles.customBtnBG}
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <Text style={styles.customBtnText}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.props.product}
          renderItem={({ item }) => this.viewList(item)}
          keyExtractor={(item) => item.id}
        />
        {this.modal()}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    product: state.product.products,
    numResult: state.auth.numResult,
    userDetails: state.auth.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (name, rate, quality) => {
      dispatch(add(name, rate, quality));
    },
    deleteDetail: (id) => {
      dispatch(deleteDetail(id));
    },
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    borderBottomEndRadius: 5,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
  },
  body: {
    fontSize: 16,
  },
  deleteButton: {
    borderRadius: 60,
    flex: 1,
    height: 30,
    width: 30,
  },
  customBtnText: {
    fontWeight: "400",
    alignSelf: "center",
    paddingTop: 3,
    color: "#fff",
  },

  /* Here style the background of your button */
  customBtnBG: {
    backgroundColor: "green",
    marginTop: 5,
    height: 30,
    width: 70,

    borderRadius: 30,
  },
  customBtnView: {
    padding: 5,
    paddingLeft: "70%",
  },
  customBtnBGDelete: {
    backgroundColor: "red",
    height: 30,
    width: 70,

    borderRadius: 30,
  },
  customBtnDeleteView: {
    paddingLeft: "70%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    paddingTop: 10,
    width: 300,
    height: 300,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 10,
    padding: 10,
    marginTop: 50,
    marginRight: 15,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
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
  modalBtn: {
    flexDirection: "row",
    paddingLeft: "50%",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
