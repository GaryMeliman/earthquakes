import React, { useEffect, useState } from "react";
import { getCountEarthquakes, getEarthquakes } from "../../services/earthquake";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { Badge, FAB } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalFilters from "../../components/modal-filters";
import ModalCloseSesion from "../../components/modal-close-sesion";
import auth from '@react-native-firebase/auth';
import Map from "../../components/map";
import { DEFAULT_REGION, LOGIN_SCREEN } from "../../utils/Constants";
import { useNavigation } from "@react-navigation/native";
import ModalPaginate from "../../components/modal-paginate";
import firestore from '@react-native-firebase/firestore';

const MAX_ITEMS = 20;

const Earthquake = () => {
    const [region, setRegion] = useState(DEFAULT_REGION);
    const [showModalFilters, setShowModalFilters] = useState(false);
    const [showModalCloseSesion, setShowModalCloseSesion] = useState(false);
    const earthquakes = useSelector((state: any) => state.earthquake);
    const [paginatedEarthquakes, setPaginatedEarthquakes] = useState();
    const [earthQuakeCount, setEarthquakeCount] = useState(0);
    const [showPaginationModal, setShowPaginationModal] = useState(false);
    const [userData, setUserData] = useState();

    const dispatch = useDispatch();
    const navigator = useNavigation();

    useEffect(() => {
        getEarthquakes(dispatch);
        getUserDataFromFirestore();
    }, []);

    useEffect(() => {
        if (earthquakes.features) {
            setEarthquakeCount(earthquakes.features.length)
            setPaginatedEarthquakes(paginate(earthquakes, 1));
        }
    }, [earthquakes]);

    const paginate = (earthquakes: any, paginate: number) => {
        const count = 20;
        if (earthquakes.features.length <= MAX_ITEMS) return earthquakes;
        else {

            const inicialIndex = (paginate - 1) * count;
            const finalIndex = inicialIndex + count;
            const newFeatures = earthquakes.features.slice(inicialIndex, finalIndex);
            return { ...earthquakes, features: newFeatures };
        }
    }

    const handleAplyFilters = async (query: string) => {
        const count = await getCountEarthquakes(query);
        setEarthquakeCount(count);
        getEarthquakes(dispatch, query);
        setShowModalFilters(false);
    }

    const handleCloseSession = async () => {
        await auth()
            .signOut();
        setShowModalCloseSesion(false);
    }

    const handlePaginate = (pagina: number) => {
        const earth = paginate(earthquakes, pagina);
        setRegion({ ...region, latitude: earth.features[0].geometry.coordinates[1], longitude: earth.features[0].geometry.coordinates[0] })
        setPaginatedEarthquakes(earth);
        setShowPaginationModal(false);
    }

    const getUserDataFromFirestore = async () => {
        if (auth().currentUser?.email) {
            const userData = await firestore().collection('usuarios').doc(auth().currentUser?.email).get();
            setUserData(userData.data());
        }
    };

    return (
        <View style={styles.container}>
            <Map
                earthquakes={paginatedEarthquakes}
                region={region}
            />
            <FAB
                onPress={() => setShowModalFilters(true)}
                style={styles.fabFilters}
                color="white"
                upperCase
                icon={<Icon name="filter" size={25} />}
            />
            <FAB
                onPress={() => setShowModalCloseSesion(true)}
                style={styles.fabCloseSesion}
                color="white"
                upperCase
                icon={<Icon name="close" size={25} />}
            />
            {userData && <Badge status="primary" badgeStyle={{ position: "absolute", top: 0, zIndex: 99999 }} containerStyle={{ position: "absolute", top: 10, left: 50 }} value={`${userData.nombre} ${userData.apellido}`} />}
            <Badge status="error" badgeStyle={{ position: "absolute", top: 0, zIndex: 99999, marginTop: 20 }} containerStyle={{ position: "absolute", top: 10, left: 50 }} value={`${earthquakes?.features?.length} terremotos`} />
            <ModalFilters
                visible={showModalFilters}
                onCloseModal={() => setShowModalFilters(false)}
                onAplyFilters={handleAplyFilters} />
            <ModalCloseSesion
                visible={showModalCloseSesion}
                onCloseModal={() => setShowModalCloseSesion(false)}
                onCloseSesion={handleCloseSession}
            />
            {
                (earthQuakeCount > 20) && <>
                    <FAB
                        onPress={() => setShowPaginationModal(true)}
                        style={styles.fabPagination}
                        color="white"
                        upperCase
                        icon={<Icon name="th-list" size={25} />}
                    />
                    <ModalPaginate onPaginate={handlePaginate} visible={showPaginationModal} maximumValue={Math.round(earthQuakeCount / 20)} onCloseModal={() => setShowPaginationModal(false)} />
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
    },
    fabFilters: {
        bottom: 10,
        right: 10,
        position: "absolute"
    },
    fabCloseSesion: {
        right: 10,
        top: 10,
        position: "absolute"
    },
    fabPagination: {
        left: 10,
        bottom: 10,
        position: "absolute"
    }
});

export default Earthquake;
