import React, {useState,useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,Easing
} from 'react-native';
import {useSession} from '../context/SessionProvider';
import Navbar from './Navbar';
import LinearGradient from 'react-native-linear-gradient';
import EyeImage from '../assets/licenseEye.png';
import {SelectList} from 'react-native-dropdown-select-list';

const PatientInfo = ({navigation}) => {
  const {
    setCataractSurgery,
    cataractSurgery,
    setSurgeryEye,
    otherComplaints,
    setOtherComplaints,
    diabetes,
    setDiabetes,
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
    bloodPressure,
    setBloodPressure
  } = useSession();

  const [tempBloodGroup, setTempBloodGroup] = useState('');
  const [tempRhFactor, setTempRhFactor] = useState('');
  const regScale = useRef(new Animated.Value(1)).current;
  const nameScale = useRef(new Animated.Value(1)).current;
  const ageScale = useRef(new Animated.Value(1)).current;
  const genderScale = useRef(new Animated.Value(1)).current;
  const occupationScale = useRef(new Animated.Value(1)).current;
  const mobileScale = useRef(new Animated.Value(1)).current;
  const emailScale = useRef(new Animated.Value(1)).current;
  const bloodPressureScale = useRef(new Animated.Value(1)).current;
  const diabetesScale = useRef(new Animated.Value(1)).current;
  const complaintsScale = useRef(new Animated.Value(1)).current;
  const genderOptions = [
    {key: '1', value: 'Male'},
    {key: '2', value: 'Female'},
    {key: '3', value: 'Others'},
  ];
  const diabetesOptions = [
    {key: '1', value: 'Yes'},
    {key: '2', value: 'No'},
  ];

  const radioButtons = [
    {id: '1', label: 'Left Eye', value: 'Left Eye'},
    {id: '2', label: 'Right Eye', value: 'Right Eye'},
    {id: '3', label: 'Both Eyes', value: 'Both Eyes'},
    {id: '4', label: 'None', value: 'No Surgery Done'},
  ];

  const bloodGroups = [
    {id: '1', label: 'A', value: 'A'},
    {id: '2', label: 'B', value: 'B'},
    {id: '3', label: 'AB', value: 'AB'},
    {id: '4', label: 'O', value: 'O'},
  ];

  const rhFactors = [
    {id: '1', label: '-', value: '-'},
    {id: '2', label: '+', value: '+'},
  ];

  const handleSubmit = () => {
    const currBloodGroup = bloodGroups[tempBloodGroup - 1]?.value || '';
    const currRhGroup = rhFactors[tempRhFactor - 1]?.value || '';
    setBloodGroup(currBloodGroup + currRhGroup);
    setSurgeryEye(radioButtons[cataractSurgery - 1].value);
    navigation.navigate('VisionChartResults');
  };

  const handleFocus = (scale) => {
    Animated.timing(scale, {
      toValue: 1.05,
      duration: 60, // Adjust duration as needed
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };
  
  const handleBlur = (scale) => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 200, // Adjust duration as needed
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleDropdownToggle = (isVisible) => {
    if (isVisible) {
      handleFocus(genderScale);
    } else {
      handleBlur(genderScale);
    }
  };
  
  return (
    <>
      <Navbar>
        <Text style={styles.navbarTitle}>Patient Form</Text>
      </Navbar>
      <ScrollView>
        <LinearGradient
          style={styles.container}
          colors={['#3EA6D7', '#30A1D2', '#80BDD4']}>
          <Image source={EyeImage} style={styles.logo} />
          <Text style={styles.heading}>Basic Patient Information</Text>

          <Animated.View style={[styles.inputContainer, { transform: [{ scale: regScale }] }]}>
            <Text style={styles.label}>Registration No:</Text>
            <TextInput
              style={styles.input}
              value={regNo}
              onChangeText={setRegNo}
              onFocus={() => handleFocus(regScale)}
          onBlur={() => handleBlur(regScale)}
              placeholder="Enter Registration Number"
              selectionColor={'black'}
              placeholderTextColor="#8F8F8F"
            />
          </Animated.View>

          <Animated.View style={[styles.inputContainer, { transform: [{ scale: nameScale }] }]}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              onFocus={() => handleFocus(nameScale)}
          onBlur={() => handleBlur(nameScale)}
              placeholder="Enter Full Name"
              selectionColor={'black'}
              placeholderTextColor="#8F8F8F"
              autoCapitalize="words"
            />
          </Animated.View>

          <Animated.View style={[styles.inputContainer, { transform: [{ scale: ageScale }] }]}>
            <Text style={styles.label}>Age:</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              onFocus={() => handleFocus(ageScale)}
              onBlur={() => handleBlur(ageScale)}
              keyboardType="numeric"
              placeholder="Enter Age"
              selectionColor={'black'}
              placeholderTextColor="#8F8F8F"
            />
          </Animated.View>

          <Animated.View  style={[styles.inputContainer, { transform: [{ scale: genderScale }] }]}>
            <Text style={styles.label}>Gender:</Text>

            <SelectList
              setSelected={val => setGender(val)}
              data={genderOptions}
              save="value"
              search={false}
              boxStyles={styles.box} 
              dropdownStyles={styles.dropdown} 
              inputStyles={
                !gender ? styles.optionInput : styles.optionPressedInput
                } 
                dropdownItemStyles={styles.item} 
                dropdownTextStyles={styles.itemText} 
                placeholder="Choose"
                />
          </Animated.View>

          <Animated.View style={[styles.inputContainer, { transform: [{ scale: occupationScale }] }]}>
            <Text style={styles.label}>Occupation:</Text>
            <TextInput
              style={styles.input}
              value={occupation}
              onChangeText={setOccupation}
              onFocus={() => handleFocus(occupationScale)}
          onBlur={() => handleBlur(occupationScale)}
              placeholder="Enter Occupation"
              selectionColor={'black'}
              placeholderTextColor="#8F8F8F"
            />
          </Animated.View>

          <Animated.View style={[styles.inputContainer, { transform: [{ scale: mobileScale }] }]}>
            <Text style={styles.label}>Mobile Number:</Text>
            <TextInput
              style={styles.input}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              onFocus={() => handleFocus(mobileScale)}
          onBlur={() => handleBlur(mobileScale)}
              keyboardType="phone-pad"
              placeholder="Enter Mobile Number"
              selectionColor={'black'}
              placeholderTextColor="#8F8F8F"
            />
          </Animated.View>

          <Animated.View style={[styles.inputContainer, { transform: [{ scale: emailScale }] }]}>
            <Text style={styles.label}>Email ID:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              onFocus={() => handleFocus(emailScale)}
          onBlur={() => handleBlur(emailScale)}
              keyboardType="email-address"
              placeholder="Enter Email Address"
              selectionColor={'black'}
              placeholderTextColor="#8F8F8F"
              autoCapitalize="none"
            />
          </Animated.View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Blood Group:</Text>
            <View style={styles.buttonRow}>
              {bloodGroups.map(element => (
                <TouchableOpacity
                  key={element.id}
                  style={
                    tempBloodGroup === element.id
                      ? styles.bloodBtnPressed
                      : styles.bloodBtn
                  }
                  onPress={() => setTempBloodGroup(element.id)}>
                  <Text
                    style={
                      tempBloodGroup === element.id
                        ? styles.bloodBtnTextPressed
                        : styles.bloodBtnText
                    }>
                    {element.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>Rh Factor:</Text>
            <View style={styles.buttonRow}>
              {rhFactors.map(element => (
                <TouchableOpacity
                  key={element.id}
                  style={
                    tempRhFactor === element.id
                      ? styles.bloodBtnPressed
                      : styles.bloodBtn
                  }
                  onPress={() => setTempRhFactor(element.id)}>
                  <Text
                    style={
                      tempRhFactor === element.id
                        ? styles.bloodBtnTextPressed
                        : styles.bloodBtnText
                    }>
                    {element.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Animated.View style={[styles.inputContainer, { transform: [{ scale: nameScale }] }]}>
            <Text style={styles.label}>Diabetes:</Text>
            <SelectList
              setSelected={val => setDiabetes(val)}
              data={diabetesOptions}
              save="value"
              search={false}
              boxStyles={styles.box} 
              dropdownStyles={styles.dropdown} 
              inputStyles={
                !diabetes ? styles.optionInput : styles.optionPressedInput
              } 
              dropdownItemStyles={styles.item} 
              dropdownTextStyles={styles.itemText} 
              placeholder="Choose"
            />
          </Animated.View>

          <Animated.View style={[styles.inputContainer, { transform: [{ scale: bloodPressureScale }] }]}>
            <Text style={styles.label}>Blood Pressure:</Text>
            <TextInput
              style={styles.input}
              value={bloodPressure}
              onChangeText={setBloodPressure}
              onFocus={() => handleFocus(bloodPressureScale)}
          onBlur={() => handleBlur(bloodPressureScale)}
              keyboardType="number-pad"
              placeholder="Enter Blood Pressure"
              selectionColor={'black'}
              placeholderTextColor="#8F8F8F"
              autoCapitalize="none"
            />
          </Animated.View>

          <Text style={styles.heading}>Vision Information</Text>

          <Animated.View style={[styles.inputContainer, { transform: [{ scale: complaintsScale }] }]}>
            <Text style={styles.label}>Other Complaints:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={otherComplaints}
              onChangeText={setOtherComplaints}
              onFocus={() => handleFocus(complaintsScale)}
          onBlur={() => handleBlur(complaintsScale)}
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
                {radioButtons.slice(0, 2).map(element => (
                  <TouchableOpacity
                    key={element.id}
                    style={
                      cataractSurgery === element.id
                        ? styles.cataractBtnPressed
                        : styles.cataractBtn
                    }
                    onPress={() => setCataractSurgery(element.id)}>
                    <Text
                      style={
                        cataractSurgery === element.id
                          ? styles.cataractBtnTextPressed
                          : styles.cataractBtnText
                      }>
                      {element.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.buttonRow}>
                {radioButtons.slice(2, 4).map(element => (
                  <TouchableOpacity
                    key={element.id}
                    style={
                      cataractSurgery === element.id
                        ? styles.cataractBtnPressed
                        : styles.cataractBtn
                    }
                    onPress={() => setCataractSurgery(element.id)}>
                    <Text
                      style={
                        cataractSurgery === element.id
                          ? styles.cataractBtnTextPressed
                          : styles.cataractBtnText
                      }>
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
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    transform: [{scale: 1}],
    transition: 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
  },
  focusedInputContainer: {
    transform: [{scale: 1.05}],
  },
  label: {
    marginBottom: 5,
    color: '#134687',
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBCED5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
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
    shadowOffset: {width: 0, height: 2},
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
    shadowOffset: {width: 0, height: 2},
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
    paddingVertical: 4,
    paddingHorizontal: 18,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bloodBtnText: {
    color: '#134687',
    textAlign: 'center',
    fontWeight: '600',
  },
  bloodBtnPressed: {
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 18,
    backgroundColor: '#134687',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
    shadowOffset: {width: 0, height: 2},
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
    shadowOffset: {width: 0, height: 2},
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
  box: {
    borderWidth: 1,
    borderColor: '#CBCED5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  optionInput: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8F8F8F',
  },
  optionPressedInput: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000', 
    shadowOffset: {width: 0, height: 2}, 
    shadowOpacity: 0.2, 
    shadowRadius: 2, 
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '600',
  },
});

export default PatientInfo;
