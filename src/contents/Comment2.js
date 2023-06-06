import React, { useState } from 'react';
import { SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { database } from "../../firebase";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ref,update, child } from 'firebase/database';
import { showAlert, closeAlert} from 'react-native-customisable-alert';
import { darkCello, loafer } from '../../color';

export const Comment2 = (props) => {

    // const report = props.route.params.report;
    const report=props.report
    
    const [content, setContent] = useState(report.userReply);

    const updateReportProcess = async (report, newText) => { //과정 업데이트 해주는거
        const dbRef = ref(database);
        const reportsRef = child(dbRef, `reports/${report.uid}`);
        await update(reportsRef, { userReply: newText });
    };
    const handleSave = async () => {
        showAlert({
            alertType:"custom",
            dismissable:false,
            customAlert:(
                <View style={styles.alertText}>
                <Text>저장 중입니다.</Text>
              </View>
            )
        })
        await updateReportProcess(report, content);
        report.userReply=content;
        
showAlert({
            alertType:"custom",
            dismissable:true,
            customAlert:(
                <View style={styles.alertText}>
                <Text>저장이 완료되었습니다!</Text>
              </View>
            )
        })
        // props.navigation;
    };



    const updateReportState = async (report, newState) => {//상태 업데이트 해주는거
        const dbRef = ref(database);
        const reportsRef = child(dbRef, `reports/${report.uid}`);
        await update(reportsRef, { state: newState });
      };

    const handlePost = async (report, nextState) => {
        await updateReportState(report, nextState);
        props.navigation.navigate('Mainscreen');
    };

    return (
    //   <KeyboardAvoidingView
    //     behavior={Platform.OS === "ios" ? "padding" : "height"}
    //     style={styles.container}
    //     keyboardVerticalOffset={50}
    //   >
        <ScrollView style={{ width:"100%" }} keyboardShouldPersistTaps="handled">
          <SafeAreaView>
            <View style={styles.title}>
              <Text style={styles.titletext}>신고자 알림</Text>

              <View style={{flexDirection:"row"}}>
             {!props.isComplete&& <TouchableOpacity style={styles.button} onPress={()=>{handleSave(images)}}>
                <View style={styles.send}>
                  <Icon name="save" size={50} color="#000000" />
                  <Text style={styles.sendTenxt}>저장하기</Text>
                </View>
              </TouchableOpacity>}
              {!props.isComplete&& <TouchableOpacity style={styles.button} onPress={()=>{closeAlert()}}>
                <View style={styles.send}>
                  <Icon name="cancel" size={50} color="#000000" />
                  <Text style={styles.sendTenxt}>나가기</Text>
                </View>
              </TouchableOpacity>}
              </View>
            </View>
            <View style={styles.contentcontainer}>
              <TextInput
                style={styles.content}
                editable={!props.isComplete}
                placeholder={!props.isComplete?"신고자에게 전달할 내용을 적어주세요":"신고자 알림이 없습니다."}
                onChangeText={(text) => setContent(text)}
                value={content}
                ref={(input) => (contentInput = input)}
                returnKeyType="done"
                multiline={true}
                // numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </SafeAreaView>
        </ScrollView>
    //   {/* </KeyboardAvoidingView> */}
    );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height:"90%",
    backgroundColor:loafer
  },
  send: {
    // marginLeft: 40,
    marginRight: 5,
    alignItems: "center",
  },
  send2: {
    marginLeft: 10,
    alignItems: "center",
  },
  sendTenxt: {
    fontSize: 12,
    fontFamily:"suiteM"
  },
  title:{
    width:"100%",
    height:60,
    alignItems:"center",
    // borderWidth:1,
    marginVertical:10,
    //backgroundColor:"blue",
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:10
},
  titletext: {
    fontSize: 27,
    // fontWeight: "bold",
    margin: 10,
    fontFamily:"suiteB"
  },
  inputContainer: {
    width: "90%",
    padding: 10,
    height: 60,
    backgroundColor: "powderblue",
    borderRadius: 10,
    marginLeft: 16,
    marginTop: 20,
  },
  input: {
    fontSize: 27,
    fontWeight: "bold",
  },
  title2: {
    width: "91%",
    padding: 10,
    height: 130,
    backgroundColor: "powderblue",
    borderRadius: 10,
    marginLeft: 16,
    marginTop: 5,
  },
  titletext2: {
    fontSize: 27,
    fontWeight: "bold",
  },
  contentcontainer: {
    width:"91%",
    height:300,
    flex:1,
    // backgroundColor: "gray",
    borderWidth:2,
    borderColor:darkCello,
    borderRadius:10,
    marginLeft:17,
    marginTop:30,
    justifyContent:"flex-start"
  },
  content: {
    height: "100%",
    fontSize: 17,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 5,
    padding: 10,
    color: "black",
    fontFamily:"suiteM"
  },
  alertText: {
    width: 250,
    height: 100,
    elevation: 2,
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

Comment2.defaultProps={
    isComplete:false
}