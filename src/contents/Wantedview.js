//민원을 관리할 수 있는 화면 입니다 stack
import {Text, View, SafeAreaView, StyleSheet, ScrollView } from 'react-native'

export const Wantedview = (props) => {

    const bountie = props.route.params.bountie;
    
    return( 
    <ScrollView>
        <View style={styles.container2}>
            <View>
            <View style={styles.title}>
                <Text style={styles.titletext}>
                유형 : {bountie.title} ({bountie.pos})
                </Text>
                <Text></Text>
            </View>
                <View style={styles.detail}>
                    <Text style={styles.detailtext}>{bountie.content}</Text>
                </View>
            </View>
        </View>
    </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 2,
      width: "100%",
      height: "100%",
      backgroundColor: "white",
    },
    container2:{
        marginTop:50,
      },    
    title: {
      width: "100%",
      height: 60,
      marginTop: 5,
      marginLeft: 10,
      //backgroundColor:"red",
    },
    titletext: {
      fontSize: 25,
      fontWeight: "bold",
    },
    photocontainer: {
      width: 370,
      height: 370,
      marginTop: -10,
      margin: 10,
      borderRadius: 10,
      backgroundColor: "white",
      flex: 1,
    },
    photo: {
      width: 370,
      height: 370,
      borderRadius: 10,
    },
    detail: {
      width: "93%",
      //backgroundColor:"yellow",
      marginLeft: 14,
      marginBottom: 14,
    },
    detailtext: {
      fontSize: 17,
      marginTop: 4,
    },
    combutton: {
      width: "88%",
      height: 65,
      backgroundColor: "#1E90FF",
      marginTop: 10,
  
      marginLeft: 25,
      marginRight: 25,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    comtext: {
      fontSize: 25,
      fontWeight: "bold",
      color: "white",
    },
  
  
    comcontainer2: {
      width:"100%",
      height:"20%",
      //backgroundColor:"yellow",    
      alignItems:"center",
      justifyContent:"flex-end",
      //flexDirection:"column"
    },
    comtext2:{
      fontSize:30,
      fontWeight:"bold",
    },
    photocontainer2:{
      width:"100%",
      height:"60%",
      //backgroundColor:"red",
      alignItems:"center",
      justifyContent:"center",
  
    },
    //photo:{},
    buttoncontainer2:{
      width:"100%",
      height:"30%",
      //backgroundColor:"powderblue",
    },
    button2:{
      width:"85%",
      height:70,
      //margin:30,
      marginLeft:30,
      marginRight:30,
      // marginBottom:30,
      padding:10,
      borderRadius:10,
      backgroundColor:"#1E90FF",    
      alignItems:"center",
      justifyContent:"center",
    },
    buttontext2: {
      color:"white",
      fontSize:30,
      fontWeight:"bold",
    }
  });
