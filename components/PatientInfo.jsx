import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {useSession} from '../context/SessionProvider';
import Navbar from './Navbar';
import LinearGradient from 'react-native-linear-gradient';
import EyeImage from '../assets/licenseEye.png';

const PatientInfo = ({navigation}) => {
  const {
    setCataractSurgery,
    cataractSurgery,
    setSurgeryEye,
    otherComplaints,
    setOtherComplaints,
    diabetes,
    setDiabetes,
    bloodGroup,
    setBloodGroup,
    email,
    setEmail,
    regNo,
    setRegNo,
    name,
    setName,
    age,
    setAge,
    gender,
    setGender,
    occupation,
    setOccupation,
    mobileNumber,
    setMobileNumber,
    surgeryEye
  } = useSession();

  const [tempBloodGroup,setTempBloodGroup] = useState('');
  const [tempRhFactor,setTempRhFactor] = useState('');

  const radioButtons = [
      {id: '1',label: 'Left Eye',value: 'Left Eye',},
      {id: '2',label: 'Right Eye',value: 'Right Eye',},
      {id: '3',label: 'Both Eyes',value: 'Both Eyes',},
      {id: '4',label: 'None',value: 'No Surgery Done',},
    ]
  const bloodGroups = [
      {id: '1',label: 'A',value: 'A',},
      {id: '2',label: 'B',value: 'B',},
      {id: '3',label: 'AB',value: 'AB',},
      {id: '4',label: 'O',value: 'O',},
    ]
  const rhFactors = [
      {id: '1',label: '-',value: '-',},
      {id: '2',label: '+',value: '+',},
    ]

  const handleSubmit = () => {
    const currBloodGroup = bloodGroups[tempBloodGroup-1]?.value||'';
    const currRhGroup = rhFactors[tempRhFactor-1]?.value||'';
    setBloodGroup(currBloodGroup+currRhGroup)
    setSurgeryEye(radioButtons[cataractSurgery - 1].value);
    console.log(bloodGroup);
    navigation.navigate('VisionChartResults');
  };

  return (
    <>
      <Navbar />
        <ScrollView>
      <LinearGradient style={styles.container} colors={['#3EA6D7', '#30A1D2', '#80BDD4']}>
        <Image source={EyeImage} style={styles.logo} />
          <Text style={styles.heading}>Basic Patient Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Registration No:</Text>
            <TextInput
              style={styles.input}
              value={regNo}
              onChangeText={setRegNo}
              placeholder="Enter Registration Number"
              placeholderTextColor="#8F8F8F"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter Full Name"
              placeholderTextColor="#8F8F8F"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age:</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              placeholder="Enter Age"
              placeholderTextColor="#8F8F8F"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender:</Text>
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={setGender}
              placeholder="Choose"
              placeholderTextColor="#8F8F8F"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Occupation:</Text>
            <TextInput
              style={styles.input}
              value={occupation}
              onChangeText={setOccupation}
              placeholder="Enter Occupation"
              placeholderTextColor="#8F8F8F"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number:</Text>
            <TextInput
              style={styles.input}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              placeholder="Enter Mobile Number"
              placeholderTextColor="#8F8F8F"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email ID:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Enter Email Address"
              placeholderTextColor="#8F8F8F"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Blood Group:</Text>
            <View style={styles.buttonRow}>
              {bloodGroups.map((element)=>(
                <TouchableOpacity key={element.id} style={tempBloodGroup===element.id?styles.bloodBtnPressed:styles.bloodBtn} onPress={() => setTempBloodGroup(element.id)}>
                <Text style={tempBloodGroup===element.id?styles.bloodBtnTextPressed:styles.bloodBtnText}>{element.label}</Text>
              </TouchableOpacity>
              ))}    
            </View>
            <Text style={styles.label}>Rh Factor:</Text>
            <View style={styles.buttonRow}>
              {rhFactors.map((element)=>(
                <TouchableOpacity key={element.id} style={tempRhFactor===element.id?styles.bloodBtnPressed:styles.bloodBtn} onPress={() => setTempRhFactor(element.id)}>
                <Text style={tempRhFactor===element.id?styles.bloodBtnTextPressed:styles.bloodBtnText}>{element.label}</Text>
              </TouchableOpacity>
              ))}    
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Diabetes:</Text>
            <TextInput
              style={styles.input}
              value={diabetes}
              onChangeText={setDiabetes}
              placeholder="Choose Yes or No"
              placeholderTextColor="#8F8F8F"
            />
          </View>

          <Text style={styles.heading}>Vision Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Other Complaints:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={otherComplaints}
              onChangeText={setOtherComplaints}
              placeholder="Describe any other complaints"
              placeholderTextColor="#8F8F8F"
              multiline
              numberOfLines={1}
            />
          </View>

          <View style={styles.inputContainer}>
          <Text style={styles.label}>Cataract Surgery Done:</Text>
          <View>
            <View style={styles.buttonRow}>
              {radioButtons.slice(0, 2).map((element)=>(
                <TouchableOpacity key={element.id} style={cataractSurgery===element.id?styles.cataractBtnPressed:styles.cataractBtn} onPress={() => setCataractSurgery(element.id)}>
                <Text style={cataractSurgery===element.id?styles.cataractBtnTextPressed:styles.cataractBtnText}>{element.label}</Text>
              </TouchableOpacity>
              ))}    
            </View>
            <View style={styles.buttonRow}>
              {radioButtons.slice(2, 4).map((element)=>(
                <TouchableOpacity key={element.id} style={cataractSurgery===element.id?styles.cataractBtnPressed:styles.cataractBtn} onPress={() => setCataractSurgery(element.id)}>
                <Text style={cataractSurgery===element.id?styles.cataractBtnTextPressed:styles.cataractBtnText}>{element.label}</Text>
              </TouchableOpacity>
              ))}    
            </View>
            
          </View>
        </View>


          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
      </LinearGradient>
        </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 20,
    flexGrow: 1,
  },
  logo: {
    width: 270,
    height: 270,
    position: 'absolute',
    right: 75,
    top: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#b2dfdb',
  },
  label: {
    marginBottom: 5,
    color: '#134687',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b2dfdb',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#000000',
  },
  textArea: {
    textAlignVertical: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '90%',
    alignSelf: "center",
    marginVertical: 20,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  cataractBtn: {
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: '28%',
 },
 cataractBtnText:{
  color:"#134687",
  textAlign:"center",
  fontWeight:"600"
 },
  cataractBtnPressed: {
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#134687',
    width: '28%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
 },
 cataractBtnTextPressed:{
  color:"#ffffff",
  textAlign:"center",
  fontWeight:"600"
 },
  bloodBtn: {
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    // width: '28%',
 },
 bloodBtnText:{
  color:"#134687",
  textAlign:"center",
  fontWeight:"600"
 },
 bloodBtnPressed: {
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 15,
    backgroundColor: '#134687',
    // width: '28%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
 },
 bloodBtnTextPressed:{
  color:"#ffffff",
  textAlign:"center",
  fontWeight:"600"
 },
});


export default PatientInfo;
