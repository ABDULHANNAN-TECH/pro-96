import * as React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AllTopicScreen from '../screens/AllTopicScreen';
import ReceiverDetailsScreen from '../screens/ReceiverDetailsScreen';

export const AppStackNavigator = createStackNavigator({
    CreatedTopicList : {
        screen:AllTopicScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    ReceiverDetails: {
        screen:ReceiverDetailsScreen,
        navigationOptions:{
            headerShown:false
        }
    },    
},
{
    initialRouteName:"CreatedTopicList"
})