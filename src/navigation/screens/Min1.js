//접수된 민원을 보여주는 곳입니다.
//민원의 상태 변경이 안됨;;
import React from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  Linking
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { database } from "../../../firebase";
import { ref, update, child } from "firebase/database";
import { closeAlert, showAlert } from "react-native-customisable-alert";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DropDownCard } from "../../../CustomButtons/DropDownCard";
import { Comment } from "../../contents/Comment";
import { Comment2 } from "../../contents/Comment2";
import { MyCheckbox } from "../../../CustomButtons/MyCheckBox";


export const Min1 = (props) => {
  const report = props.route.params.report;
  const initSharedList=report.shareList;
  const {width,height}=useWindowDimensions()
  // console.log(report) //mainscreen에서 주는 reports의 배열 값
  const images = JSON.parse(report.photo)
    .slice(0, 4)
    .map((uri) => ({ uri }));

  const isCompleted = report.state === "처리완료";
  const isProcessing = report.state === "처리중";
  const isReceived = report.state === "미접수";
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
      <View style={styles.container2}>
        <View>
          <View style={styles.title}>
            <Text style={styles.titletext}>
              유형 : {report.type} ({report.state})
            </Text>
            <Text></Text>
          </View>

          <View style={styles.photocontainer}>
            <SliderBox images={images} style={styles.photo} />
          </View>

          <View style={styles.detail}>
            <Text style={styles.positext}>{report.position}</Text>
            <Text style={styles.pnumtext}>{report.pnumber}</Text>
            <Text style={styles.detailtext}>{report.detail}</Text>
            <View style={{ backgroundColor: "powderblue", padding:10, borderRadius:10 }}>
              <Text style={styles.titletext}>공유 부대 목록</Text>

              <View style={{ flexDirection: "row", alignItems: "center",justifyContent:"space-around", marginBottom:10}}>
                <MyCheckbox
                  disabled={false}
                  checkFunction={(checkState) => {
                    updateSharedList("0",checkState);
                    console.log(checkState);
                  }}
                  initCheck={initSharedList.includes("0")}
                />
                <Text>지상작전사령부</Text>
                <MyCheckbox
                disabled={false}
                  checkFunction={(checkState) => {
                    updateSharedList("1",checkState)
                  }}
                  initCheck={initSharedList.includes("1")}
                />
                <Text>수도군단</Text>
                <MyCheckbox
               
                disabled={false}
                  checkFunction={(checkState) => {
                    updateSharedList("2",checkState)
                  }}
                  initCheck={initSharedList.includes("2")}
                />
                <Text>51사단</Text>
              </View>
            
            <View style={{ flexDirection: "row",  alignItems: "center",justifyContent:"space-around" }}>
              <MyCheckbox
              disabled={true}
                checkFunction={(checkState) => {
                    updateSharedList("3",checkState)
                }}
                initCheck={initSharedList.includes("3")}
              />
              <Text>167 여단</Text>
              <MyCheckbox
              disabled={false}
              
                checkFunction={(checkState) => {
                    updateSharedList("4",checkState)
                }}
                initCheck={initSharedList.includes("4")}
              />
              <Text>168 여단</Text>
              <MyCheckbox
               disabled={false}
                checkFunction={(checkState) => {
                    updateSharedList("5",checkState)
                }}
                initCheck={initSharedList.includes("5")}
              />
              <Text>169 여단</Text>
            </View>
            </View>
          </View>
          <TouchableOpacity
              style={{...styles.combutton,width:"50%", alignSelf:"center"}}
              onPress={() => {
                Linking.openURL(`tel:${report.pnumber}`)
              }}
            >
              <Text style={{...styles.comtext, fontSize:15}}>신고자에게 전화하기</Text>
          </TouchableOpacity>
          {isReceived && (
            <TouchableOpacity
              style={styles.combutton}
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
                        <Text style={styles.comtext2}>접수되었습니다!</Text>
                      </View>
                      <View style={styles.photocontainer2}>
                        <Icon name="done" size={170} color="#222A5A" />
                      </View>
                      <View style={styles.buttoncontainer2}>
                        <TouchableOpacity
                          style={styles.button2}
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
              <Text style={styles.comtext}>접수하기!</Text>
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
            <DropDownCard
              buttonWidth={width * 0.85}
              buttonHeight={65}
              title={"조치사항 작성"}
              description={"신고 내용에 대한 조치사항 및 사진을 올려주세요!"}
            >
              <Comment report={report} />
            </DropDownCard>
          )}
          {isProcessing && (
            <DropDownCard
              buttonWidth={width * 0.85}
              buttonHeight={65}
              title={"신고자 알림 작성"}
              description={"신고자에게 전달하고 싶은 사항을 작성해주세요"}
            >
              <Comment2 report={report} />
            </DropDownCard>
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
              style={styles.combutton}
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
          {isCompleted && ( //처리완료된 민원을 다시 미접수로 만들어주는 부분 
            <TouchableOpacity
              style={{...styles.combutton}}
              disabled={false}
              onPress={() => {
                handleReceive3(report, "미접수");
              }}
            >
              <Text style={styles.comtext}>처리완료!</Text>
            </TouchableOpacity>
          )}
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
    fontSize:19,
    fontWeight:"600",

  },
  pnumtext:{
    color:"gray",
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
    width: 320,
    height: 320,
    marginTop: -10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
    flex: 1,
    alignSelf:"center",
    //backgroundColor:"black",
  },
  photo: {
    width: 320,
    height: 320,
    borderRadius: 10,
  },
  detail: {
    width: "82%",
    //backgroundColor:"yellow",
    marginLeft: 34,
    marginBottom: 14,
  },
  detailtext: {
    fontSize: 18,
    marginTop: 4,
  },
  combutton: {
    width: "87%",
    height: 65,
    backgroundColor: "#1E90FF",
    marginTop: 10,
    marginLeft: 26,
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
