import * as React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,TextInput,KeyboardAvoidingView,Alert} from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from "react-native-responsive-fontsize";

export default class CreateTopicScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userId : firebase.auth().currentUser.email,
            topicName:'',
            description:'',
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }

    addTopic = (topicName,description)=>{
        var userId = this.state.userId
        var randomTopicId = this.createUniqueId();
        db.collection('created_topics').add({
            'user_id':userId,
            'topic_name':topicName,
            'description':description,
            'topic_id':randomTopicId,
        })
        this.setState({
            topicName:'',
            description:'',
        })
        return Alert.alert('Topic Created And Added Successfully')
    }
    
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title = "Create Your Topic" navigation = {this.props.navigation}/>
                <KeyboardAvoidingView style={styles.keyBoardStyle}>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder='Topic Name'
                        onChangeText={(text)=>{
                            this.setState({topicName:text})
                        }}
                        value = {this.state.topicName}
                    />

                    <TextInput
                        style={[styles.formTextInput,{height:300,}]}
                        multiline
                        numberOfLines = {10} 
                        placeholder='Your Ideas About the Topic'
                        onChangeText={(text)=>{
                            this.setState({description:text})
                        }}
                        value = {this.state.description}
                    />

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={()=>{
                            this.addTopic(this.state.topicName,this.state.description)
                        }}>
                        <Text style={styles.buttontxt}>Create</Text>
                    </TouchableOpacity>   
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    keyBoardStyle: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    formTextInput: {
      width: "80%",
      height: RFValue(35),
      borderWidth: 1.4,
      padding: 10,
    },
    ImageView:{
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center",
      marginTop:20
    },
    imageStyle:{
      height: RFValue(150),
      width: RFValue(150),
      alignSelf: "center",
      borderWidth: 5,
      borderRadius: RFValue(10),
      
    },
    requestedbookName:{
      fontSize: RFValue(30),
      fontWeight: "500",
      padding: RFValue(10),
      fontWeight: "bold",
      alignItems:'center',
      marginLeft:RFValue(60)
    },
    status:{
      fontSize: RFValue(20),
      marginTop: RFValue(30),
    },
    bookstatus:{
      marginLeft:RFValue(275),
      padding: RFValue(10),
      fontSize: RFValue(14),
      fontWeight: "500",
      marginTop: RFValue(50),
      borderWidth: 1.4,
      marginRight:RFValue(250)
    },
    buttonView:{
      flex: 0.2,
      marginTop:50,
      justifyContent: "center",
      alignItems: "center",
    },
    buttontxt:{
      fontSize: RFValue(15),
      fontWeight: "500",
      color: "black",
    },
    touchableopacity:{
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      width: "90%",
    },
    requestbuttontxt:{
      fontSize: RFValue(20),
      fontWeight: "bold",
      color: "black",
    },
    button: {
      marginTop:50,
      width: "20%",
      height: RFValue(40),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(18),
      backgroundColor: "#ff7f00",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16
    },
  });
  