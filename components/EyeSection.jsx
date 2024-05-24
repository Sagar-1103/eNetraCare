import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, PermissionsAndroid, Platform, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const EyeSection = () => {
    const [rightImageUri, setRightImageUri] = useState(null);
    const [leftImageUri, setLeftImageUri] = useState(null);

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs access to your camera.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Camera permission granted');
                } else {
                    console.log('Camera permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    const upload = (side) => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,  // Make sure the width and height are the same for a square crop
            cropping: true,
            cropperCircleOverlay: true,  // This enables the circular cropping overlay
        }).then((image) => {
            if (side === "right") {
                setRightImageUri(image.path);
            } else if (side === "left") {
                setLeftImageUri(image.path);
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>EyeSection</Text>
            <View style={styles.imageButtonContainer}>
                <View style={styles.imageButtonWrapper}>
                    {leftImageUri && <Image source={{ uri: leftImageUri }} style={styles.image} />}
                    {!leftImageUri && <View style={{height:150,width:150,backgroundColor:"gray",borderRadius: 500,marginBottom: 10,}}></View>}

                    <Button title="Upload Left Image" onPress={() => upload("left")} color="tomato" />
                </View>
                <View style={styles.imageButtonWrapper}>
                    {rightImageUri && <Image source={{ uri: rightImageUri }} style={styles.image} />}
                    {!rightImageUri && <View style={{height:150,width:150,backgroundColor:"gray",borderRadius: 500,marginBottom: 10,}}></View>}
                    <Button title="Upload Right Image" onPress={() => upload("right")} color="tomato" />
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#fff',
    },
    imageButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    imageButtonWrapper: {
        alignItems: 'center',
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 500, // half of the width and height to make it circular
        marginBottom: 10,
    },
});

// make this component available to the app
export default EyeSection;
