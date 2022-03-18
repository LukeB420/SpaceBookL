import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler'
import 'react-native-reanimated'


class LoginScr extends Component{
  constructor(props){
    super(props);

    this.state = {
        email: "",
        password: ""
    }
}

login = async () => {

    //Validation here...

    return fetch("http://10.0.2.2:3333/api/1.0.0/login", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
    })
    .then((response) => {
        if(response.status === 200){
            return response.json()
        }else if(response.status === 400){
            throw 'Invalid email or password';
        }else{
            throw 'Something went wrong';
        }
    })
    .then(async (responseJson) => {
            console.log(responseJson);
            await AsyncStorage.setItem('@session_token', responseJson.token);
            this.props.navigation.navigate("Home");
    })
    .catch((error) => {
        console.log(error);
    })
}
    render() {
    return (
  
      <View style={styles.container}>
        <StatusBar backgroundColor='#1e90ff'/>
        <Text style={styles.welcome}>Spacebook Login</Text>
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
          onPress={() => this.login()}>  
            <Text style={styles.txt}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}
          onPress={() => this.props.navigation.navigate("Signup")}> 
            <Text style={styles.txt}>Signup</Text>
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
      marginBottom: 250
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
  export default LoginScr;