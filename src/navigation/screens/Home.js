//민원을 누르면 나오는 페이지 stack
import {Text, View, Button,StyleSheet} from 'react-native'

export default function Home (props) {
    return (
        <View style={{
           flex: 1, 
           justifyContent: 'center',
           alignItems: 'center' }}>
            
          <Text>후후 여기까지 오셨군요 </Text>
          <Button 
          title="새 민원 확인" 
          onPress={() =>{props.navigation.navigate("Min1")}} />
        </View>
      )
}



const style = StyleSheet.create({

    
});