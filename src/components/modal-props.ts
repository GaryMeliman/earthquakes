import { ReactNode } from "react";

export default interface ModalProps {
    visible: boolean,
    title: string,
    description: ReactNode,
    actions: ReactNode
}
