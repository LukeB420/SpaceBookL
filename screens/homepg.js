import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler'
import 'react-native-reanimated'


class HomePg extends Component{

  constructor(props){
    super(props);

    this.state = {
        first_name: "",
        last_name: ""
    }
}

friends = async () => {

    //Validation here...

    return fetch("http://10.0.2.2:3333/api/1.0.0/user/14", {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(this.state)
    })
    .then((response) => {
        if(response.status === 200){
          this.setState({first_name: responseJson.first_name})
        }else if(response.status === 400){
            throw 'Unable to retrieve profile';
        }else{
            throw 'Something went wrong';
        }
    })
    .then(async (responseJson) => {
            console.log(responseJson);
            await AsyncStorage.setItem('@session_token', responseJson.token);
            // this.props.navigation.navigate("Home");
    })
    .catch((error) => {
        console.log(error);
    })
}


    render() {
    return (
  
      <View style={styles.container}>
        <StatusBar backgroundColor='#1e90ff'/>
        <TouchableOpacity style={styles.square}
        onPress={() => this.props.navigation.navigate("Profile")}>  
          <Text style={styles.txt}>My profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square}
        onPress={() => this.friends()}>  
          <Text style={styles.txt}>{this.state.first_name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square}
        onPress={() => this.props.navigation.navigate("Friend")}>  
          <Text style={styles.txt}>Friend 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square}
        onPress={() => this.props.navigation.navigate("Friend")}>  
          <Text style={styles.txt}>Friend 3</Text>
        </TouchableOpacity>
        
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
    input: {
      fontSize: 10,
      color: "#000",
      width: "90%",
      backgroundColor: '#fff',
      padding: 15,
      marginBottom: 10
    },
    txt: {
      fontSize: 18,
      color: "#000",
      width: "90%",
      textAlign: "center",
      padding: 15,
      marginBottom: 10
    },
    square: {
        backgroundColor: '#FF0',
        padding: 40,
        marginBottom: 10,
        textAlign: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%"
      },
  });
  export default HomePg;