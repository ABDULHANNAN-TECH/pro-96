import * as React from "react";
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import CreateTopicScreen from '../screens/CreateTopicScreen';
import AllTopicScreen from '../screens/AllTopicScreen';
import {AppStackNavigator} from './AppStackNavigator';

export const AppTabNavigator = createBottomTabNavigator({
    AllTopics:{
        screen:AppStackNavigator,
        navigationOptions:{
            tabBarIcon:<Image
                source = {require('../assets/request-list.png')}
                style = {{width:20, height:20}}/>,
            tabBarLabel:'All Topics'
        }
    },
    CreateTopicScreen:{
        screen:CreateTopicScreen,
        navigationOptions:{
            tabBarIcon:<Image
                source = {require('../assets/request-book.png')}
                style = {{width:20, height:20}}/>,
            tabBarLabel:'Create A Topic'
        }
    },    
})