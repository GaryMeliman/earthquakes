import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Map from "../../components/map";
import { DEFAULT_REGION, createCoordinates, getDescription } from "../../utils/Constants";
import { Card, Text } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";
import { Marker } from "react-native-maps";

const EarthquakeDetails = () => {
    const route = useRoute();
    const { feature } = route.params;
    const [region, setRegion] = useState(DEFAULT_REGION);

    useEffect(() => {
        setRegion({ ...DEFAULT_REGION, ...createCoordinates(feature) });
    }, [feature]);

    return (
        <View style={styles.container}>
            <Map
                region={region}
                marker={<Marker coordinate={region} />}
            />
            <Card containerStyle={styles.card}>
                <Card.Title>{feature.properties.place}</Card.Title>
                <Text>{getDescription(feature)}</Text>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "75%",
        width: "100%",
        display: "flex",
        flex: 1
    },
    fabFilters: {
        ...StyleSheet.absoluteFillObject,
        bottom: 10,
        right: 10
    },
    card: {
        position: "absolute",
        bottom: 20,
        width: "80%",
        left: 25
    }
});

export default EarthquakeDetails;