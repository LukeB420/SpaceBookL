import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-reanimated'

class Signup extends Component{

  constructor(props){
    super(props);

    this.state = {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    }
}

signup = async () => {
  //Validation here...

  return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
  })
  .then((response) => {
      if(response.status === 201){
          return response.json()
      }else if(response.status === 400){
          throw 'Failed validation';
      }else{
          throw 'Something went wrong';
      }
  })
  .then((responseJson) => {
         console.log("User created with ID: ", responseJson);
         this.props.navigation.navigate("Login");
  })
  .catch((error) => {
      console.log(error);
  })
}

  render() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#1e90ff'/>
      <Text style={styles.welcome}>Spacebook Sign Up</Text>
      <TextInput
      style={styles.input}
      placeholder="First Name"
      onChangeText={(first_name) => this.setState({first_name})}
      value={this.state.first_name}
      />
      <TextInput
      style={styles.input}
      placeholder="Last Name"
      onChangeText={(last_name) => this.setState({last_name})}
      value={this.state.last_name}
      />
      <TextInput
      style={styles.input}
      placeholder="Email"
      onChangeText={(email) => this.setState({email})}
      value={this.state.email}
      />
      <TextInput
      style={styles.input}
      placeholder="Password"
      onChangeText={(password) => this.setState({password})}
      value={this.state.password}
      secureTextEntry
      />
      <View style={styles.btnlay}>
        <TouchableOpacity style={styles.btn}
        onPress={() => this.props.navigation.navigate("Login")}>  
          <Text style={styles.txt}>Back to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}
        onPress={() => this.signup()}>  
          <Text style={styles.txt}>Signup Now!</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontFamily: "serif",
    fontSize: 30,
    color: "#fff",
    marginBottom: 200
  },
  input: {
    fontSize: 10,
    color: "#000",
    width: "90%",
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10
  },
  btn: {
    backgroundColor: '#FF0',
    padding: 15,
    width: "45%"
  },
  btnlay: {
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%"
  },
  txt: {
    fontSize: 18,
    color: "#000",
    width: "90%",
    textAlign: "center",
    padding: 15,
    marginBottom: 10
  },
});

export default Signup;