import React, { useState } from 'react';
import { StyleSheet,TouchableOpacity,View, Text, Alert, Image } from 'react-native';
import RNPrint from 'react-native-print';
import RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSession } from '../context/SessionProvider';
import Logo from '../assets/enetracareLogo.png';
import LinearGradient from 'react-native-linear-gradient';
import Navbar from './Navbar';

const Pdf = ({ route, navigation }) => {
  const { filePath, tempName } = route.params;
  const { surgeryEye, setSurgeryEye, reducedVisionEye, setReducedVisionEye, reducedVision, setReducedVision, cataractSurgery, setCataractSurgery, otherComplaints, setOtherComplaints, reducedVisionBoth, setReducedVisionBoth, reducedVisionLeft, setReducedVisionLeft, reducedVisionRight, setReducedVisionRight, diabetes, setDiabetes, bloodGroup, setBloodGroup, email, setEmail, category, setCategory, entries, setEntries, regNo, setRegNo, name, setName, age, setAge, gender, setGender, occupation, setOccupation, mobileNumber, setMobileNumber } = useSession();
  const [clickedButton,setClickedButton] = useState(null);

  const functionIsInvoked = (id,func) => {
    setClickedButton(id);
    setTimeout(async() => {
      // console.log(func);
      await func();
      setClickedButton(null);
    }, 500);
  };

  const printPdf = async () => {
    await RNPrint.print({ filePath: filePath });
  };

  const downloadPdf = async () => {
    try {
      const id = uuid.v4().slice(0, 2);
      const destinationPath = `${RNFS.DownloadDirectoryPath}/${tempName}-${id}.pdf`;
      await RNFS.copyFile(filePath, destinationPath);
      console.log(filePath);
      Alert.alert('Download Successful', `PDF downloaded to downloads folder.`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      Alert.alert('Download Failed', 'An error occurred while downloading the PDF');
    }
  };

  const handleEntry = async () => {
    if (entries < 1) {
      await AsyncStorage.clear();
      setCategory(null);
      setEntries(null);
      navigation.navigate("Home");
      return;
    }
    navigation.navigate("PatientInfo");
    setRegNo('');
    setName('');
    setAge('');
    setGender('');
    setOccupation('');
    setMobileNumber('');
    setEmail('');
    setBloodGroup('');
    setDiabetes('');
    setOtherComplaints('');
    setCataractSurgery('4');
    setReducedVision(false);
    setReducedVisionEye('');
    setSurgeryEye('');
  };

  const buttons = [
    {id:1, title: 'Download PDF', onPress: () => functionIsInvoked(1,downloadPdf) },
    {id:2, title: 'Print PDF', onPress: () => functionIsInvoked(2,printPdf) },
    {id:3, title: 'New Entry', onPress: () => functionIsInvoked(3,handleEntry) },
  ];

  return (
    <>
      <Navbar>
        <Text style={styles.navbarTitle}>Patient Form</Text>
      </Navbar>
      <LinearGradient colors={['#A0CDDE', '#7DBDD4', '#3EA6D7']} style={styles.container}>
        <View style={styles.imageCover} >
        <Image source={Logo} style={styles.logo} />
        </View>
        {buttons.map((button) => (
          <TouchableOpacity key={button.id} style={clickedButton===button.id?styles.buttonPressed:styles.button} onPress={button.onPress}>
            <Text style={clickedButton===button.id?styles.buttonPressedText:styles.buttonText}>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa', // Light blue background color for a hospital theme
  },
  logo: {
    marginBottom: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b', // Dark teal color
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#134687',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPressed: {
    backgroundColor: '#134687',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonPressedText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbarTitle: {
    color: '#134687',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 30,
  },
  imageCover:{
    backgroundColor:"#ffffff",
    padding:10,
    borderRadius:20,
    marginBottom:30
  }
});

export default Pdf;
