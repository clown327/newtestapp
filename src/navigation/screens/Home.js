//민원 목록을 보여주는 페이지 입니다.
import {Text, View, StyleSheet, SafeAreaView, button} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Home = (navigation) => {
    
    return(
        <SafeAreaView>
            <View style={styles.container}>
                <Text>
                  민원 목록들을 보여주는 페이지 입니다.
              </Text>
              <TouchableOpacity style={styles.button} onPress = {()=> props.navigation.navigate("Min1")} >
                    <Text style={styles.buttonText} >민원이 뜨는 버튼 입니다.</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create ({
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "powderblue",
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
    },
    button: {
        backgroundColor: "orange",
        borderRadius: 10,
        width: 300,
        height: 50,
        alignItems: "center",
        justifyContent: "center",

        marginTop: 20,
    },
    buttonText : {
        fontSize: 20,
        color: "black",
    },
});