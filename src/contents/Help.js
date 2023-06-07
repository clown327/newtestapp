//민원을 관리할 수 있는 화면 입니다 stack
import {Text, View, SafeAreaView, StyleSheet} from 'react-native'

export const Help = (props) => {
    
    return(
    <SafeAreaView style={{width:'100%', height:'100%', backgroundColor:"#fff"}}>

        <View style={{alignItems:'center',margin:10,marginTop:50}}>
            <Text style={{fontSize:50, fontWeight:"bold"}}>ARA</Text>
        </View>

        <View style={{width:"100%", height:500, alignItems:'center',marginTop:30}}>
            <View style={{width:'95%',}}>
                <Text style={{fontSize:20, fontWeight:'600'}}>
                본 어플리케이션은 군사적 위협으로부터 주민들을 보호하기 위해 육군에서 개발한 긴급 신고 어플리케이션입니다.
                </Text>
                <Text></Text>
                <Text style={{fontSize:20, fontWeight:'600'}}>
                    수상한 물체, 간첩 등이 발견될 시 본 앱을 통해 신고해주시면 육군에서 신속하게 조치하겠습니다.
                </Text>
                <Text></Text>
                <Text style={{fontSize:20, fontWeight:'600'}}>
                    국민의 안전과 국가 안보를 위해 힘쓰는 더 강한, 더 좋은 육군이 되겠습니다.
                </Text>

            </View>

        </View>
    </SafeAreaView>
    );
}
