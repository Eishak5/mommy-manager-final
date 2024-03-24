import React, { useState, useEffect, useContext } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity, Modal, Text, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import AppIcons from './Utilities/AppIcons';
import { useTheme } from '@react-navigation/native';
// import firebase from 'firebase';
import { GlobalContext } from '../Context/GlobalContext';

const AvatarImg = () => {
    const { colors } = useTheme()
    const { currentUser } = useContext(GlobalContext)
    const [imageUri, setImageUri] = useState(null);
    const [visiable, setVisiable] = useState(false)
    const { uploadImageFireBase } = useContext(GlobalContext)
   
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });
        if (!result.cancelled) {
            setImageUri(result.assets[0].uri);
            setVisiable(false)
        }
    };

    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.cancelled) {
            setImageUri(result.assets[0].uri);
            setVisiable(false)
        }
    };

    const uploadImage = async () => {
        try {
            if (!imageUri) return;
            const resizedImage = await ImageManipulator.manipulateAsync(imageUri, [{ resize: { width: 300 } }], { compress: 0.5 });
            const response = await fetch(resizedImage.uri);
            const blob = await response.blob();
            const resp=await uploadImageFireBase(blob)
            if(resp){
                setImageUri("")
            }
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    };
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.avatarContainer}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.avatar} />
                    ) : (
                        <View style={styles.placeholder}>
                            {
                                currentUser?.profile &&
                                <Image source={{ uri: currentUser.profile }} style={styles.avatar} />
                            }
                        </View>
                    )}
                </View>
                <TouchableOpacity style={styles.cameraButton} onPress={() => setVisiable(true)}>
                    <AppIcons type={"camera"} size={30} color={colors.primary} />
                </TouchableOpacity>
            </View>
            {
                imageUri && <Button title="Upload Image" onPress={uploadImage} disabled={!imageUri} />
            }
            <Modal
                visible={visiable}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    setVisiable(false)
                }} >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.buttonClose]}
                            onPress={() => setVisiable(false)}>
                            <AppIcons type={"close"} size={30} color={colors.text} />

                        </Pressable>
                        <Text style={{ fontSize: 20, marginBottom: 10 }}>
                            Pick an Option
                        </Text>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <TouchableOpacity style={[styles.button, { color: colors.primary }]} onPress={takePicture}>
                                <AppIcons type={"camera"} size={30} color={colors.primary} />
                                <Text style={{ fontSize: 16, color: colors.primary }}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { color: colors.primary }]} onPress={pickImage} >
                                <AppIcons type={"photo"} size={30} color={colors.primary} />
                                <Text style={{ fontSize: 16, color: colors.primary }}>Photo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff',
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        width: 100
    },
    buttonClose: {
        position: "absolute",
        top: 5,
        right: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative"
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        width: '80%',
        paddingTop: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    avatarContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden',
        marginBottom: 20,
    },
    avatar: {
        flex: 1,
        width: 150,
        height: 150,
    },
    placeholder: {
        flex: 1,
        backgroundColor: '#e1e1e1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderIcon: {
        width: 80,
        height: 80,
        tintColor: '#8f8f8f',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 10,
        elevation: 5,
    },
    cameraIcon: {
        width: 30,
        height: 30,
    },
});

export default AvatarImg;
