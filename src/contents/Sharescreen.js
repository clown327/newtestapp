//민원을 관리할 수 있는 화면 입니다 stack
import {Text, View, SafeAreaView, StyleSheet, ScrollView} from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import { mainColor } from '../../color';

export const Sharescreen = (props) => {

    const report = props.route.params.report;
    const images = JSON.parse(report.photo).slice(0, 4).map((uri) => ({ uri }));
    
    return( 
    <ScrollView style={styles.container}>
        <View style={styles.container2}>
            <View>
              <View style={styles.title}>
                  <Text style={styles.titletext}>
                  {report.type} ({report.state})
                  </Text>
                  <Text></Text>
              </View>
              <View style={{height:365,width:"95%",marginLeft:8,alignItems:"center", borderBottomColor:mainColor, borderBottomWidth:1.5,}}>
                  <View style={styles.photocontainer}>
                    <SliderBox images={images} style={styles.photo} />
                  </View>
                  </View>
                  <View style={styles.detail}>
                      <Text style={styles.positext}>{report.position}</Text>
                      <Text style={styles.pnumtext}>{report.pnumber}</Text>
                      <Text style={styles.detailtext}>{report.detail}</Text>
                  </View>
              </View>
        </View>
    </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      backgroundColor: "white",
    },
    container2:{
        marginTop:50,
      },    
      positext:{
        fontSize:19,
        fontWeight:"600",
    
      },
      pnumtext:{
        color:"gray",
      },
    title: {
      width: "95%",
      height: 60,
      marginTop: 15,
      marginLeft: 10,
      //backgroundColor:"red",
      justifyContent:"center",
      alignItems:"center",
      flex:1,
      borderBottomWidth:1.5,
      borderBottomColor:mainColor,
    },
    titletext: {
      fontSize: 25,
      fontWeight: "bold",
    },
    photocontainer: {
      width: 320,
      height: 320,
      //marginTop: -10,
      margin: 10,
      marginTop:20,
      borderRadius: 10,
      //backgroundColor: "transparent",
      flex: 1,
      alignSelf:"center",
      //backgroundColor:"black",
    },
    photo: {
      width: 330,
      height: 330,
      borderRadius: 10,
    },
    detail: {
      width: "84%",
     // backgroundColor:"yellow",
      marginLeft: 30,
      flex:1,
      marginBottom: 14,
      marginTop:10,
    },
    detailtext: {
      fontSize: 15,
      marginTop: 7,

      //backgroundColor:"black",
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
