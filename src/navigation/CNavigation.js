//스택 관리 나 네비게이션 총 관리
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef } from "@react-navigation/native";
import {Managing} from "./screens/Managing";
import {Min1} from "./screens/Min1";
import {Mainscreen} from "./screens/Mainscreen";
import {Settings} from "./screens/Settings";
import {Home} from "./screens/Home";
import {Complete} from "./screens/Complete";
import {Login} from "./screens/Login";
import Login2 from "./screens/Login2";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const navigationRef = createNavigationContainerRef();

//bottom tabs
const BottomTabs = () => {
  return (
    //<NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Mainscreen"
          component={Mainscreen}
          options={{
            title: "메인",
            tabBarIcon: ({ color, size }) => (<Icon name="Home" color={color} size={size} />)
          }} />
        <Tab.Screen name="Settings"
          component={Settings}
          options={{
            title: "설정",
            tabBarIcon: ({ color, size }) => (<Icon name="Settings" color={color} size={size} />)
          }} />
      </Tab.Navigator>
    //</NavigationContainer>
  );
};
//김재진 상병님 렛츠고
//<NavigationContainer>은 파일에서 한번만 작성 되어야함



// 확장용<Tab.Screen name = "main" component={} options={{tabBarLabel:"홈"}}/>

//stacks
export const CNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }}>
          
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Login2" component={Login2}/>
        
        <Stack.Screen name="BottomTabs" component={BottomTabs} />

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Min1" component={Min1} />
        <Stack.Screen name="Managing" component={Managing} />
        <Stack.Screen name="Complete" component={Complete} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}; //initialRouteName="Login" 처음 어디를 열어 주는지

/*
<Stack.Screen name="mainscreen" component={mainscreen} />
        <Stack.Screen name="settings" component={settings} />*/

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
