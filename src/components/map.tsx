import { useNavigation } from "@react-navigation/native";
import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { DEFAULT_REGION, EARTH_QUAKE_DETAILS_SCREEN, createCoordinates, getDescription } from "../utils/Constants";

const Map = ({ earthquakes, region, marker }: { earthquakes?: any, region: any, marker?: ReactNode }) => {
    const navigator = useNavigation();

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
        >
            {earthquakes?.features?.map((feature: any, index: number) =>
                <Marker
                    key={index}
                    coordinate={createCoordinates(feature)}
                    title={feature.properties.place}
                    description={getDescription(feature.properties)}
                    onCalloutPress={() => {
                        navigator.navigate(EARTH_QUAKE_DETAILS_SCREEN, { feature: feature });
                    }}
                />)}
            {marker}
        </MapView>
    )
}
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});
export default Map;