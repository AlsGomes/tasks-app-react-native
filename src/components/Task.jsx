import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import common from '../../assets/styles/common';
import Icon from 'react-native-vector-icons/FontAwesome'

function getCheckView(doneAt) {
    if (doneAt) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='white'></Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pending}></View>
        )
    }
}

export default function Task(task) {
    return (
        <View style={styles.container}>
            <View style={styles.checkContainer}>
                {getCheckView(task.doneAt)}
            </View>
            <View style={{ width: '80%' }}>
                <Text style={styles.desc}>{task.desc + ""}</Text>
                <Text>{task.estimateAt + ""}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: common.fontFamily,
        color: common.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: common.fontFamily,
        color: common.colors.subText,
        fontSize: 12
    }
});