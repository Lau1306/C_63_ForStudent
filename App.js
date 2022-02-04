import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import {Header} from 'react-native-elements';
import { SafeAreaProvider  } from 'react-native-safe-area-context';
import db from './localdb';
import PhonicSoundButton from './PhonicSoundButton';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      text: "", 
      chunks: [],
      phonicSounds: [],
    }
  }

  render() {
    return (
      <SafeAreaProvider >
      <View style={styles.container}>
        <Header backgroundColor = {'#5499C7'} centerComponent ={{
          text: 'Mono Fragmentado', style:{color:'#F2F3F4', fontSize: 20},
        }} />
        <Image style={styles.imageIcon} source={{uri:'https://cdn-icons-png.flaticon.com/512/949/949561.png'}} />
        <TextInput onChangeText = {text => {
          this.setState({text: text}); 
        }}
        value = {this.state.text} style = {styles.inputBox} />
        <TouchableOpacity style = {styles.goButton} 
        onPress = {()=>{
          this.setState({chunks: db[this.state.text].chunks}),
          this.setState({ phonicSounds: db[this.state.text].phones })
          }}>
          <Text style={styles.buttonText}> Go </Text>
        </TouchableOpacity>
        <View>
          {
            this.state.chunks.map((item, index) =>{
              return( 
                <PhonicSoundButton 
                  wordChunk = {this.state.chunks[index]}
                  soundChunk = {this.state.phonicSounds[index]}
                />) 
            })
          }
        </View>
      </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  }, 
  inputBox : {
    marginTop:200,
    width:'80%',
    alignSelf:"center",
    height:40,
    textAlign:"center",
    borderWidth:4
  },
  goButton:{
    width:'50%',
    height:55,
    alignSelf:"center",
    padding:10,
    margin:10
  },
  buttonText:{
    textAlign:"center",
    fontSize:30,
    fontWeight:"bold"
  },
  displayText:{
    textAlign:"center",
    fontSize:30
  },
  imageIcon:{
    width:150,
    height:150,
    marginLeft: 150
  },
  chunkButton:{
    width:'60%',
    height:50,
    justifyContent: "center",
    alignItems:"center",
    alignSelf:"center",
    borderRadius:10,
    margin:5,
    backgroundColor:"red"
  }
});

