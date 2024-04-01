import React, { useState } from "react";
import Modal from "./modal";
import { Dialog, Icon, Slider, Text } from "@rneui/themed";
import { View } from "react-native";

const ModalPaginate = ({ onCloseModal, maximumValue, visible, onPaginate }:
    { onCloseModal: () => void, maximumValue: number, visible: boolean, onPaginate: (pagina: number) => void }) => {

    const [pagina, setPagina] = useState(0);

    const CreatePaginator = () =>
        <View>
            <Text style={{ marginBottom: 20 }} h4>Página {pagina}</Text>
            <Slider
                value={pagina}
                onValueChange={setPagina}
                maximumValue={maximumValue}
                minimumValue={1}
                step={1}
                allowTouchTrack
                trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                thumbProps={{
                    children: (
                        <Icon
                            name="heartbeat"
                            type="font-awesome"
                            size={20}
                            reverse
                            containerStyle={{ bottom: 20, right: 20 }}
                        />
                    ),
                }}
            />
        </View>
    const ActionButtons = () => {
        return (
            <Dialog.Actions>
                <Dialog.Button
                    title="CONFIRMAR"
                    onPress={() => onPaginate(pagina)}
                />
                <Dialog.Button title="CANCELAR" onPress={onCloseModal} />
            </Dialog.Actions>
        );
    }
    return <Modal title="Paginación" actions={ActionButtons()} description={CreatePaginator()} visible={visible} />
}

export default ModalPaginate;