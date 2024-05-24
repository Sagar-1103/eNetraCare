import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import EyeSection from './EyeSection';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {useSession} from '../context/SessionProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VisionChartResults = ({navigation}) => {
  const [rightEyeResult, setRightEyeResult] = useState('');
  const [leftEyeResult, setLeftEyeResult] = useState('');
  const [consent, setConsent] = useState(false);
  const [leftUri, setLeftUri] = useState(null);
  const [rightUri, setRightUri] = useState(null);
  const {category,setCategory, entries, setEntries} = useSession();

  const handleVisionSubmit = async () => {
    const pdfContent = `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          color: #333;
        }
        h2 {
          color: #4A90E2;
        }
        p {
          margin: 5px 0;
        }
        .info-section, .image-section {
          margin-bottom: 20px;
        }
        .flex-row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-top: 10px;
        }
        .eye-image {
          max-width: 45%; /* Adjusted for better layout on PDF */
          height: auto; /* Changed to auto for responsive height */
          margin: 10px;
          border: 1px solid #ddd; /* Add a light border around the images */
          padding: 5px;
          background: #f7f7f7;
        }
        img {
          width: 100%;
          height: auto;
        }
        hr {
          margin-top: 20px;
          border: 0;
          border-top: 1px solid #ccc;
        }
      </style>
    </head>
    <body>
      <div class="info-section">
        <h2>Form Information:</h2>
        <p><strong>Name:</strong></p>
        <p><strong>Phone Number:</strong> </p>
        <p><strong>Reference Name:</strong></p>
        <p><strong>Reference Phone Number:</strong> </p>
        <p><strong>Gender:</strong> </p>
        <p><strong>Age:</strong> </p>
        <p><strong>Address:</strong> </p>
        <div>
          <p><strong>Left Eye Score:</strong> </p>
          <p><strong>Right Eye Score:</strong> </p>
        </div>
      </div>
      <hr/>
      <div class="image-section">
        <h2>Images:</h2>
        <div class="flex-row">
          <div class="eye-image">
            <p><strong>Left Eye Image:</strong></p>
           
          </div>
          <div class="eye-image">
            <p><strong>Right Eye Image:</strong></p>
          
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
    // Save PDF
    const folderPath = RNFS.ExternalDirectoryPath + '/../Enetracare/' + 'sagar';
    try {
      await RNFS.mkdir(folderPath, {NSURLIsExcludedFromBackupKey: true}); // Create the directory
      console.log('Directory created successfully:', folderPath);
    } catch (error) {
      console.error('Error creating directory:', error);
    }

    const printOptions = {
      html: pdfContent, // You can provide HTML content directly if needed
      fileName: 'info2',
      directory: `/../Enetracare/${'sagar'}`,
    };
    if (entries < 1) {
      Alert.alert('Session Expired');
      await AsyncStorage.clear();
      setCategory(null);
      setEntries(null);
      navigation.navigate('Home');
      return;
    }
    await AsyncStorage.setItem('entries', JSON.stringify(tempEntries - 1));
    const tempEntries = entries;
    setEntries(tempEntries - 1);
    let pdf = await RNHTMLtoPDF.convert(printOptions);
    await RNFS.copyFile(leftUri, folderPath + '/left.jpg');
    await RNFS.copyFile(rightUri, folderPath + '/right.jpg');
    console.log('Pdf Generated', pdf.filePath);

    console.log(category, entries);
    navigation.navigate('Pdf', {filePath: pdf.filePath});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Vision Chart Results:</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Right Eye:</Text>
          <TextInput
            style={styles.input}
            value={rightEyeResult}
            onChangeText={setRightEyeResult}
            placeholder="Enter right eye result"
            placeholderTextColor="#999"
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Left Eye:</Text>
          <TextInput
            style={styles.input}
            value={leftEyeResult}
            onChangeText={setLeftEyeResult}
            placeholder="Enter left eye result"
            placeholderTextColor="#999"
            keyboardType="number-pad"
          />
        </View>

        <EyeSection setLeftUri={setLeftUri} setRightUri={setRightUri} />

        <View style={styles.consentContainer}>
          <Text style={styles.label}>
            Consent for taking eye details and images:
          </Text>
          <Switch
            value={consent}
            onValueChange={setConsent}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={consent ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
        <Button
          title="Submit"
          disabled={!consent}
          onPress={handleVisionSubmit}
          color="#1e90ff"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  inputContainer: {
    marginBottom: 15,
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  label: {
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000',
  },
  consentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default VisionChartResults;
