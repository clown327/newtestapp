//공지를 보여주는 화면입니다.
import {Text, View, SafeAreaView, StyleSheet, ScrollView} from 'react-native'
import { buttonGreen, cello, darkLoafer, loafer, mainColor, subColor3 } from '../../color';

export const Notiview = (props) => {
    


    const notice = props.route.params.notice;
    
    return(
        <View style={{ flex: 1, justifyContent:"flex-start", alignItems: "center",paddingTop:40,backgroundColor:darkLoafer }}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{notice.title}</Text>
        </View>
        <View style={styles.dateView}>
        <Text style={{ color:subColor3, fontFamily:"suiteL", marginTop:10}} >{notice.date}</Text>
        </View>
        <ScrollView style={styles.contentScroll}>
          <Text style={{fontFamily:"suiteM"}}>
              {notice.content}
          </Text>
        </ScrollView>
      </View>
    );
}


const styles = StyleSheet.create({
    titleView: {
      width: "80%",
      borderBottomColor: buttonGreen,
      borderBottomWidth: 2,
      alignItems: "center",
    },
    dateView:{
      width:"80%",
      alignItems:"flex-end",
      marginBottom:15
    },
    titleText:{
      fontSize:18,
      fontFamily:"suiteB",
      textAlign:"center",
      marginBottom:5,
     
    },
    contentScroll:{
      borderWidth:2,
      padding:20,
      borderColor:cello,
      borderRadius:10,
      maxHeight:500,
      width:"80%",
      backgroundColor:loafer,
      elevation:3
    }
  });
  