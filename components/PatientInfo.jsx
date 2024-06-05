import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useSession } from '../context/SessionProvider';
import Navbar from './Navbar';
import LinearGradient from 'react-native-linear-gradient';
import EyeImage from '../assets/licenseEye.png';

const PatientInfo = ({ navigation }) => {
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
  } = useSession();

  const [tempBloodGroup, setTempBloodGroup] = useState('');
  const [tempRhFactor, setTempRhFactor] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const radioButtons = [
    { id: '1', label: 'Left Eye', value: 'Left Eye' },
    { id: '2', label: 'Right Eye', value: 'Right Eye' },
    { id: '3', label: 'Both Eyes', value: 'Both Eyes' },
    { id: '4', label: 'None', value: 'No Surgery Done' },
  ];

  const bloodGroups = [
    { id: '1', label: 'A', value: 'A' },
    { id: '2', label: 'B', value: 'B' },
    { id: '3', label: 'AB', value: 'AB' },
    { id: '4', label: 'O', value: 'O' },
  ];

  const rhFactors = [
    { id: '1', label: '-', value: '-' },
    { id: '2', label: '+', value: '+' },
  ];

  const handleSubmit = () => {
    const currBloodGroup = bloodGroups[tempBloodGroup - 1]?.value || '';
    const currRhGroup = rhFactors[tempRhFactor - 1]?.value || '';
    setBloodGroup(currBloodGroup + currRhGroup);
    setSurgeryEye(radioButtons[cataractSurgery - 1].value);
    console.log(bloodGroup);
    navigation.navigate('VisionChartResults');
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <>
      <Navbar>
      <Text style={styles.navbarTitle}>Patient Form</Text>
      </Navbar>
      <ScrollView>
        <LinearGradient
          style={styles.container}
          colors={['#3EA6D7', '#30A1D2', '#80BDD4']}
        >
          <Image source={EyeImage} style={styles.logo} />
          <Text style={styles.heading}>Basic Patient Information</Text>

          <Animated.View
            style={[
              styles.inputContainer,
              focusedField === 'regNo' && styles.focusedInputContainer,
            ]}
          >
            <Text style={styles.label}>Registration No:</Text>
            <TextInput
              style={styles.input}
              value={regNo}
              onChangeText={setRegNo}
              onFocus={() => handleFocus('regNo')}
              onBlur={handleBlur}
              placeholder="Enter Registration Number"
              selectionColor={'black'}
              placeholderTextColor="#8F8F8F"
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.inputContainer,
              focusedField === 'name' && styles.focusedInputContainer,
            ]}
          >
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              onFocus={() => handleFocus('name')}
              onBlur={handleBlur}
              placeholder="Enter Full Name"
              selectionColor={'black'}
              placeholderTextColor="#8F8F8F"
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.inputContainer,
              focusedField === 'age' && styles.focusedInputContainer,
            ]}
          >
            <Text style={styles.label}>Age:</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              onFocus={() => handleFocus('age')}
              onBlur={handleBlur}
              keyboardType="numeric"
              placeholder="Enter Age"
              selectionColor={'black'}
              placeholderTextColor="#8F8F8F"
            />
          </Animated.View>

          <Animated.View style={[
              styles.inputContainer,
              focusedField === 'gender' && styles.focusedInputContainer,
            ]}>
            <Text style={styles.label}>Gender:</Text>
            <TextInput
              style={styles.input}
              value={gender}
              onFocus={() => handleFocus('gender')}
              onBlur={handleBlur}
              onChangeText={setGender}
              placeholder="Choose"
              selectionColor={'black'}
              placeholderTextColor="#8F8F8F"
            />
          </Animated.View>


          {/* <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender:</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={gender === 'Male' ? styles.genderBtnPressed : styles.genderBtn}
                onPress={() => setGender('Male')}
              >
                <Text style={gender === 'Male' ? styles.genderBtnTextPressed : styles.genderBtnText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={gender === 'Female' ? styles.genderBtnPressed : styles.genderBtn}
                onPress={() => setGender('Female')}
              >
                <Text style={gender === 'Female' ? styles.genderBtnTextPressed : styles.genderBtnText}>Female</Text>
              </TouchableOpacity>
            </View>
          </View> */}

          <Animated.View
            style={[
              styles.inputContainer,
              focusedField === 'occupation' && styles.focusedInputContainer,
            ]}
          >
            <Text style={styles.label}>Occupation:</Text>
            <TextInput
              style={styles.input}
              value={occupation}
              onChangeText={setOccupation}
              onFocus={() => handleFocus('occupation')}
              onBlur={handleBlur}
              placeholder="Enter Occupation"
              selectionColor={'black'}
              placeholderTextColor="#8F8F8F"
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.inputContainer,
              focusedField === 'mobileNumber' && styles.focusedInputContainer,
            ]}
          >
            <Text style={styles.label}>Mobile Number:</Text>
            <TextInput
              style={styles.input}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              onFocus={() => handleFocus('mobileNumber')}
              onBlur={handleBlur}
              keyboardType="phone-pad"
              placeholder="Enter Mobile Number"
              selectionColor={'black'}
              placeholderTextColor="#8F8F8F"
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.inputContainer,
              focusedField === 'email' && styles.focusedInputContainer,
            ]}
          >
            <Text style={styles.label}>Email ID:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              keyboardType="email-address"
              placeholder="Enter Email Address"
              selectionColor={'black'}
              placeholderTextColor="#8F8F8F"
            />
          </Animated.View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Blood Group:</Text>
            <View style={styles.buttonRow}>
              {bloodGroups.map((element) => (
                <TouchableOpacity
                  key={element.id}
                  style={tempBloodGroup === element.id ? styles.bloodBtnPressed : styles.bloodBtn}
                  onPress={() => setTempBloodGroup(element.id)}
                >
                  <Text style={tempBloodGroup === element.id ? styles.bloodBtnTextPressed : styles.bloodBtnText}>
                    {element.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>Rh Factor:</Text>
            <View style={styles.buttonRow}>
              {rhFactors.map((element) => (
                <TouchableOpacity
                  key={element.id}
                  style={tempRhFactor === element.id ? styles.bloodBtnPressed : styles.bloodBtn}
                  onPress={() => setTempRhFactor(element.id)}
                >
                  <Text style={tempRhFactor === element.id ? styles.bloodBtnTextPressed : styles.bloodBtnText}>
                    {element.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Animated.View
            style={[
              styles.inputContainer,
              focusedField === 'diabetes' && styles.focusedInputContainer,
            ]}
          >
            <Text style={styles.label}>Diabetes:</Text>
            <TextInput
              style={styles.input}
              value={diabetes}
              onChangeText={setDiabetes}
              onFocus={() => handleFocus('diabetes')}
              onBlur={handleBlur}
              placeholder="Choose Yes or No"
              placeholderTextColor="#8F8F8F"
              selectionColor={'black'}
            />
          </Animated.View>

          <Text style={styles.heading}>Vision Information</Text>

          <Animated.View
            style={[
              styles.inputContainer,
              focusedField === 'otherComplaints' && styles.focusedInputContainer,
            ]}
          >
            <Text style={styles.label}>Other Complaints:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={otherComplaints}
              onChangeText={setOtherComplaints}
              onFocus={() => handleFocus('otherComplaints')}
              onBlur={handleBlur}
              placeholder="Describe any other complaints"
              placeholderTextColor="#8F8F8F"
              multiline
              selectionColor={'black'}
              numberOfLines={1}
            />
          </Animated.View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cataract Surgery Done:</Text>
            <View>
              <View style={styles.buttonRow}>
                {radioButtons.slice(0, 2).map((element) => (
                  <TouchableOpacity
                    key={element.id}
                    style={cataractSurgery === element.id ? styles.cataractBtnPressed : styles.cataractBtn}
                    onPress={() => setCataractSurgery(element.id)}
                  >
                    <Text style={cataractSurgery === element.id ? styles.cataractBtnTextPressed : styles.cataractBtnText}>
                      {element.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.buttonRow}>
                {radioButtons.slice(2, 4).map((element) => (
                  <TouchableOpacity
                    key={element.id}
                    style={cataractSurgery === element.id ? styles.cataractBtnPressed : styles.cataractBtn}
                    onPress={() => setCataractSurgery(element.id)}
                  >
                    <Text style={cataractSurgery === element.id ? styles.cataractBtnTextPressed : styles.cataractBtnText}>
                      {element.label}
                    </Text>
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
    paddingTop: 110,
    paddingBottom: 20,
    flexGrow: 1,
  },
  logo: {
    width: 270,
    height: 270,
    position: 'absolute',
    right: 47,
    top: 30,
  },
  heading: {
    fontSize: 26,
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
    transform: [{ scale: 1 }],
    transition: 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
  },
  focusedInputContainer: {
    transform: [{ scale: 1.05 }],
  },
  label: {
    marginBottom: 5,
    color: '#134687',
    fontWeight: '600',
    fontSize:16
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBCED5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    fontSize: 15,
    fontWeight:"500",
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
    alignSelf: 'center',
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
    minWidth: 90,
  },
  cataractBtnText: {
    color: '#134687',
    textAlign: 'center',
    fontWeight: '600',
  },
  cataractBtnPressed: {
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#134687',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minWidth: 90,
  },
  cataractBtnTextPressed: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
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
  bloodBtnText: {
    color: '#134687',
    textAlign: 'center',
    fontWeight: '600',
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
  bloodBtnTextPressed: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
  genderBtn: {
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minWidth: 90,
  },
  genderBtnText: {
    color: '#134687',
    textAlign: 'center',
    fontWeight: '600',
  },
  genderBtnPressed: {
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#134687',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minWidth: 90,
  },
  genderBtnTextPressed: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
  navbarTitle: {
    color: '#134687',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 30,
  },
});

export default PatientInfo;
