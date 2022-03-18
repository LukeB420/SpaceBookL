import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
//import StyleSheetValidation from 'react-native/Libraries/StyleSheet/StyleSheetValidation';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { Component } from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated'


import LoginScr from './screens/login';
import Signup from './screens/signup';
import Home from './screens/homepg';
import Profile from './screens/profile';
import Friend from './screens/friend';



  
const Drawer = createDrawerNavigator();

  class App extends Component{
    render(){
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Login">
                    <Drawer.Screen name="Login" component={LoginScr} />
                    <Drawer.Screen name="Signup" component={Signup} />
                    <Drawer.Screen name="Home" component={Home} />
                    <Drawer.Screen name="Profile" component={Profile} />
                    <Drawer.Screen name="Friend" component={Friend} />
                </Drawer.Navigator>
                
            </NavigationContainer>
        );
    }
}

export default App;
