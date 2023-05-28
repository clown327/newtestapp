//민원을 관리할 수 있는 화면 입니다 stack
import {Text, View, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { mainColor } from '../../color';

export const Wantedview = (props) => {
    


  const bountie = props.route.params.bountie;
  
  return(
  <ScrollView
       style={styles.container}
       keyboardShouldPersistTaps='handled'>
       <View style={styles.container2}>
           <View style={styles.title}>
               <Text style={styles.titletext}>수배</Text>
           </View>
           <View style={styles.title2}>
              <Text style={styles.titletext2}>{bountie.title}</Text>
           </View>
           <View style={styles.contentcontainer}>
              <Text style={styles.content2}>{bountie.pos}</Text>
           </View>
           <View style={styles.contentcontainer}>
              <Text style={styles.content}>{bountie.content}</Text>
           </View>
       </View>
   </ScrollView>
  );
}
const styles = StyleSheet.create({
  container:{
      width:"100%",
      height:"100%",
      backgroundColor:"white"
  },
  container2:{
      marginTop:50,
    },    
  send:{
      marginLeft: 110,

  },
  title:{
      width:"100%",
      height:60,
      margin:13,
      flexDirection:"row"
  },
  titletext:{
      fontSize:27,
      fontWeight:"bold",
      margin:10,
      color:mainColor,
  },
  imagecontainer:{

  },
  inputContainer: {
      width: '90%',
      padding: 10,
      height: 60,
      backgroundColor: 'powderblue',
      borderRadius: 10,
      marginLeft: 16,
      marginTop: 20,
  },
  input: {
      fontSize: 27,
      fontWeight: 'bold',
  },
  title2:{
      width:"91%",
      padding:10,
      height:"100%",
      flex:1,
      backgroundColor:"powderblue",
      borderRadius:10,
      marginLeft:16,
      marginTop: 10,
      justifyContent:"center",
      
  },
  titletext2:{
      fontSize:24,
      fontWeight:"bold",
  },
  contentcontainer:{
      width:"91%",
      height:"100%",
      flex:1,
      backgroundColor:"#E9E4E4",
      borderRadius:10,
      marginLeft:17,
      marginTop:30,
  },
  content:{
      fontSize:17,
      marginTop:3,
      marginLeft:10,
      marginRight:5,
      marginBottom:5,
  },
  content2:{
    fontWeight:"bold",
    fontSize:17,
    marginTop:3,
    marginLeft:10,
    marginRight:5,
    marginBottom:5,
}
});
