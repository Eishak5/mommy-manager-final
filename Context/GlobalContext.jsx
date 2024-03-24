import { createContext, useEffect, useReducer, useState } from "react";
import GlobalReducer, { initialValue } from "./GlobalReducer";
import actions from './GlobalActions'
import OnBoradingData from '../Data/OnBoarding'
import { auth, createUserWithEmailAndPassword, db, onAuthStateChanged, signInWithEmailAndPassword } from './config';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import * as Location from "expo-location";
import { Alert } from "react-native";
import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const { getOnBoardingBegin, getOnBoardingSuccess, getOnBoardingFailure,
    getUserInformationBegin,
    getUserInformationSuccess,
    getUserInformationFailure,
    signupBegin,
    signupSuccess,
    signupFailure,
    loginBegin,
    loginSuccess,
    todoBegin,
    loginFailure,
    todoSuccess,
    todoFailure,
    locationSuccess,
    todoFilterBegin,
    todoFilterSuccess,
    todoFilterFailure,
    hourlyWeatherBegin,
    hourlyWeatherSuccess,
    hourlyWeatherFailure,
    currentUserBegin,
    currentUserSuccess,
    currentUserFailure,
    currentUserLogout,
} = actions

const API_KEY = "8e37300ae5a34d5a6baee2203419829c";
const GlobalContext = createContext(initialValue)
const GlobalProvider = ({ children }) => {
    const [colorMode, setColorMode] = useState(false)
    const [state, dispatch] = useReducer(GlobalReducer, initialValue)
    const storage = getStorage();
    const changeColorMode = () => {
        setColorMode(!colorMode)
    }
    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status != "granted") {
            Alert.alert("Error", "Please grant location permissions");
            return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        dispatch(locationSuccess(currentLocation));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            dispatch(getUserInformationSuccess(user))
        });

        return unsubscribe;
    }, []);
    const getOnBoarding = () => {
        try {
            dispatch(getOnBoardingBegin())
            dispatch(getOnBoardingSuccess(OnBoradingData))
        } catch (error) {
            dispatch(getOnBoardingFailure())
        }
    }
    const logout = async () => {
        try {
            dispatch(currentUserLogout())
            await auth.signOut()
            dispatch(currentUserLogout())
        } catch (error) {
            dispatch(currentUserLogout())
        }
    }
    const signInWithEmailPassword = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error signing in with email and password:', error);
        }
    };
    const signUpWithEmailPassword = async (email, password) => {
        try {
            dispatch(signupBegin())
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await addDoc(collection(db, 'users'), {
                firstName: "",
                lastName: "",
                phone: "",
                address: "",
                profile: "", userId: userCredential.user.uid
            });
            dispatch(signupSuccess())
        } catch (error) {
            console.error('Error signing in with email and password:', error);
            dispatch(signupFailure())
        }
    };
    const getCurrentUser = async () => {
        try {
            +-            dispatch(currentUserBegin())
            const snapshot = await await getDocs(query(collection(db, 'users'), where("userId", "==", state?.user?.uid)));
            snapshot.forEach((doc) => {
                dispatch(currentUserSuccess({ id: doc.id, ...doc.data() }))
            });
        } catch (error) {
            console.error("Error getting todos: ", error);
            dispatch(currentUserFailure(error))
        }
    };
    const updateCurrentUser = async (id, data) => {
        try {
            dispatch(currentUserBegin())
            delete data.profile
            await updateDoc(doc(db, "users", id), data)
            getCurrentUser()
            return true
        } catch (error) {
            console.error("Error getting todos: ", error);
            dispatch(currentUserFailure(error))
            return false
        }
    };
    // Function to get all todo items from Firebase
    const getTodos = async () => {
        try {
            dispatch(todoBegin())
            const currentDate = new Date();
            const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
            const snapshot = await getDocs(query(collection(db, 'todos'), where("userId", "==", state?.user?.uid), where("date", ">=", startOfDay), where("date", "<", endOfDay)));
            // const snapshot = await await getDocs(query(collection(db, 'todos'), where("userId", "==", state?.user?.uid)));
            const todos = [];
            snapshot.forEach((doc) => {
                todos.push({ id: doc.id, ...doc.data() });
            });
            dispatch(todoSuccess(todos))
        } catch (error) {
            console.error("Error getting todos: ", error);
            dispatch(todoFailure(error))
        }
    };
    // Function to get all todo items from Firebase
    const getTodosbyDate = async (currentDate) => {
        try {
            dispatch(todoFilterBegin())
            const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
            const snapshot = await getDocs(query(collection(db, 'todos'), where("userId", "==", state?.user?.uid), where("date", ">=", startOfDay), where("date", "<", endOfDay)));
            const todos = [];
            snapshot.forEach((doc) => {
                todos.push({ id: doc.id, ...doc.data() });
            });
            dispatch(todoFilterSuccess(todos))
        } catch (error) {
            console.error("Error getting todos: ", error);
            dispatch(todoFilterFailure(error))
        }
    };
    // this function is for add new todo
    const addTodo = async (todo) => {
        try {
            if (state?.user?.uid) {
                dispatch(todoBegin())
                await addDoc(collection(db, 'todos'), { ...todo, status: "uncomplete", userId: state?.user?.uid });
                await getTodos()
                return true
            }
            else {
                Alert.alert("Error", "please login again")
            }
        } catch (error) {
            console.error("Error adding todo: ", error);
            dispatch(todoFailure(error))
            return false
        }
    };
    // Function to delete a todo item from Firebase
    const deleteTodo = async (todoId) => {
        try {
            await deleteDoc(doc(db, "todos", todoId));
            // await db.collection("todos").doc(todoId).delete();
            await getTodos()
        } catch (error) {
            console.error("Error deleting todo: ", error);
        }
    };
    // Function to update a todo item in Firebase
    const updateTodo = async (todoId, updatedTodo) => {
        try {
            dispatch(todoBegin())
            await updateDoc(doc(db, "todos", todoId), updatedTodo)
            await getTodos()
            return true
        } catch (error) {
            console.error("Error updating todo: ", error);
            return false
        }
    };
    const uploadImageFireBase = async (blob) => {
        try {
            const fileName = Date.now() + '.jpg';
            const fileRef = ref(storage, `avatars/${fileName}`);
            const response = await uploadBytes(fileRef, blob);
            const downloadURL = await getDownloadURL(fileRef);
            const querySnapshot = await getDocs(query(collection(db, 'users'), where("userId", "==", state?.user?.uid)))
            if (querySnapshot.size > 1) {
                throw new Error('Multiple documents found with the same index value.');
            }
            const docRef = querySnapshot.docs[0].ref;
            // const docData = querySnapshot.docs[0].data();
            // const oldImageUrl = docData.profile;
            await updateDoc(docRef, {
                profile: downloadURL
            });
            // if (oldImageUrl) {
            //     const oldImageName = oldImageUrl.substring(oldImageUrl.lastIndexOf('/') + 1);
            //     const oldImageRef = ref(storage, `${oldImageName}`);
            //     await deleteObject(oldImageRef);
            //     console.log('Old image deleted successfully:', oldImageUrl);
            // }
            return true
        } catch (error) {
            console.error("Error uploading image: ", error);
            return false
        }
    };

    const getInfo = async (lat, lon) => {
        try {
            dispatch(hourlyWeatherBegin())
            const response = await axios(
                `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
            );
            if (response.status === 200) {
                dispatch(hourlyWeatherSuccess(response.data))
            } else {
                throw response;
            }
        } catch (error) {
            console.log("error: ", error);
            dispatch(hourlyWeatherFailure(error))
        }
    };
    // const signInWithGoogle = async () => {
    //     const provider = new firebase.auth.GoogleAuthProvider();
    //     try {
    //         await firebase.auth().signInWithPopup(provider);
    //     } catch (error) {
    //         console.error('Error signing in with Google:', error);
    //     }
    // };

    // const signInWithFacebook = async () => {
    //     const provider = new firebase.auth.FacebookAuthProvider();
    //     try {
    //         await firebase.auth().signInWithPopup(provider);
    //     } catch (error) {
    //         console.error('Error signing in with Facebook:', error);
    //     }
    // };

    // const signOut = async () => {
    //     try {
    //         await firebase.auth().signOut();
    //     } catch (error) {
    //         console.error('Error signing out:', error);
    //     }
    // };
    return (
        <GlobalContext.Provider value={{
            ...state,
            colorMode,
            getCurrentUser,
            updateCurrentUser,
            getOnBoarding,
            signInWithEmailPassword,
            signUpWithEmailPassword,
            addTodo,
            deleteTodo,
            updateTodo,
            uploadImageFireBase,
            getTodos,
            getPermissions,
            getInfo,
            getTodosbyDate,
            logout,
            changeColorMode
            // signInWithGoogle,
            // signInWithFacebook,
            // signOut,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
export { GlobalContext, GlobalProvider }