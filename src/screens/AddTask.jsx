import React, { useState } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    Text,
    Platform
} from 'react-native';
import common from '../../assets/styles/common';
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

export default function AddTask({ isVisible, onCancel, saveTask }) {

    const [desc, setDesc] = useState('')
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePIcker] = useState(false)

    defaultState = () => {
        setDesc('')
        setDate(new Date())
    }

    onSave = () => {
        saveTask && saveTask({ desc, date })
        defaultState()
    }

    getDatePicker = () => {
        let datePicker =
            <DateTimePicker
                value={date}
                onChange={(_, newDate) => {
                    setDate(newDate)
                    setShowDatePIcker(false)
                }}
                mode='date'
            />

        const dateString = moment(date).format('dddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => setShowDatePIcker(true)}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
    }

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={onCancel}
            animationType='slide'
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>

            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Informe a Descrição...'
                    value={desc}
                    onChangeText={newValue => setDesc(newValue)}
                />

                {getDatePicker()}

                <View style={styles.buttons}>
                    <TouchableOpacity onPress={onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onSave}>
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: common.fontFamily,
        backgroundColor: common.colors.today,
        color: common.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: common.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6,
        padding: 5
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: common.colors.today
    },
    date: {
        fontFamily: common.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
});