//민원을 관리할 수 있는 화면 입니다 stack
import {Text, View, SafeAreaView} from 'react-native'

export const Daegong = (props) => {
    
    return(
    <SafeAreaView>

        <View style={{justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}}>
            <Text style={{fontFamily:"suiteB",fontSize:17,textAlign:"center"}}>
                {"대공혐의점 체크리스트 페이지입니다.\n 보안상의 이유로 미구현 되어있습니다."}
            </Text>
        </View>
    </SafeAreaView>
    );
}
