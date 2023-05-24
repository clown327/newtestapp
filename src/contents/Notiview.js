//공지를 보여주는 화면입니다.
import {Text, View, SafeAreaView, StyleSheet, ScrollView} from 'react-native'

export const Notiview = (props) => {
    


    const notice = props.route.params.notice;
    
    return(
    <ScrollView
         style={styles.container}
         keyboardShouldPersistTaps='handled'>
         <SafeAreaView>
             <View style={styles.title}>
                 <Text style={styles.titletext}>공지사항</Text>
             </View>
             <View style={styles.title2}>
                <Text style={styles.titletext2}>{notice.title}</Text>
             </View>
             <View style={styles.contentcontainer}>
                <Text style={styles.content}>{notice.content}</Text>
             </View>
         </SafeAreaView>
     </ScrollView>
    );
}


const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        backgroundColor:"white"
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
        height:65,
        backgroundColor:"powderblue",
        borderRadius:10,
        marginLeft:16,
        marginTop: 20,
        
    },
    titletext2:{
        fontSize:27,
        margin:5,
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