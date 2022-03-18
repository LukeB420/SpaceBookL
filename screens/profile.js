import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import StyleSheetValidation from 'react-native/Libraries/StyleSheet/StyleSheetValidation';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler'
import 'react-native-reanimated'


class ProfilePg extends Component{

  logout = async () => {
    let token = await AsyncStorage.getItem('@session_token');
    await AsyncStorage.removeItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/logout", {
        method: 'post',
        headers: {
            "X-Authorization": token
        }
    })
    .then((response) => {
        if(response.status === 200){
            this.props.navigation.navigate("Login");
        }else if(response.status === 401){
            this.props.navigation.navigate("Login");
        }else{
            throw 'Something went wrong';
        }
    })
    .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
    })
}

    render() {
    return (
  
      <View style={styles.container}>
        <StatusBar backgroundColor='#1e90ff'/>
        <Text style={styles.welcome}>Spacebook Profile</Text>
        <Text style={styles.post}>Post 1</Text>
        <Text style={styles.post}>Post 2</Text>
        <Text style={styles.post}>Post 3</Text>
        <Text style={styles.post}>Post 4</Text>
        <TextInput
        style={styles.input}
        placeholder="Write a post..."
        />
        
        <View style={styles.btnlay}>
          <TouchableOpacity style={styles.btn}
          onPress={() => this.props.navigation.navigate("Home")}>  
            <Text style={styles.txt}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}
          
          onPress={() => this.logout()}> 
            <Text style={styles.txt}>Log Out</Text>
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
      padding :20,
      fontSize: 30,
      color: "#fff",
      marginBottom: 20
    },
    post: {
      fontFamily: "serif",
      width: "90%",
      backgroundColor: '#000',
      padding :20,
      fontSize: 15,
      color: "#fff",
      marginBottom: 15
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
  export default ProfilePg;