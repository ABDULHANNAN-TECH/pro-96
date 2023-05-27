import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MySupportScreen extends Component {
  static navigationOptions = { header: null };

   constructor(){
     super()
     this.state = {
       donorId : firebase.auth().currentUser.email,
       allSupporters : [],
       donorName : '',
     }
     this.topicRef= null
   }


   getAllSupporters =()=>{
    this.topicRef = db.collection("all_topics")
    .where("donor_id" ,'==', this.state.donorId)
    .onSnapshot((snapshot)=>{
      var allSupporters = []
       snapshot.docs.map((doc)=>{
         var support = doc.data()
         support['doc_id'] = doc.id
         allSupporters.push(support)
       })
      this.setState({
        allSupporters : allSupporters,
      });
    })
  }

  getDonorDetais =(donorId)=>{
   db.collection('users').where("email_id", "==",donorId).get()
   .then((snapshot)=>{
     snapshot.forEach((doc)=>{
       this.setState({
         donorName:doc.data().first_name + " " + doc.data().last_name
       })
     })
   })
  }

  sendTopic = (topicDetails) => {
   if (topicDetails.topic_status === "Stop Supporting"){
     var topicStatus = "A Person Has Interest To Support You"
     db.collection('all_topics').doc(topicDetails.doc_id).update({
       topic_status:"A Person Has Interest To Support You"
     })
     this.sendNotification(topicDetails, topicStatus)
   }

   else{
     var topicStatus = "Stop Supporting"
     db.collection('all_topics').doc(topicDetails.doc_id).update({
       topic_status:"Stop Supporting"
     })
     this.sendNotification(topicDetails, topicStatus)
   }
  }

  sendNotification =(topicDetails, topicStatus) => {
    var topicId = topicDetails.topic_id
    var donorId = topicDetails.donor_id 
    db.collection("all_notifications")
    .where('topic_id',"==", topicId)
    .where('donor_id','==',donorId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        if(topicStatus === "Stop Supporting"){
          message =  "Congratulations, You Have A Supporter"
        }
        else{
         message =  "A Person Has Interest In Supporting You"
        }
        db.collection('all_notifications').doc(doc.id).update({
          message : message,
          notification_status : "unread",
          date : firebase.firestore.FieldValue.serverTimestamp()
        })
      })
    })  
   }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>(
    <ListItem
      key={i}
      title={item.topic_name}
      subtitle={"Topic Created By : " + item.topic_by}
      leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
      titleStyle={{ color: 'black', fontWeight: 'bold' }}
      rightElement={
          <TouchableOpacity 
           style={[
             styles.button,
             {
               backgroundColor : item.topic_status === "Stop Supporting" ? "red" : "#ff7f00"
             }
           ]}
           onPress={()=>{
             this.sendTopic(item)
           }}
           >
            <Text style={{color:'white'}}>
              {item.topic_status === "Stop Supporting" ? "Stop Supporting" : "Support"}
            </Text>
          </TouchableOpacity>
        }
      bottomDivider
    />
  )

  componentDidMount(){
    this.getDonorDetais(this.state.donorId)
    this.getAllSupporters()
  }

   componentWillUnmount(){
     this.topicRef();
   }

   render(){
     return(
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="Support A Topic"/>
         <View style={{flex:1}}>
           {
             this.state.allSupporters.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List Of All Topics</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allSupporters}
                 renderItem={this.renderItem}
               />
             )
           }
         </View>
       </View>
     )
   }
   }


const styles = StyleSheet.create({
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff7f00",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})