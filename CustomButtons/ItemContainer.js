import {View,Image,Text,StyleSheet} from 'react-native';
import { buttonGreen, darkCello, darkLoafer, loafer, mainColor } from '../color';
import roka from "../assets/rokalogo.png";
export const ItemContainer=(props)=>{
    const report=props.report;
    return(
        <View style={styles.item}>
                <View style={styles.photocon}>
                {JSON.parse(report.photo).length > 0 ? (
                          <Image
                            source={{ uri: JSON.parse(report.photo)[0] }}
                            style={{
                              borderRadius: 30,
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        ) : (
                          <Image
                            source={roka}
                            style={{
                              borderRadius: 30,
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        )}
                </View>
                <View style={{ alignItems: "center" }}>
                <Text
                    style={{
                      color: buttonGreen,
                      marginTop: 5,
                      fontSize: 15,
                      fontWeight: "800",
                    }}
                  >
                    {report.type}
                  </Text>
                  <Text
                    style={{
                      color:darkCello,
                      marginTop: 10,
                      fontSize: 15,
                      fontWeight: "800",
                    }}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                  >
                    {report.position}
                  </Text>
                 
                </View>
              </View>
    )
}

const styles=StyleSheet.create({
    item:{
        width:160,
        height:240,
        backgroundColor:darkLoafer,
        //justifyContent:"center",
        alignItems:"center",
        marginLeft:10,
        borderRadius:15,
        marginBottom:10,
        paddingHorizontal:10
    },
    photocon:{
        margin:5,
        marginTop:20,
        width:135,
        height:120,
        borderRadius:30,
        justifyContent:"center",

    },
})