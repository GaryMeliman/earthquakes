export default interface ModalCloseSesionProps {
    visible: boolean,
    onCloseSesion: (query: string) => void,
    onCloseModal: () => void
}
