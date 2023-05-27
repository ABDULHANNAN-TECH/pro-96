import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class AllTopicScreen extends React.Component{
    constructor() {
        super();
        this.state = {
          createdTopicList: []
        };
        this.createRef = null;
    }
        
    getCreatedTopicList = () => {
        this.createRef = db.collection("created_topics")
        .onSnapshot((snapshot) => {
                var createdTopicList = snapshot.docs.map(document => document.data());
                this.setState({
                    createdTopicList : createdTopicList
                });
        })
    }

    componentDidMount(){
        this.getCreatedTopicList();
    }

    keyExtractor = (item, index) => index.toString();
    
    renderItem = ({ item, i }) => {
        console.log(item.topic_name)
        return (
          <ListItem
            key={i}
            title={item.topic_name}
            subtitle={item.description}
            titleStyle={{ color: "black", fontWeight: "bold" }}
            rightElement={
              <TouchableOpacity 
                style={styles.button}
                onPress={()=>{
                    this.props.navigation.navigate("ReceiverDetails",{"details":item})
                }}>
                <Text style={{color:"#ffff"}}>View</Text>
              </TouchableOpacity>
            }
            bottomDivider
          />
        );
    }

    componentWillUnmount() {
        this.createRef
    }

    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title = "Veiw Topics" navigation = {this.props.navigation}/>
                <View style={{flex:1}}>
                    {
                        this.state.createdTopicList.length === 0
                        ?(
                            <View style={styles.subContainer}>
                                <Text style={{fontSize:20,}}>List Of All Topics</Text>    
                            </View>
                        )
                        :(
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.state.createdTopicList}
                                renderItem={this.renderItem}
                            />
                        )
                    }    
                </View>   
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
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
       }
    }
  })