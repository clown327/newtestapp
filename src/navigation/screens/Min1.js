//접수된 민원을 보여주는 곳입니다.
//민원의 상태 변경이 안됨;;
import React from "react";
import {ScrollView, Text, View, StyleSheet, SafeAreaView, TouchableOpacity,
        useWindowDimensions, Linking} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { database } from "../../../firebase";
import { ref, update, child } from "firebase/database";
import { closeAlert, showAlert } from "react-native-customisable-alert";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DropDownCard } from "../../../CustomButtons/DropDownCard";
import { Comment } from "../../contents/Comment";
import { Comment2 } from "../../contents/Comment2";
import { MyCheckbox } from "../../../CustomButtons/MyCheckBox";
import { buttonGreen, conColor, darkCello, darkGreen, darkLoafer, loafer, mainColor, matrix, shadowGreen, subColor1, subColor3 } from "../../../color";
import { disabled } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";
import roka from "../../../assets/rokalogo.png";
import { useContext } from "react";
import { Context } from "../../../Context";
import { PopUpCard } from "../../../CustomButtons/PopUpCard";
import { LinearGradient } from "expo-linear-gradient";

export const Min1 = (props) => {
  const report = props.route.params.report;
  const initSharedList=report.shareList;
  const {width,height}=useWindowDimensions()
  // console.log(report) //mainscreen에서 주는 reports의 배열 값
  const [userName,setUserName]=useContext(Context);

  const images = JSON.parse(report.photo)
    .slice(0, 4)
    .map((uri) => ({ uri }));


  let isCompleted = report.state === "처리완료";
  let isProcessing = report.state === "처리중";
  let isReceived = report.state === "미접수";
  let isSharedView = props.route.params.isShared;
  if(isSharedView){
    isProcessing=false;
    isReceived=false;
    isCompleted=true;
  }
    // const isDoing = report.state === '접수';

  const updateSharedList=async (adminCode,bool)=>{
    const sharedList=JSON.parse(report.shareList);
    const dbRef = ref(database);
    const reportsRef = child(dbRef, `reports/${report.uid}`);
    if(sharedList.includes(adminCode)){
        if(!bool){
            sharedList.splice(sharedList.findIndex(v=>v===adminCode),1)
        }   
    }else{
        if(bool){
            sharedList.push(adminCode);
        }
    }
    const newSharedList=JSON.stringify(sharedList);
    await update(reportsRef, { shareList: newSharedList });
    report.shareList=newSharedList;
  }

  const updateReportState = async (report, newState) => {
    const dbRef = ref(database);
    const reportsRef = child(dbRef, `reports/${report.uid}`);
    await update(reportsRef, { state: newState });
    //지금 가지고 있는 오브젝트도 locally update; 위험한 practice이지만 일단 그냥 해버리기

    // report.state=newState;
    // 필요가 없구만
  };

  const handleReceive1 = async (report, nextState) => {
    await updateReportState(report, nextState);
    // console.log("okay");
    // props.navigation.navigate()
    // props.navigation.navigate("Complete");
  };

  const handleReceive2 = async (report, nextState) => {
    await updateReportState(report, nextState);
    props.navigation.navigate("Comment", { report: report });
  };

  const handleReceive3 = async (report, nextState) => {
    await updateReportState(report, nextState);
    // console.log("okay");
    // props.navigation.navigate()
    props.navigation.navigate("Mainscreen");
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
            colors={["rgba(40, 93, 104,0.7)", darkCello]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            locations={[0.3, 1.2]}
            style={{
              position: "absolute",
              flex: 1,
              width: "100%",
              height: "120%",
              // opacity:0.9
            }}
          ></LinearGradient>
      <View style={styles.container2}>
        <View>
          <View style={styles.title}>
            <Text style={{...styles.titletext,color:buttonGreen}}>
              {report.type} 
            </Text>
            <Text style={{...styles.titletext,color:shadowGreen,fontSize:18,fontFamily:"suiteL"}} >({report.state})</Text>
          </View>
            <View style={{height:365,width:"95%",marginLeft:10,alignItems:"center", borderBottomColor:loafer,}}>
              <View style={styles.photocontainer}>
              {images.length > 0 ? (
                <SliderBox images={images} style={styles.photo} />):(
                  <SliderBox images={[roka]} style={styles.photo} />
                )
              }
              </View>
            </View>

        <View style={{backgroundColor:loafer, width:"95%",alignSelf:"center",borderTopRightRadius:50,borderTopLeftRadius:50}}>
        <LinearGradient
         colors={[darkLoafer, "rgba(255, 255, 255, 1)"]}
         start={{ x: 0.5, y: 1 }}
         end={{ x: 0.5, y: 0 }}
         locations={[0, 1]}
      style={{ position:"absolute",flex:1,width:"100%",height:"100%",opacity:0.95,borderTopRightRadius:50,borderTopLeftRadius:50}}
    ></LinearGradient>
          <View style={styles.detail}>
              <Text style={styles.positext}>{report.position}</Text>
              <Text style={styles.pnumtext}>{report.pnumber}</Text>
  
              <Text style={{fontFamily:"suiteB",fontSize:18, color:buttonGreen}}>신고내용</Text>
            <Text style={styles.detailtext}>{report.detail}</Text>
            <View style={{ backgroundColor: darkLoafer, padding:10, borderRadius:10,borderWidth:2,borderColor:darkCello,elevation:2 }}>
              <Text style={{...styles.titletext,color:darkCello}}>공유 부대 목록</Text>

              <View style={{ flexDirection: "row", alignItems: "center",justifyContent:"space-around", marginBottom:10}}>
                <MyCheckbox
                  disabled={userName==="0"}
                  checkFunction={(checkState) => {
                    updateSharedList("0",checkState);
                    console.log(checkState);
                  }}
                  initCheck={initSharedList.includes("0")}
                />
                <Text>지상작전사령부</Text>
                <MyCheckbox
                disabled={userName==="1"}
                  checkFunction={(checkState) => {
                    updateSharedList("1",checkState)
                  }}
                  initCheck={initSharedList.includes("1")}
                />
                <Text>수도군단</Text>
                <MyCheckbox
               
                disabled={userName==="2"}
                  checkFunction={(checkState) => {
                    updateSharedList("2",checkState)
                  }}
                  initCheck={initSharedList.includes("2")}
                />
                <Text>51사단</Text>
              </View>
            
            <View style={{ flexDirection: "row",  alignItems: "center",justifyContent:"space-around" }}>
              <MyCheckbox
              disabled={userName==="3"}
                checkFunction={(checkState) => {
                    updateSharedList("3",checkState)
                }}
                initCheck={initSharedList.includes("3")}
              />
              <Text>167 여단</Text>
              <MyCheckbox
              disabled={userName==="4"}
              
                checkFunction={(checkState) => {
                    updateSharedList("4",checkState)
                }}
                initCheck={initSharedList.includes("4")}
              />
              <Text>168 여단</Text>
              <MyCheckbox
               disabled={userName==="5"}
                checkFunction={(checkState) => {
                    updateSharedList("5",checkState)
                }}
                initCheck={initSharedList.includes("5")}
              />
              <Text>168-2대대</Text>
            </View>
            </View>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-around",width:"95%",alignSelf:"center"}}>
                     <TouchableOpacity
              style={{...styles.combutton,width:"40%", alignSelf:"center"}}
              onPress={() => {
                Linking.openURL(`tel:${report.pnumber}`)
              }}
            >
              <Text style={{...styles.comtext, fontSize:15}}>신고자에게 전화하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={{...styles.combutton,width:"40%", alignSelf:"center"}}
              onPress={() => props.navigation.navigate("Daegong")}
            >
              <Text style={{...styles.comtext, fontSize:15}}>대공혐의점</Text>
          </TouchableOpacity>
          </View>
 

          {isReceived && (
            <TouchableOpacity
              style={{...styles.combutton, width:"85%",alignSelf:'center',backgroundColor:subColor1}}
              onPress={() => {
                handleReceive1(report, "처리중");
                props.navigation.navigate("Mainscreen");
                showAlert({
                  dismissable: true,
                  alertType: "custom",
                  customAlert: (
                    <View
                      style={{
                        backgroundColor: "white",
                        width: "80%",
                        borderRadius: 12,
                        height: 350,
                        padding: 30,
                      }}
                    >
                      <View style={styles.comcontainer2}>
                        <Text style={{...styles.comtext2,fontFamily:"suiteB"}}>접수되었습니다!</Text>
                      </View>
                          <View style={styles.photocontainer2}>
                              <Icon name="done" size={170} color={buttonGreen} />
                      </View>
                     
                      <View style={styles.buttoncontainer2}>
                        <TouchableOpacity
                          style={{...styles.button2, backgroundColor:darkGreen}}
                          onPress={() => {
                            closeAlert();
                          }}
                        >
                          <Text style={styles.buttontext2}>돌아가기!</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ),
                });
              }}
            >
              <Text style={{...styles.comtext,fontFamily:"armyBold"}}>접수하기</Text>
            </TouchableOpacity>
          )}

          {/* {isProcessing && (
            <TouchableOpacity
              style={styles.combutton}
              onPress={() =>
                props.navigation.navigate("Comment", { report: report })
              }
            >
              <Text style={styles.comtext}>조치사항 작성</Text>
            </TouchableOpacity>
          )} */}
          {isProcessing && (
            <PopUpCard
              buttonWidth={width * 0.85}
              buttonHeight={65}
              title={"조치사항 작성"}
              description={"신고 내용에 대한 조치사항 및 사진을 올려주세요!"}
            >
              <Comment report={report} />
            </PopUpCard>
          )}
          {isProcessing && (
            <PopUpCard
              buttonWidth={width * 0.85}
              buttonHeight={65}
              title={"신고자 알림 작성"}
              description={"신고자에게 전달하고 싶은 사항을 작성해주세요"}
            >
              <Comment2 report={report} />
            </PopUpCard>
          )}
          {/* {isProcessing && (
            <TouchableOpacity
              style={styles.combutton}
              onPress={() =>
                props.navigation.navigate("Comment", { report: report })
              }
            >
              <Text style={styles.comtext}>신고자 알림 작성</Text>
            </TouchableOpacity>
          )} */}
          {isProcessing && (
            <TouchableOpacity
              style={{...styles.combutton,alignSelf:"center",width:"80%",backgroundColor:subColor1}}
              onPress={() => {
                handleReceive1(report, "처리완료");
                props.navigation.navigate("Mainscreen");
              }}
            >
              <Text style={styles.comtext}>처리 완료하기</Text>
            </TouchableOpacity>
          )}
          {isCompleted && (
            <Comment report={report} isComplete={true}/>
          )}
          {isCompleted && (
            <Comment2 report={report} isComplete={true}/>
          )}
          {(report.state === "처리완료") && ( //처리완료된 민원을 다시 미접수로 만들어주는 부분 
            <TouchableOpacity
              style={{...styles.combutton2}}
              disabled={true}
            >
              <Text style={styles.comtext}>처리 완료되었습니다</Text>
            </TouchableOpacity>
          )}
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
  positext:{
    fontSize:23,
    fontFamily:"suiteB",
    marginTop:10,
    color:"black",
    textAlign:"center"

  },
  pnumtext:{
    color:subColor3,
    fontFamily:"suiteL",
    textAlign:"right"
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
    borderBottomColor:loafer,
  },
  titletext: {
    fontSize: 25,
    fontFamily:"suiteB",
    color:loafer
  },
  photocontainer: {
    width: 300,
    height: 300,
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
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  detail: {
    width: "82%",
    //backgroundColor:"yellow",
    marginLeft: 34,
    marginBottom: 14,
  },
  detailtext: {
    fontSize: 17,
    marginTop: 5,
    marginBottom:15,
    fontFamily:"suiteL",
    color:"black",
    borderWidth:1,
    borderColor:darkCello,
    borderRadius:5,
    padding:10
  },
  combutton: {
    width: "35%",
    height: 65,
    backgroundColor:darkGreen,
    marginVertical: 20,
    // marginLeft: 26,
  
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  combutton2: {
    width: "87%",
    height: 65,
    backgroundColor: "#BAD5FD",
    marginTop: 10,
    marginLeft: 26,
    marginRight: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  comtext: {
    fontSize: 20,
    // fontWeight: "bold",
    color: "white",
    fontFamily:"suiteB"
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
    fontSize:20,
    // fontWeight:"bold",
    fontFamily:"suiteB"
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