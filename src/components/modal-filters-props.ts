export default interface ModalFiltersProps {
    visible: boolean,
    onAplyFilters: (query: string) => void,
    onCloseModal: () => void
}
