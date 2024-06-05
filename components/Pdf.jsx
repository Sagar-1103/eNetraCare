import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  Alert,
  Image,
} from 'react-native';
import RNPrint from 'react-native-print';
import RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSession} from '../context/SessionProvider';
import Logo from '../assets/enetracareLogo.png';
import LinearGradient from 'react-native-linear-gradient';
import Navbar from './Navbar';

const Pdf = ({route, navigation}) => {
  const {filePath, tempName} = route.params;
  const {
    setSurgeryEye,
    setReducedVisionEye,
    setOphthalmologist,
    setReducedVision,
    setCataractSurgery,
    setOtherComplaints,
    setDiabetes,
    setBloodGroup,
    setEmail,
    setCategory,
    entries,
    setEntries,
    setRegNo,
    setName,
    setAge,
    setGender,
    setOccupation,
    setMobileNumber,
  } = useSession();
  const [clickedButton, setClickedButton] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const functionIsInvoked = async (id, func) => {
    setClickedButton(id);
    await func();
    setClickedButton(null);
  };

  const printPdf = async () => {
    await RNPrint.print({filePath: filePath});
  };

  const downloadPdf = async () => {
    try {
      const id = uuid.v4().slice(0, 2);
      const destinationPath = `${RNFS.DownloadDirectoryPath}/${tempName}-${id}.pdf`;
      await RNFS.copyFile(filePath, destinationPath);
      setModalVisible(true);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      Alert.alert(
        'Download Failed',
        'An error occurred while downloading the PDF',
      );
    }
  };

  const handleEntry = async () => {
    if (entries < 1) {
      await AsyncStorage.clear();
      setCategory(null);
      setEntries(null);
      navigation.navigate('Home');
      return;
    }
    navigation.navigate('PatientInfo');
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
    setOphthalmologist(false);
  };

  const buttons = [
    {
      id: 1,
      title: 'Download PDF',
      onPress: () => functionIsInvoked(1, downloadPdf),
    },
    {id: 2, title: 'Print PDF', onPress: () => functionIsInvoked(2, printPdf)},
    {
      id: 3,
      title: 'New Entry',
      onPress: () => functionIsInvoked(3, handleEntry),
    },
  ];

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Download Successful</Text>
            <Text style={styles.modalDescription}>
              PDF downloaded to downloads folder.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Navbar>
        <Text style={styles.navbarTitle}>Patient Form</Text>
      </Navbar>
      <LinearGradient
        colors={['#A0CDDE', '#7DBDD4', '#3EA6D7']}
        style={styles.container}>
        <View style={styles.imageCover}>
          <Image source={Logo} style={styles.logo} />
        </View>
        {buttons.map(button => (
          <TouchableOpacity
            key={button.id}
            style={
              clickedButton === button.id ? styles.buttonPressed : styles.button
            }
            onPress={button.onPress}>
            <Text
              style={
                clickedButton === button.id
                  ? styles.buttonPressedText
                  : styles.buttonText
              }>
              {button.title}
            </Text>
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
    backgroundColor: '#e0f7fa',
  },
  logo: {
    marginBottom: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
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
    shadowOffset: {width: 0, height: 2},
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
    shadowOffset: {width: 0, height: 2},
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
  imageCover: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 20,
    marginBottom: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '900',
  },
  modalDescription: {
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    width: 250,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#134687',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Pdf;
