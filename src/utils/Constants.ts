import * as yup from 'yup';
export const DEFAULT_REGION = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.55,
    longitudeDelta: 0.521,
};
export const MAP_SCREEN = "MAP_SCREEN";
export const LOGIN_SCREEN = "LOGIN_SCREEN";
export const EARTH_QUAKE_DETAILS_SCREEN = "EARTH_QUAKE_DETAILS_SCREEN";
export const REGISTER_SCREEN = "REGISTER_SCREEN";
export const getDescription = (feature: any) => `Magnitud: ${feature?.properties?.mag}\nProfundidad: ${feature?.geometry?.coordinates[3]}`;
export const createCoordinates = (feature: any) =>
    ({ latitude: feature.geometry.coordinates[1], longitude: feature.geometry.coordinates[0] });
const loginSchemaObject = {
    email: yup.string().email('Ingrese un email válido').required('El email es obligatorio'),
    clave: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
}
const registerSchemaObject = {
    ...loginSchemaObject,
    apellido: yup.string().required('El apellido es obligatorio'),
    nombre: yup.string().required('El nombre es obligatorio')
}
export const registerSchema = yup.object().shape({ ...registerSchemaObject });
export const loginSchema = yup.object().shape({ ...registerSchemaObject });