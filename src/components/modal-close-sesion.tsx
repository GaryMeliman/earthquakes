import React from "react";
import Modal from "./modal";
import { Dialog, Text } from "@rneui/themed";
import ModalCloseSesionProps from "./modal-close-sesion-props";

const ModalCloseSesion = ({ visible, onCloseSesion, onCloseModal }: ModalCloseSesionProps) => {

    const Description = () => <Text>¿Está seguro de querer cerrar sesión?</Text>;

    const ActionButtons = () => {
        return (
            <Dialog.Actions>
                <Dialog.Button
                    title="CONFIRMAR"
                    onPress={() => onCloseSesion("Close session")}
                />
                <Dialog.Button title="CANCELAR" onPress={onCloseModal} />
            </Dialog.Actions>
        );
    }

    return (
        <Modal
            actions={<ActionButtons />}
            description={<Description />}
            title="Cerrar sesión"
            visible={visible}>

        </Modal>
    )
}

export default ModalCloseSesion;