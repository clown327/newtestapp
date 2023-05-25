//민원을 보여주는 페이지 입니다.
import {ScrollView, Image, TouchableOpacity, Text, View, StyleSheet, Button, SafeAreaView, ScrollViewComponent} from 'react-native';
//import person from "../../../assets/person.png";

export const  Settings = (props) => {
    return(

      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View>
          </View>
            <TouchableOpacity style={styles.container1}>
              <Text style={styles.text1}>
              사진과 함께 "관리자" "관할 지역"이 들어갈 위치 입니다.
              </Text>
            </TouchableOpacity>                

            <TouchableOpacity style={styles.topbutton} onPress={ ()=> props.navigation.navigate("Managing")}>
               <Text>
                Managing
               </Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.topbutton}>
               <Text>
               추가 할만한거1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topbutton}>
               <Text>
               추가 할만한거2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topbutton}>
               <Text>
               추가 할만한거3
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topbutton}>
               <Text>
               추가 할만한거4
              </Text>
            </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container1:{
    width:"95%",
    height: 120,    
    marginTop:35,
    backgroundColor:"powderblue",
    //alignItems: "center",
    //justifyContent: "center",
    marginBottom: 40,
    marginLeft:10,
    borderRadius:10,

    

  },
  text1:{
  fontSize: 20,
  color: "black",
  textAlign:"center",
  },
  container: {
    width:"100%",
    height:"100%",
    backgroundColor:"#ffffff",

  },
  person: {
    width:100,
    height: 98,
  },

  topbutton: { //maniging 컨테이너
    width:"95%" ,
    height: 70,
    //borderColor:"yellow",
    backgroundColor: "#E4E5F8", //버튼 컨테이너 색
    justifyContent:"center",
    alignItems:'flex-start',
    fontSize:"50",
    marginLeft: 10,
    marginBottom:25,

    borderRadius:10,
   // borderColor:"gray",
   // borderWidth: 0.5,
  },
  buttontext: {
    flex:1,
  },
});  

/*line1:{  //제일 위에 있는 선
    position: "absolute",
    width: 390,
    height: 0,
    left: 0,
    top: 180,
    borderWidth: 1,
  },*/
