import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const  Search = (props) => {
    const [phoneNumber, setPhoneNumber] = useState('');



    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>
                    검색
                </Text>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    icons={<Icon name="search" color={"#222A5A"} size={10} />}
                    placeholder="전화번호를 입력하세요"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        width:"100%",
        height:"100%",
    },
    title:{
        width:"100%",
        height:40,
        fontSize:35,
        fontWeight:"900",
        marginLeft:15,
        marginTop:20,
        marginBottom:7,

    },
    input: {
        borderRadius: 10,
        padding: 14,
        marginVertical: 10,
        backgroundColor:"#D9D9D9",
        margin:20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin:10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});