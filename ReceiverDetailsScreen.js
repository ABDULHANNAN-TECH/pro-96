import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { RFValue } from "react-native-responsive-fontsize";

export default class ReceiverDetailsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
          userId                : firebase.auth().currentUser.email,
          receiverId            : this.props.navigation.getParam('details')["user_id"],
          topicId               : this.props.navigation.getParam('details')["topic_id"],  
          topicName             : this.props.navigation.getParam('details')["topic_name"],
          description           : this.props.navigation.getParam('details')["description"],
          receiverName          : '',
          receiverContact       : '',
          receiverAddress       : '',
          receiverTopicDocId    : '',
          userName : '',
        }
      }
    
    getReceiverDetails(){
      db.collection('users').where('email_id','==',this.state.receiverId).get()
      .then(snapshot=>{
        snapshot.forEach(doc=>{
          this.setState({
            receiverName    : doc.data().first_name,
            receiverContact : doc.data().contact,
            receiverAddress : doc.data().address,
          })
        })
      });
    
      db.collection('created_topics').where('topic_id','==',this.state.topicId).get()
      .then(snapshot=>{
        snapshot.forEach(doc => {
          this.setState({receiverTopicDocId:doc.id})
       })
    })}
    
    updateTopicStatus=()=>{
      db.collection('all_topics').add({
        topic_name          : this.state.topicName,
        topic_id            : this.state.topicId,
        topic_by            : this.state.receiverName,
        donor_id            : this.state.userId,
        topic_status        :  "A Person Has Interest To Support You"
      })
    }

    getDonorDetails =(userId)=>{
        db.collection('users').where('email_id','==',userId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc)=>{
            this.setState({
              userName:doc.data().first_name + " " + doc.data().last_name
            })
          })
        })
      }
  
      addNotification = () =>{
        db.collection("all_notifications").add({
          targeted_user_id : this.state.receiverId,
          donor_id : this.state.userId,
          topic_id : this.state.topicId,
          topic_name : this.state.topicName,
          date : firebase.firestore.FieldValue.serverTimestamp(),
          notification_status : "unread",
          message : "A Person Has Interest In Supporting You",
        })
      }
      
      componentDidMount(){
        this.getReceiverDetails()
        this.getDonorDetails(this.state.userId)
      }

    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:0.1}}>
                    <Header
                        leftComponent={<Icon name="arrow-left" type="feather"
                        color="black" onPress={()=>this.props.navigation.goBack()}/>}
                        centerComponent={{text:"Support Topic",
                            style:{color:"black", fontSize:23.5,fontWeight:'bold'}}}
                        backgroundColor={"#ff7f00"}
                    />
                </View>
                <View style={{flex:0.3}}>
                    <Card 
                        title = {"Topic Information"}
                        titleStyle = {{fontSize:20}}
                    >
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Topic Name: {this.state.topicName}</Text>
                        </Card>
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Description: {this.state.description}</Text>
                        </Card>    
                    </Card>
                </View>
                <View style={{flex:0.3}}>
                    <Card 
                        title={"Topic Creator Information"}
                        titleStyle={{fontWeight:'bold'}}>
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Name: {this.state.receiverName}</Text>
                        </Card>
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Contact: {this.state.receiverContact}</Text>
                        </Card>
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Address: {this.state.receiverAddress}</Text>
                        </Card>
                    </Card>
                </View>
                <View style={styles.buttonContainer}>
                    {
                        this.state.receiverId !== this.state.userId
                        ? (
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={()=>{
                                    this.updateTopicStatus()
                                    this.addNotification()
                                    this.props.navigation.navigate("MySupport")
                                }}>
                                <Text style={{fontSize:18, fontWeight:'500'}}>I Want To Support</Text>
                            </TouchableOpacity>
                        )
                        : null
                    }
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:"28%",
    height:RFValue(35),
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 20,
    backgroundColor: "#ff7f00",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})