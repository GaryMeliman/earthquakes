import React, { useState } from "react";
import Modal from "./modal";
import ModalFiltersProps from "./modal-filters-props";
import { Badge, Dialog, Text } from "@rneui/themed";
import DatePicker from "react-native-date-picker";

const ModalFilters = ({ visible, onAplyFilters, onCloseModal }: ModalFiltersProps) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const createQuery = () => `&starttime=${parseDate(startDate)}&endtime=${parseDate(endDate)}`;

    const parseDate = (date: Date) => {
        const ano = date.getFullYear();
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const dia = String(date.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }

    const ActionButtons = () => {
        return (
            <Dialog.Actions>
                <Dialog.Button
                    title="CONFIRMAR"
                    onPress={() => onAplyFilters(createQuery())}
                />
                <Dialog.Button title="CANCELAR" onPress={onCloseModal} />
            </Dialog.Actions>
        );
    }

    const Description = () => {
        return (
            <>
                <Text>Inicio</Text>
                <DatePicker
                    mode="date"
                    onDateChange={(date) => setStartDate(date)}
                    maximumDate={endDate}
                    minimumDate={new Date("2000-01-01")}
                    date={startDate}
                />
                <Text>Final</Text>
                <DatePicker
                    mode="date"
                    onDateChange={(date) => setEndDate(date)}
                    date={endDate}
                    maximumDate={new Date()}
                    minimumDate={new Date("2000-01-01")}
                />
            </>);
    }

    return (
        <Modal
            actions={<ActionButtons />}
            description={<Description />}
            title="Filtros"
            visible={visible}>

        </Modal>
    )
}

export default ModalFilters;