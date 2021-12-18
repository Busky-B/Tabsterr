import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import HomeScreen from './HomeScreen';
import Navtest from './navtest'
import {BugFilled} from '@ant-design/icons'
const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen 
                    name='Homescreen'
                    component={HomeScreen}
                    // options={{ title: 'Welcome from nav'}}
                    style={{height: 100}}
                />

                <Stack.Screen 
                    name="navtest"
                    component={Navtest}
                    options={{title: 'this is a title'}}
                
                /> 
            </Stack.Navigator>
    );
}

export default MyStack;
