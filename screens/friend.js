import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import StyleSheetValidation from 'react-native/Libraries/StyleSheet/StyleSheetValidation';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler'
import 'react-native-reanimated'


class Friend extends Component{
    render() {
    return (
  
      <View style={styles.container}>
        <StatusBar backgroundColor='#1e90ff'/>
        <Text style={styles.welcome}>Spacebook Friend</Text>
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
          onPress={() => this.props.navigation.navigate("Login")}> 
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
  export default Friend;