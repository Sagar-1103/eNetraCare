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
import LottieView from 'lottie-react-native';

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
    loading,
    setLoading,
    setBloodPressure
  } = useSession();
  const [clickedButton, setClickedButton] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: '',
    description: '',
    showBtn:false
  });

  const functionIsInvoked = async (id, func) => {
    setClickedButton(id);
    await func();
    setClickedButton(null);
  };

  const printPdf = async () => {
    try {
      await RNPrint.print({filePath: filePath});
    } catch (error) {
      console.log('Error while printing the PDF:', error);
      setModalMessage({
        title: 'Printing Failed',
        description: 'An error occurred while printing the PDF',
      });
      setModalVisible(true);
    }
  };

  const downloadPdf = async () => {
    try {
      setLoading(true);
      setModalMessage({
        title: 'Download Successful',
        description: 'PDF downloaded to downloads folder.',
      });
      setTimeout(async () => {
        const id = uuid.v4().slice(0, 2);
        const destinationPath = `${RNFS.DownloadDirectoryPath}/${tempName}-${id}.pdf`;
        await RNFS.copyFile(filePath, destinationPath);
        setLoading(false);
        setModalVisible(true);
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log('Error downloading PDF:', error);
      setModalMessage({
        title: 'Download Failed',
        description: 'An error occurred while downloading the PDF',
      });
      setModalVisible(true);
    }
  };

  const handleEntry = async () => {
    try {
      if (entries < 1) {
        setModalMessage({
          title: 'Entry Limit Exceeded',
          description: 'Login once again to make entries',
          showBtn:true
        });
        setModalVisible(true);
        // await AsyncStorage.clear();
        // setCategory(null);
        // setEntries(null);
        // navigation.navigate('Home');
        return;
      }
      console.log(entries);
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
      setBloodPressure('');
      navigation.navigate('PatientInfo');
    } catch (error) {
      console.log('Error downloading PDF:', error);
      Alert.alert('Internal Error');
    }
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

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleLimitExceeded = async () => {
    setModalVisible(false);
    await AsyncStorage.clear();
    setCategory(null);
    setEntries(null);
    navigation.navigate('Home');
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{modalMessage.title}</Text>
            <Text style={styles.modalDescription}>
              {modalMessage.description}
            </Text>
            <View
              style={styles.buttonGroup}>
              {modalMessage.showBtn && <TouchableOpacity
                style={styles.closeButton}
                onPress={handleLimitExceeded}>
                <Text style={styles.closeButtonText}>Login</Text>
              </TouchableOpacity>}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Navbar>
        <Text style={styles.navbarTitle}>Patient Document Management</Text>
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
            style={[
              clickedButton === button.id
                ? styles.buttonPressed
                : styles.button,
              loading && button.id === 1 && {backgroundColor: '#ccc'},
            ]}
            onPress={button.onPress}>
            {!(loading && button.id === 1) && (
              <Text
                style={
                  clickedButton === button.id
                    ? styles.buttonPressedText
                    : styles.buttonText
                }>
                {button.title}
              </Text>
            )}
            {loading && button.id === 1 && (
              <LottieView
                style={styles.loaderStyle}
                source={require('../animation/loader.json')}
                autoPlay
                loop
              />
            )}
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
  loaderStyle: {
    fontWeight: 'bold',
    height: 100,
    width: 100,
    marginVertical: -40,
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
  buttonGroup : {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#134687',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal:20
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Pdf;
