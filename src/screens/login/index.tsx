import { Button, Card, Input, Text } from "@rneui/themed";
import React, { useEffect } from "react";
import auth from '@react-native-firebase/auth';
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MAP_SCREEN, REGISTER_SCREEN, loginSchema } from "../../utils/Constants";
import { Formik } from 'formik';

const LoginScreen = () => {
    const navigator = useNavigation();
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    const onAuthStateChanged = (user: any) => {
        if (user != null) navigator.navigate(MAP_SCREEN);
    }
    const handleLogin = async (values: any) => {
        auth()
            .signInWithEmailAndPassword(values.email, values.clave).then(auth => {
                if (auth.user != null) {
                    navigator.navigate(MAP_SCREEN)
                }
            }).catch(error => {
                if (error.code === 'auth/invalid-credential') {
                    Alert.alert('', 'Credenciales inválidas', [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            });
    }

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ email: '', clave: '' }}
                onSubmit={(values) => {
                    console.log(values);

                }}
                validationSchema={loginSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <Card containerStyle={styles.card}>
                        <Card.Title>Inciar sesión</Card.Title>
                        <View>
                            <Input
                                placeholder="Correo"
                                keyboardType="email-address"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email} />
                            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
                            <Input
                                placeholder="Contraseña"
                                secureTextEntry
                                onChangeText={handleChange('clave')}
                                onBlur={handleBlur('clave')}
                                value={values.clave} />
                            {errors.clave && <Text style={styles.error}>{errors.clave}</Text>}
                        </View>
                        <Button title="Login" onPress={() => handleLogin(values)} />
                        <Button type="clear" title="Registro" onPress={() => navigator.navigate(REGISTER_SCREEN)} />
                    </Card>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: "80%"
    },
    error: {
        color: 'red',
    },
});

export default LoginScreen;