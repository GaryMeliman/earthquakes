import { Button, Card, Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import auth from '@react-native-firebase/auth';
import { Formik } from "formik";
import { LOGIN_SCREEN, MAP_SCREEN, registerSchema } from "../../utils/Constants";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';

const Register = () => {

    const navigator = useNavigation();
    const [firestoreValues, setFirestoreValue] = useState();

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    const onAuthStateChanged = (user: any) => {
        setTimeout(async () => {
            if (user != null) {

                navigator.navigate(MAP_SCREEN);
            }
        }, 1000);
    }

    const handleRegister = (values: any) => {
        setFirestoreValue(values);
        auth()
            .createUserWithEmailAndPassword(values.email, values.clave).then(auth => console.log(auth)).catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('', 'Un usuario con ese email ya fue registrado', [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            });
        firestore().collection('usuarios').doc(values.email).set({
            nombre: values.nombre || '',
            apellido: values.apellido || '',
            email: values.email || ''
        });
    }

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ email: '', clave: '', nombre: '', apellido: '', }}
                validationSchema={registerSchema}
                onSubmit={handleRegister}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <Card containerStyle={styles.card}>
                        <Card.Title>Register</Card.Title>
                        <View>

                            <Input
                                placeholder="Correo"
                                keyboardType="email-address"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email} />
                            <Input placeholder="Nombre"
                                onChangeText={handleChange('nombre')}
                                onBlur={handleBlur('nombre')}
                                value={values.nombre} />
                            <Input placeholder="Apellido"
                                onChangeText={handleChange('apellido')}
                                onBlur={handleBlur('apellido')}
                                value={values.apellido} />
                            <Input placeholder="Contraseña" secureTextEntry
                                onChangeText={handleChange('clave')}
                                onBlur={handleBlur('clave')}
                                value={values.clave} />
                        </View>
                        <Button title="Registro" onPress={handleSubmit} />
                        <Button title="Ingreso" type="outline" onPress={() => navigator.navigate(LOGIN_SCREEN)} />
                    </Card>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: "80%"
    }
});


export default Register;