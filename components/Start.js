import { Text, View, StyleSheet, Image,TextInput,TouchableOpacity } from 'react-native';
import {useState} from 'react'
export default function Start({navigation}) {
  const [text, setText] = useState('');
  
  return (
    <View style={styles.container}>
      <View style={{flex:1,justifyContent:'space-around',alignItems:'center'}}>
        <Image source={require('../assets/Image.png')}/>
        <Text style={{fontWeight:700,fontSize:24,color:'#8353E2'}}>MANAGE YOUR TASK</Text>
      </View>
      <View style={{flex:1,justifyContent:'space-around',alignItems:'center'}}>
        <View style={{flexDirection:'row',borderWidth:1,height:43,alignItems:'center',padding:10,borderRadius:12,width:250}}>
          <Image source={require('../assets/mail.png')}/>
          <TextInput placeholder={'ENTER YOUR NAME'} style={{padding:10}} value={text} onChangeText={(text)=>{setText(text)}}/>
        </View>
        <TouchableOpacity style={{backgroundColor:'#00bdd6',width:190,height:44,borderRadius:12,alignItems:'center',justifyContent:'center'}}
        onPress={() => {
		navigation.navigate("Home",{userName:text});
	}}
        >
          <Text style={{color:'#ffffff', fontSize:16,fontWeight:500}}>GET STARTED -></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});