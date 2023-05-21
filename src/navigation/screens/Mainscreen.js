//새로 만들어진 민원들을 보여주는 페이지 입니다.
import {SafeAreaView ,Text, View, ScrollView, StyleSheet, TouchableOpacity, Button} from 'react-native'

<<<<<<< HEAD
export const Mainscreen = (props) => {
 return(
    <SafeAreaView style={styles.scrollcontainer} >
        <ScrollView >      
            <View style={styles.container}>
            <TouchableOpacity style={styles.buttoncontainer} onPress={() => props.navigation.navigate("Min1")}>
                    <Text style = {styles.buttontext}>
                        이곳에는 민원의 내용과 사진이 들어갈 곳입니다.
                        아직 테스트하고 있습니다
                    </Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.buttoncontainer} onPress={() => props.navigation.navigate("Min1")}>
                    <Text style = {styles.buttontext}>
                        이곳에는 민원의 내용과 사진이 들어갈 곳입니다.
                        아직 테스트하고 있습니다
                    </Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.buttoncontainer} onPress={() => props.navigation.navigate("Min1")}>
                    <Text style = {styles.buttontext}>
                        이곳에는 민원의 내용과 사진이 들어갈 곳입니다.
                        아직 테스트하고 있습니다
                    </Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.buttoncontainer} onPress={() => props.navigation.navigate("Min1")}>
                    <Text style = {styles.buttontext}>
                        이곳에는 민원의 내용과 사진이 들어갈 곳입니다.
                        아직 테스트하고 있습니다
                    </Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.buttoncontainer} onPress={() => props.navigation.navigate("Min1")}>
                    <Text style = {styles.buttontext}>
                        이곳에는 민원의 내용과 사진이 들어갈 곳입니다.
                        아직 테스트하고 있습니다
                    </Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.buttoncontainer} onPress={() => props.navigation.navigate("Min1")}>
                    <Text style = {styles.buttontext}>
                        이곳에는 민원의 내용과 사진이 들어갈 곳입니다.
                        아직 테스트하고 있습니다
                    </Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.buttoncontainer} onPress={() => props.navigation.navigate("Min1")}>
                    <Text style = {styles.buttontext}>
                        이곳에는 민원의 내용과 사진이 들어갈 곳입니다.
                        아직 테스트하고 있습니다
                    </Text>
               </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollcontainer: {
        backgroundColor:"white",

    },  
    container: {
        flex:1,
        width: "100%",
        height: "100%",
        bakcgroundColor: "blue",
        //alignItems: "center", // y축
    },
    
    buttoncontainer: {
        width:"95.1%" ,
        height: 160,
        //borderColor:"yellow",
        borderRadius:12 ,
        backgroundColor: "powderblue", //버튼 컨테이너 색
        margin: 10,
        margin: 10,
        marginBottom:25,
        marginLeft:10,
        marginRight:10,
        justifyContent: "center", //x축
    },
    buttontext: {
        textAlign:"flex-start",
        marginTop: 10,
        marginLeft: 150,
        marginRight: 10,
        color:"#000000",
    },
});
=======
export const Mainscreen = (navigation) => {
    return(
    <SafeAreaView>
    <ScrollView>      
        <View>
            <Text>saljdjwo</Text>

        </View>
        
    </ScrollView>
     </SafeAreaView>
    );
}
>>>>>>> 57cfa764bd114b255e753ab025595a09256f9d26
