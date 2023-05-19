//스택 관리 나 네비게이션 총 관리
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef } from "@react-navigation/native";
import Managing from "./screens/Managing";
import Min1 from "./screens/Min1";
import Mainscreen from "./screens/Mainscreen";
import Settings from "./screens/Settings";
import Home from "./screens/Home";
import Complete from "./screens/Complete";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const navigationRef = createNavigationContainerRef();

function MainScreen() { 
  return (
    <View style={{
       flex: 1, 
       justifyContent: 'center',
       alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button 
      title="새 민원 확인" 
      onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

//bottom tabs
 const BottomTabs = () => {
  return (
    <NavigationContainer>
    <Tab.Navigator       
    initialRouteName="Mainscreen"
    screenOptions={({ route }) => ({ 
    tabBarIcon:({focused,color,size})})}>
      <Tab.Screen name="Mainscreen"
        component={Mainscreen}
        options={{
          title: "메인",
          tabBarIcon: ({ color, size }) => (<Icon name="Home" color={color} size={size} /> )}} /> 
        <Tab.Screen name="Settings"
          component={Settings}
          options={{
            title: "설정",
            tabBarIcon: ({ color, size }) => (<Icon name="Settings" color={color} size={size} />)}} />
    </Tab.Navigator>
    </NavigationContainer>
  );
};





// 확장용<Tab.Screen name = "main" component={} options={{tabBarLabel:"홈"}}/>

//stacks
export function CNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Min1" component={Min1} />
        <Stack.Screen name="Managing" component={Managing} />
        <Stack.Screen name="Complete" component={Complete} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
/*
<Stack.Screen name="mainscreen" component={mainscreen} />
        <Stack.Screen name="settings" component={settings} />*/

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};