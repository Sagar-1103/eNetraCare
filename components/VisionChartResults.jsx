import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  StyleSheet,
  Animated,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import EyeSection from './EyeSection';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {useSession} from '../context/SessionProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';
import NavbarBackArrow from '../assets/navbarBackArrow.png';
import LinearGradient from 'react-native-linear-gradient';

const VisionChartResults = ({navigation}) => {
  const [distantRightEyeResult, setDistantRightEyeResult] = useState('');
  const [distantleftEyeResult, setDistantLeftEyeResult] = useState('');
  const [nearRightEyeResult, setNearRightEyeResult] = useState('');
  const [nearleftEyeResult, setNearLeftEyeResult] = useState('');
  const [consent, setConsent] = useState(false);
  const [leftUri, setLeftUri] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [rightUri, setRightUri] = useState(null);
  const {
    surgeryEye,
    otherComplaints,
    diabetes,
    bloodGroup,
    email,
    category,
    setCategory,
    entries,
    setEntries,
    regNo,
    name,
    age,
    gender,
    occupation,
    mobileNumber,
    ophthalmologist,
    setOphthalmologist,
  } = useSession();

  const referOptions = [
    {id: '1', label: 'Yes', value: 'Yes'},
    {id: '2', label: 'No', value: 'No'},
  ];
  const [tempReferOption, setTempReferOption] = useState('2');

  const handleVisionSubmit = async () => {
    const pdfContent = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Eye Camp Form</title>
        <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f7f7f7; /* Light gray background */
      }
      .page {
        page-break-inside: avoid;
      }
      .page-pad {
        padding-top: 3rem;
      }
      .form-container {
        width: 80%;
        max-width: 600px;
        margin: 20px auto;
        background-color: #eaf4fc; /* Light blue background */
        border: 1px solid #b8d9ea; /* Light blue border */
        border-radius: 8px;
        padding: 40px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        animation: fadeIn 0.6s ease-in-out;
      }
      h1,
      h3 {
        text-align: center;
        color: #1f4788; /* Dark blue heading color */
      }
      h4 {
        color: #1f4788;
      }
      h2 {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #b8d9ea; /* Light blue border */
        text-align: center;
        color: #1f4788; /* Dark blue heading color */
      }
      img {
        margin: 0 auto;
        border-radius: 50%; /* Make the images round */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        max-width: 200px; /* Adjust max-width as needed */
      }
      .flex-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 10px 1rem 5px 1rem;
        width: 100%;
        align-items: center;
      }
      .form-section {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #b8d9ea; /* Light blue border */
      }
      .form-group {
        display: grid;
        grid-template-columns: 1fr 3fr; /* Adjust the column widths as needed */
        margin-bottom: 20px;
      }
      .form-group label {
        grid-column: 1 / 2;
        margin-bottom: 5px;
        font-weight: bold;
        color: #1f4788; /* Dark blue label color */
        align-self: center; /* Align label vertically centered */
      }
      .form-group input[type="text"],
      .form-group select,
      .form-group textarea {
        grid-column: 2 / 3;
        width: calc(100% - 10px);
        padding: 5px 0; /* Adjust vertical padding */
        box-sizing: border-box;
        border: none; /* Remove border */
        border-bottom: 1px solid #b8d9ea; /* Light blue underline effect */
        background: none; /* Remove background */
        transition: border-color 0.3s ease-in-out;
        align-self: center; /* Align input vertically centered */
      }
      /* Add hover effect on underline */
      .form-group input[type="text"]:hover,
      .form-group select:hover,
      .form-group textarea:hover {
        border-bottom: 1px solid #1f4788; /* Dark blue color on hover */
      }
      /* Add focus effect on underline */
      .form-group input[type="text"]:focus,
      .form-group select:focus,
      .form-group textarea:focus {
        border-bottom: 2px solid #1f4788; /* Dark blue thickness on focus */
        outline: none;
      }
      .form-group .inline {
        display: inline-block;
        margin-right: 10px;
      }
      .signature {
        text-align: right;
        margin-top: 20px;
      }
      .consent {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #777;
      }
      .signature span {
        display: inline-block;
        margin-left: 10px;
        border-bottom: 1px solid #1f4788; /* Dark blue signature color */
        padding-bottom: 3px;
      }
      .img-group {
        margin: 0 10px; /* Add margin to create space between images */
      }
      .img-group p {
        text-align: center;
        font-weight: bold;
        color: #1f4788; /* Dark blue image label color */
      }
    </style>
      </head>
      <body>
        <div class="form-container">
          <div class="page">
            <h1>Innovease India Private Limited</h1>
          <h2>Eye Camp</h2>
          <h3>Basic Patient Information</h3>
          <div class="form-section">
            <div class="form-group">
              <label>Reg. No:</label>
              <input type="text" name="regNo" value="${regNo}" readonly />
            </div>
            <div class="form-group">
              <label>Name:</label>
              <input type="text" name="name" value="${name}" readonly />
            </div>
            <div class="form-group">
              <label>Age:</label>
              <input type="text" name="age" value="${age}" readonly />
            </div>
            <div class="form-group">
              <label>Sex:</label>
              <input type="text" name="sex" value="${gender}" readonly />
            </div>
            <div class="form-group">
              <label>Occupation:</label>
              <input type="text" name="occupation" value="${occupation}" readonly />
            </div>
            <div class="form-group">
              <label>Mobile Number:</label>
              <input type="text" name="mobile" value="${mobileNumber}" readonly />
            </div>
            <div class="form-group">
              <label>Email Id:</label>
              <input type="text" name="email" value="${email}" readonly />
            </div>
            <div class="form-group">
              <label>Blood Group:</label>
              <input type="text" name="bloodGrp" value="${bloodGroup}" readonly />
            </div>
            <div class="form-group">
              <label>Diabetes:</label>
              <input type="text" value="${diabetes}" readonly />
            </div>
          </div>
          <h3>Patient Eye History</h3>
          <div class="form-section">
           ${
             otherComplaints !== ''
               ? ` <div class="form-group">
              <label>Any Other Complaint:</label>
              <input
                type="text"
                name="other_complaint"
                value="${otherComplaints}"
                readonly
              />
            </div>`
               : `<span></span>`
           }
            <div class="form-group">
              <label>Cataract Surgery Done:</label>
              <input
                type="text"
                value="${surgeryEye === 'No Surgery Done' ? 'No' : 'Yes'}"
                readonly
              />
            </div>
    
            ${
              surgeryEye !== 'No Surgery Done'
                ? `
            <div class="form-group">
              <label>If Yes, in which eye:</label>
              <input type="text" name="surgeryEye" value="${surgeryEye}" readonly />
            </div>
            `
                : '<span></span>'
            }
          </div>
          </div>
    
          <div class="page page-pad">
            <h3>Vision Chart Results</h3>
            <h4>Distant Vision:</h4>
            <div class="form-section">
              <div class="form-group">
                <label>&ensp; &ensp; Right Eye Score:</label>
                <input
                  type="text"
                  name="rightEye"
                  value="${distantRightEyeResult}"
                  readonly
                />
              </div>
              <div class="form-group">
                <label> &ensp; &ensp; Left Eye Score:</label>
                <input type="text" name="leftEye" value="${distantleftEyeResult}" readonly />
              </div>

              <h4>Near Vision:</h4>
              <div class="form-group">
                <label>&ensp; &ensp; Right Eye Score:</label>
                <input
                  type="text"
                  name="rightEye"
                  value="${nearRightEyeResult}"
                  readonly
                />
              </div>
              <div class="form-group">
                <label> &ensp; &ensp; Left Eye Score:</label>
                <input type="text" name="leftEye" value="${nearleftEyeResult}" readonly />
              </div>
              
              <div class="form-group">
              <label>Referral to an Ophthalmologist:</label>
                <input
                  type="text"
                  name="ophthalmologist"
                  value=${ophthalmologist}
                  readonly
                />
              </div>
            </div>
            
            
      
            <h3 class="page-pad">Eye Images</h3>
            <div class="form-section">
              <div class="flex-row">
                <div class="img-group">
                  <img src="${leftUri}" alt="Left Eye" />
                  <p>Left Eye</p>
                </div>
                <div class="img-group">
                  <img src="${rightUri}" alt="Right Eye" />
                  <p>Right Eye</p>
                </div>
              </div>
            </div>
          </div>
          
          
          
          
          
          <div class="page page-pad">
            <h3>General Information on Cataract</h3>
            <div class="form-section">
              <p> As you age, the lenses in your eyes become less flexible, less clear, and
              thicker. Aging and some medical conditions can cause proteins and fibres
              within the lenses to break down and clump together. This is what causes the
              clouding in the lenses.</p>

            <p> As the cataract grows, the clouding becomes worse. A cataract scatters and
            blocks the light as it passes through the lens. This prevents a sharply defined
            image from reaching your retina. As a result, your vision becomes blurred.
            Cataracts usually happen in both eyes, but not always at the same rate. The
            cataract in one eye may be worse than the other. This causes a difference in
            vision between eyes.</p>
            <p> The most common cause of cataract is degenerative changes due to the
            ageing process. With age, proteins in the natural lens degenerate, resulting in
            a clouded lens called a cataract. There might be other causes such as:
           </p>

              <ul>
              <li>Health conditions like diabetes, kidney disease, glaucoma, smoking, eye
              injuries, infection, and inflammation inside the eye.
             </li>
              <li>Prolonged use of certain medications can also lead to cataract formation.
             </li>
              <li>Cataract may also occur in children due to genetic or metabolic defect or
              due to infection and trauma.
             </li>
              </ul>

              <p>If you have cataract, you may experience some or all of the following
              symptoms.</p>

              <ul>
              <li>Cloudy vision.</li>
              <li>Colours of objects may appear faded.</li>
              <li>Poor eyesight at night.</li>
              <li>Difficulty in driving at night, especially because of the glare of lights.</li>
              <li>Difficulty in reading in dim light.</li>
              <li>Coloured haloes.</li>
              <li>You may see multiple images or double images.</li>
              </ul>

              <p>To deal with symptoms of cataracts until you decide to have surgery, try to:</p>
              <ul>
              <li>Make sure your prescription for your eyeglasses or contact lenses is up to date.</li>
              <li>Improve the lighting in your home with more or brighter lamps.</li>
              <li>Wear sunglasses or a broad-brimmed hat to reduce glare during the day.</li>
              <li>Limit driving at night.</li>
              </ul>
              <p>Self-care measures may help for a while, but your vision may get worse as
              the cataract grows. When vision loss starts to affect your everyday activities,
              consider cataract surgery.</p>

            </div>
          </div>



          <div class="page page-pad">
            <h3>Preparing for your appointment</h3>
            <div class="form-section">
              <p> Make an appointment with your eye care professional if you notice changes
              in your vision. If they determine that you have cataracts, then you may be
              referred to an eye specialist who can perform cataract surgery.</p>
    
              <p> If you need cataract surgery in both eyes, your doctor will schedule surgery to
              remove the cataract Cataract surgery involves removing the clouded lens and
              replacing it with a clear artificial lens.</p>

              <p>The artificial lens, called an intraocular lens, is put in the same place as your
 natural lens. It remains a permanent part of your eye.</p>

              <p>Prevention</p>

              <p>No studies have proved how to prevent or slow the growth of cataracts. But
              health care professionals think several strategies may be helpful, including:</p>

              <ul>
              <li> Regular eye exams.</li>
              <li> Do not smoke.</li>
              <li> Manage other health problems.</li>
              <li> Choose a healthy diet that includes plenty of fruits and vegetables.</li>
              </ul>

            </div>
          </div>
          
    
          
        </div>
      </body>
    </html>
    `;

    const folderPath =
      RNFS.ExternalDirectoryPath + '/../Enetracare/' + regNo + '_' + entries;
    try {
      await RNFS.mkdir(folderPath, {NSURLIsExcludedFromBackupKey: true});
      console.log('Directory created successfully:', folderPath);
    } catch (error) {
      console.error('Error creating directory:', error);
    }

    const printOptions = {
      html: pdfContent,
      fileName: `${regNo}_${name.split(' ')[0]}-Report`,
      directory: `/../Enetracare/${regNo}_${entries}`,
    };
    if (entries < 1) {
      Alert.alert('Session Expired');
      await AsyncStorage.clear();
      setCategory(null);
      setEntries(null);
      navigation.navigate('Home');
      return;
    }
    const tempEntries = entries;
    await AsyncStorage.setItem('entries', JSON.stringify(tempEntries - 1));
    setEntries(tempEntries - 1);
    let pdf = await RNHTMLtoPDF.convert(printOptions);
    if (leftUri) {
      await RNFS.copyFile(
        leftUri,
        folderPath + `/${regNo}_${name.split(' ')[0]}-left.jpg`,
      );
    }

    if (rightUri) {
      await RNFS.copyFile(
        rightUri,
        folderPath + `/${regNo}_${name.split(' ')[0]}-right.jpg`,
      );
    }

    console.log('Pdf Generated', pdf.filePath);
    const tempName = `${regNo}_${entries}`;
    console.log(category, entries);
    navigation.navigate('Pdf', {filePath: pdf.filePath, tempName: tempName});
  };

  const handleFocus = field => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleRefer = id => {
    setTempReferOption(id);
    setOphthalmologist(referOptions[id - 1].value);
  };

  return (
    <>
      <Navbar>
        <View style={styles.leftContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={NavbarBackArrow} style={styles.arrowImage} />
          </TouchableOpacity>
          <Text style={styles.title}>Eye Section</Text>
        </View>
      </Navbar>
      <ScrollView>
        <LinearGradient
          style={styles.container}
          colors={['#3EA6D7', '#3EA5D6', '#7DBDD4']}>
          <Text style={styles.sectionHeading}>Vision Chart Results</Text>
          <Text style={styles.subHeading}>Distant Vision:</Text>
          <Animated.View
            style={[
              styles.inputContainer,
              focusedField === 'distantRightEyeResult' &&
                styles.focusedInputContainer,
            ]}>
            <Text style={styles.label}>Right Eye:</Text>
            <TextInput
              style={styles.input}
              value={distantRightEyeResult}
              onChangeText={setDistantRightEyeResult}
              onFocus={() => handleFocus('distantRightEyeResult')}
              onBlur={handleBlur}
              placeholder="Enter right eye result"
              selectionColor={'black'}
              placeholderTextColor="#999"
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.inputContainer,
              focusedField === 'distantleftEyeResult' &&
                styles.focusedInputContainer,
            ]}>
            <Text style={styles.label}>Left Eye:</Text>
            <TextInput
              style={styles.input}
              value={distantleftEyeResult}
              onChangeText={setDistantLeftEyeResult}
              onFocus={() => handleFocus('distantleftEyeResult')}
              onBlur={handleBlur}
              placeholder="Enter left eye result"
              selectionColor={'black'}
              placeholderTextColor="#999"
            />
          </Animated.View>

          <Text style={styles.subHeading}>Near Vision:</Text>
          <Animated.View
            style={[
              styles.inputContainer,
              focusedField === 'nearRightEyeResult' &&
                styles.focusedInputContainer,
            ]}>
            <Text style={styles.label}>Right Eye:</Text>
            <TextInput
              style={styles.input}
              value={nearRightEyeResult}
              onChangeText={setNearRightEyeResult}
              onFocus={() => handleFocus('nearRightEyeResult')}
              onBlur={handleBlur}
              placeholder="Enter right eye result"
              selectionColor={'black'}
              placeholderTextColor="#999"
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.inputContainer,
              focusedField === 'nearleftEyeResult' &&
                styles.focusedInputContainer,
            ]}>
            <Text style={styles.label}>Left Eye:</Text>
            <TextInput
              style={styles.input}
              value={nearleftEyeResult}
              onChangeText={setNearLeftEyeResult}
              onFocus={() => handleFocus('nearleftEyeResult')}
              onBlur={handleBlur}
              placeholder="Enter left eye result"
              selectionColor={'black'}
              placeholderTextColor="#999"
            />
          </Animated.View>

          <EyeSection setLeftUri={setLeftUri} setRightUri={setRightUri} />

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Referral to an Ophthalmologist:</Text>
            <View style={styles.buttonRow}>
              {referOptions.map(element => (
                <TouchableOpacity
                  key={element.id}
                  style={
                    tempReferOption === element.id
                      ? styles.bloodBtnPressed
                      : styles.bloodBtn
                  }
                  onPress={() => handleRefer(element.id)}>
                  <Text
                    style={
                      tempReferOption === element.id
                        ? styles.bloodBtnTextPressed
                        : styles.bloodBtnText
                    }>
                    {element.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.consentContainer}>
            <Text style={styles.consentText}>
              Consent for taking eye details and images:
            </Text>
            <Switch
              value={consent}
              onValueChange={setConsent}
              trackColor={{false: '#767577', true: '#134687'}}
              thumbColor={consent ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, !consent && {backgroundColor: '#ccc'}]}
            disabled={!consent}
            onPress={handleVisionSubmit}>
            <Text style={[styles.buttonText, !consent && {color: '#ffffff'}]}>
              Submit
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 90,
    paddingBottom: 10,
    flexGrow: 1,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bloodBtn: {
    borderRadius: 15,
    paddingVertical: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: 60,
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
    width: 60,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
  sectionHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 7,
    color: '#ffffff',
    textAlign: 'left',
    marginLeft: 10,
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
  consentContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  consentText: {
    marginBottom: 5,
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    alignSelf: 'center',
    maxWidth: 220,
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
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  imageContainer: {
    borderStyle: 'solid',
    borderWidth: 2,
    marginVertical: 16,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  title: {
    color: '#134687',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  arrowImage: {
    width: 20,
    height: 20,
    marginHorizontal: 7,
  },
});

export default VisionChartResults;
