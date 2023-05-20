import  React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ScrollView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import button from './src/1button'; //./src/App 컴포넌트 사용
import { Button } from 'react-native-web';



function MainScreen({navigation}) {
  return (
    <View style={{
      flex : 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Button style={styles.button}
        title="필터링"
        onPress={() => navigation.navigate("Settings")}>
        </Button>

        
      <ScrollView style={styles.container} >
        <TouchableOpacity style={styles.textContainer} onPress={() => navigation.navigate("min1")}>
          <Text style={styles.textStyle}>
             이곳은 텍스트를 테스트하는 텍스트 영역입니다.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textContainer} onPress={() => navigation.navigate("Settings")}>
          <Text style={styles.textStyle}>
            텍스트 영역입니다.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textContainer} onPress={() => navigation.navigate("Settings")}>
          <Text style={styles.textStyle}>
            텍스트 영역입니다.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textContainer} onPress={() => navigation.navigate("Settings")}>
          <Text style={styles.textStyle}>
            텍스트 영역입니다.
          </Text>
        </TouchableOpacity>        
        <TouchableOpacity style={styles.textContainer} onPress={() => navigation.navigate("Settings")}>
          <Text style={styles.textStyle}>
            텍스트 영역입니다.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textContainer} onPress={() => navigation.navigate("Settings")}>
          <Text style={styles.textStyle}>
            텍스트 영역입니다.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textContainer} onPress={() => navigation.navigate("Settings")}>
          <Text style={styles.textStyle}>
            텍스트 영역입니다.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textContainer} onPress={() => navigation.navigate("Settings")}>
          <Text style={styles.textStyle}>
            텍스트 영역입니다.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>

      
  );
}

function SettingsScreen({navigation}) {  //여기가 페이지에 기능을 넣는거임
  return (
    <View style={{
       flex: 1, 
       justifyContent: 'center',
       alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button 
      title="새 민원 확인" 
      onPress={() => navigation.navigate("Main")} />
    </View>
  );
}




const Tab = createBottomTabNavigator();

export default function cu() {
  return ( 
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
        name="Main" 
        component={MainScreen} 
        options={{
          title: "메인 화면",
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
     />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: '설정',
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" color={color} size={size}  />
          )
        }}
      />
      </Tab.Navigator> 
    </NavigationContainer>
  );
}

 
const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "transparent",
  },
  textContainer: {
  height: 140,
  borderColor: "black",
  borderWidth: 1,
  borderRadius: 13,
  margin: 10,
  marginLeft:10,
  marginBottom: 15,
  backgroundcolor: "#AC91E6",
  },
  textStyle: {
  textAlign: "flex-start",
  marginTop: 10,
  marginLeft: 150,
  marginRight: 10,
  },
  button:{
    Color: "#222A55",
    
  },
  });