import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Logo from '../assets/enetracareLogo.png';

const LogoScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={Logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#ffffff"
    },
});

export default LogoScreen;
