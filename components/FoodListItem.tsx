import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, View } from "react-native";

const FooodListItem= ({item})=>{
    return (
        <View style={{backgroundColor:'gainsboro' ,
            padding :10,
            borderRadius:5 , 
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems: 'center',
    
            }}>
                <View style={{
                flex:1 ,
                gap:5 , 
    }}>
                    <Text style={{fontWeight:'bold', fontSize:16}}>{item.label}</Text>
                    <Text style={{color:'dimgray' }}>{item.cal} Cal , {item.brand}</Text>
                </View>
                <AntDesign name="plus" size={24} color="royalblue" />
            </View>
    )
};
export default FooodListItem;