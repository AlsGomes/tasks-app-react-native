import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import todayImage from '../../assets/imgs/today.jpg';
import moment from 'moment'
import 'moment/locale/pt-br'
import common from '../../assets/styles/common';
import Task from '../components/Task';

export default function TaskList() {
    const today = moment().locale('pt-br').format('dddd, D [de] MMMM')

    return (
        <View style={styles.container}>
            <ImageBackground source={todayImage} style={styles.background}>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
            </ImageBackground>

            <View style={styles.taskList} >
                <Task
                    desc={'Comprar Livro'}
                    estimateAt={new Date()}
                    doneAt={new Date()}
                />
                <Task
                    desc={'Ler Livro'}
                    estimateAt={new Date()}
                    doneAt={null}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontFamily: common.fontFamily,
        color: common.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: common.fontFamily,
        color: common.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    background: {
        flex: 3,
        width: '100%',
        height: '100%'
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    }
});