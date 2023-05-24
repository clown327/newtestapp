import React, { useState } from 'react';
import { SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, 
        KeyboardAvoidingView, Platform, Button, Image, RefreshControl, TextInput } from 'react-native';
import { database } from "../../firebase";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ref, set, update, child } from 'firebase/database';


export const Comment = (props) => {

    const report = props.route.params.report;
    
    const [content, setContent] = useState(report.processText);

    const updateReportProcess = async (report, newText) => { //과정 업데이트 해주는거
        const dbRef = ref(database);
        const reportsRef = child(dbRef, `reports/${report.uid}`);
        await update(reportsRef, { processText: newText });
    };
    const handleSave = async () => {
        await updateReportProcess(report, content);
        props.navigation;
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

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={50}>
                <ScrollView
                    style={styles.container}
                    keyboardShouldPersistTaps='handled'>
                    <SafeAreaView>
                        <View style={styles.title}>
                            <Text style={styles.titletext}>처리된 내용</Text>


                            <TouchableOpacity style={styles.button} onPress={handleSave}>
                                <View style={styles.send}>
                                    <Icon name="save" size={50} color="#000000" />
                                    <Text style={styles.sendTenxt}>저장하기</Text>
                                </View>
                            </TouchableOpacity>                            

                            <TouchableOpacity style={styles.button} onPress={()=>{handlePost(report,"처리완료")}}>
                                <View style={styles.send2}>
                                    <Icon name="done" size={50} color="#000000" />
                                    <Text style={styles.sendTenxt}>끝내기</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.title2}>
                            {/*이곳에는 사진을 넣을겁니다. */}
                        </View>
                        <View style={styles.contentcontainer}>
                            <TextInput
                                style={styles.content}
                                placeholder="조치된 내용을 입력해 주세요"
                                onChangeText={text => setContent(text)}
                                value={content}
                                ref={input => contentInput = input}
                                returnKeyType="done"
                                multiline={true}
                                numberOfLines={4}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        backgroundColor:"white"
    },
    send:{
        marginLeft: 75,
        marginRight:5,
        alignItems:"center",
    },
    send2:{
        marginLeft:10,
        alignItems:"center",
    },
    sendTenxt:{
        fontSize:12,
        fontWeight:"bold",
    },
    title:{
        width:"100%",
        height:60,
        margin:13,
        //backgroundColor:"blue",
        flexDirection:"row"
    },
    titletext:{
        fontSize:27,
        fontWeight:"bold",
        margin:10,
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
        height:130,
        backgroundColor:"powderblue",
        borderRadius:10,
        marginLeft:16,
        marginTop: 5,
    },
    titletext2:{
        fontSize:27,
        fontWeight:"bold",
    },
    contentcontainer:{
        width:"91%",
        height:"100%",
        flex:1,
        backgroundColor:"#D9D9D9",
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
    }
});