import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar, TextInput, Button, Text, Image, View} from 'react-native';
import colors from '../colors/colors';
import { AuthService } from '../services/auth-service'

let errorMessage = '';

export default function Login({ navigation }) {
    const [email, onEmailChange] = React.useState('');
    const [password, onPasswordChange] = React.useState('');
    
    AsyncStorage.getItem('token').then((token: string | null) => {
        if (token)
        {
            navigation.navigate('Overview');
        }
    });
    

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo} 
          source={require('../assets/icon.png')}/>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => onEmailChange(text)}
            value={email}
            placeholder='Email'
            />
    
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={text => onPasswordChange(text)}
            value={password}
            placeholder="Password"/>
          <View style={styles.button}>
            <Button 
              onPress={async () => login(email, password, navigation)}
              title="Login"
              color={colors.highlight}/>
          </View>

          <Text style={styles.err}>{errorMessage}</Text>
        </View>
      </SafeAreaView>
    );
  };

async function login(email: string, password: string, navigation: any) {
    try {
        const result = await AuthService.Login(email , password);
        if (result) {
            navigation.navigate('Overview')
        } else {

        }
    } catch (err) {
        errorMessage = 'Bad Username or Password. Try Again';
        console.error(err);
    }
}
  

  const styles = StyleSheet.create({
    logo: {
      width: 200,
      height: 200,
      marginHorizontal: 'auto',
      marginTop: '20%'
    },
    button: {
      marginVertical: 10,
      marginHorizontal: '20%',
    },
    container: { 
      flex: 1,
      backgroundColor: '#1B1D26',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    input: {
      height: 40,
      width: '80%',
      marginHorizontal: 'auto',
      marginTop: 10,
      marginBottom: 5,
      paddingLeft: 15,
      borderRadius: 20,
      backgroundColor: colors.inputBackground,
      color: colors.font,
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 'auto',
      marginHorizontal: 'auto',
    },
    err: {
        color: 'red',
    }
  });
  