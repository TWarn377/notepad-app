import React from 'react';
import { StyleSheet,  TextInput, View} from 'react-native';

const NoteInput = (placeholderValue: string, height?: string, width?: string) => {
    const [value, onChangeText] = React.useState(placeholderValue);

    const inputStyles = StyleSheet.create ({
        input: {
            height:  height? height: 30,
            width: width? width: '90%',
            margin: '5%',
            padding: 0,
            borderRadius: 10,
        }
    });

    return (
      <TextInput 
        style={inputStyles.input} 
        onChangeText={text => onChangeText(text)}
        value={value}/>
    );

    
}

export default NoteInput;