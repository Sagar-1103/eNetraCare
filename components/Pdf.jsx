import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert, Image } from 'react-native';
import RNPrint from 'react-native-print';
import RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSession } from '../context/SessionProvider';
import Logo from "../assets/Innovease_Logo.jpg"

const Pdf = ({ route, navigation }) => {
  const { filePath, tempName } = route.params;
  const {surgeryEye, setSurgeryEye,reducedVisionEye, setReducedVisionEye,reducedVision, setReducedVision,cataractSurgery, setCataractSurgery,otherComplaints, setOtherComplaints,reducedVisionBoth, setReducedVisionBoth,reducedVisionLeft, setReducedVisionLeft,reducedVisionRight, setReducedVisionRight,diabetes, setDiabetes,bloodGroup, setBloodGroup,email, setEmail,category, setCategory, entries, setEntries,regNo, setRegNo,name, setName,age, setAge,gender, setGender,occupation, setOccupation,mobileNumber, setMobileNumber } = useSession();

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

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.headerText}>Patient Document Management</Text>
      <TouchableOpacity style={styles.button} onPress={downloadPdf}>
        <Text style={styles.buttonText}>Download PDF</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={printPdf}>
        <Text style={styles.buttonText}>Print PDF</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleEntry}>
        <Text style={styles.buttonText}>New Entry</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b', // Dark teal color
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00796b', // Dark teal color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: 200,
  },
  buttonText: {
    color: '#fff', // Button text color
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Pdf;
