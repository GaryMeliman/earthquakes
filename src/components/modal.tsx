import React from "react";
import { Dialog } from '@rneui/themed';
import ModalProps from "./modal-props";


const Modal = ({ actions, description, title, visible }: ModalProps) => {
    return (
        <Dialog
            isVisible={visible}
        >
            <Dialog.Title title={title} />
            {description}
            {actions}
        </Dialog>)
}

export default Modal;