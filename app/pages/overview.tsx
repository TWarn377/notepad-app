import React from 'react';
import Notes from '../components/notes';
import AddNote from '../components/addNote';
import { SafeAreaView, StyleSheet, Platform, StatusBar, View, Image, Button } from 'react-native';
import colors from '../colors/colors';
import { AuthService } from '../services/auth-service';


export default function Overview ({ navigation }) {
  const logout = async () => {
    await AuthService.Logout();
    navigation.navigate('Login');
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require('../assets/icon.png')}/>
          <Button
            color={colors.highlight}
            onPress={async () => await logout()}
            title="Logout"/>
        </View>
        <Notes></Notes>
        <AddNote></AddNote>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#1B1D26',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '5%',
    width: '100%',
    paddingHorizontal: '5%' 
  },
  logo: {
    width: 40,
    height: 40,
    marginVertical: 'auto'
  },
  notes: {
    overflow: 'scroll'
  }
});