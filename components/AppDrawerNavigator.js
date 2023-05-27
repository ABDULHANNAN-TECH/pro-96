import * as React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer'; 
import {AppTabNavigator} from './AppTabNavigator'; 
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MySupportScreen from '../screens/MySupportScreen';
import NotificationScreen from '../screens/NotificationScreen'
import {Icon} from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen:AppTabNavigator,
        navigationOptions:{
            drawerIcon : <Icon name="home" type ="fontawesome5"/>
        }
    },
    MySupport:{
        screen:MySupportScreen,
        navigationOptions:{
            drawerIcon : <Icon name="gift" type ="font-awesome" />,
            drawerLabel : "My Support For Topics"
          }
    },
    Notifications:{
        screen:NotificationScreen,
        navigationOptions:{
            drawerIcon : <Icon name="bell" type ="font-awesome" />,
            drawerLabel : "Notifications"
          }
    },
    Setting:{
        screen:SettingScreen,
        navigationOptions:{
            drawerIcon : <Icon name="settings" type ="fontawesome5" />,
            drawerLabel : "Settings"
          }
    },
},
    {
        contentComponent:CustomSideBarMenu
    },
    {
        initialRouteName:"Home"
    }
);