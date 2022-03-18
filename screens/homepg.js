import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList} from 'react-native';
import 'react-native-gesture-handler'
import 'react-native-reanimated'



class HomePg extends Component{

  constructor(props){
    super(props);

    this.state = {
        isLoading: true,
        dataSource: []
    }
}

componentDidMount() {

    //Validation here...

    fetch("http://10.0.2.2:3333/api/1.0.0/user/12")
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson
      
    })
  })
}

_renderItem = ({item, index}) => {
  return (
    <View style={styles.item}>
      <Text>{item.first_name}</Text>
    </View>
  )
}

    render() {
      let {container} = styles
      let {dataSource, isLoading} = this.state
    return (
      
    <View style={container}>
      <FlatList
      data={dataSource}
      renderItem={this._renderItem}
      keyExtractor={(item,index) => index.toString()}
      />
    </View>
      
      


        
      
    )
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1e90ff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      padding: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#eee'
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