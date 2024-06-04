import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSession} from '../context/SessionProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EyeImage from '../assets/licenseEye.png';
import BackArrow from '../assets/backArrow.png';
import LinearGradient from 'react-native-linear-gradient';

function License({navigation, route}) {
  const {setCategory, setEntries} = useSession();
  const [licenseNumber, setLicenseNumber] = useState(null);
  const [userLicenseNumber, setUserLicenseNumber] = useState('');
  const licenseNumbers = ['1234', '2345', '3456', '4567'];
  const entryList = [50, 100, 500, 1000];
  const cat = route.params?.category;

  useEffect(() => {
    setLicenseNumber(licenseNumbers[cat - 1]);
  }, [cat]);

  const handleSubmit = async () => {
    if (licenseNumber === userLicenseNumber) {
      await AsyncStorage.setItem('category', JSON.stringify(cat));
      await AsyncStorage.setItem('entries', JSON.stringify(entryList[cat - 1]));
      setCategory(cat);
      setEntries(entryList[cat - 1]);
      navigation.navigate('PatientInfo');
    } else {
      Alert.alert(
        'Invalid License',
        'The license number you entered is incorrect.',
      );
    }
  };

  return (
    <>
      <LinearGradient colors={['#0E93D2', '#A0CDDE']} style={styles.container}>
        <Image source={EyeImage} style={styles.logo} />
        <Text style={styles.title}>Enter License Number</Text>
        <TextInput
          style={styles.input}
          placeholder="License Number"
          placeholderTextColor={'#D4D4D4'}
          onChangeText={text => setUserLicenseNumber(text)}
          value={userLicenseNumber}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </LinearGradient>
      <TouchableOpacity style={styles.arrowBox} onPress={() => navigation.goBack()}>
        <View style={styles.arrowCircle}>
          <Image source={BackArrow} style={styles.arrowImage} />
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    height: 600,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  arrowBox: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  arrowCircle: {
    backgroundColor: '#3EA6D7',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowImage: {
    width: 40,
    height: 40,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
    position: 'absolute',
    right: -60,
    top: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 21,
    alignItems: 'center',
    width: '60%',
    marginBottom: 110,
  },
  buttonText: {
    color: '#033D83',
    fontSize: 20,
    fontWeight: '400',
  },
});

export default License;
