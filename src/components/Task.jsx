import moment from 'moment';
import 'moment/locale/pt-br';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import common from '../../assets/styles/common';
import Swipeable from 'react-native-gesture-handler/Swipeable'

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

export default function Task({ task, toggleTask, onDelete }) {
    const date = task.doneAt ? task.doneAt : task.estimateAt
    const formattedDate = moment(date).locale('pt-br').format('dddd, D [de] MMMM')

    const getRightActions = () => {
        return (
            <TouchableOpacity
                onPress={() => onDelete && onDelete(task.id)}
                style={styles.right}
                activeOpacity={0.7}
            >
                <Icon name='trash' size={30} color='white' />
            </TouchableOpacity>
        )
    }

    const getLeftActions = () => {
        return (
            <View style={styles.left} activeOpacity={0.7}>
                <Icon name='trash' size={20} color='white' style={styles.excludeIcon} />
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }

    return (
        <Swipeable
            renderRightActions={getRightActions}
            renderLeftActions={getLeftActions}
            onSwipeableLeftOpen={() => onDelete && onDelete(task.id)}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => toggleTask(task.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(task.doneAt)}
                    </View>
                </TouchableWithoutFeedback>

                <View style={{ width: '80%' }}>
                    <Text
                        style={[styles.desc, task.doneAt ? { textDecorationLine: 'line-through' } : {}]}>
                        {task.desc + ""}
                    </Text>
                    <Text
                        style={styles.date}>
                        {formattedDate}
                    </Text>
                </View>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'white'
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
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    excludeText: {
        fontFamily: common.fontFamily,
        color: 'white',
        fontSize: 20,
        margin: 20
    },
    excludeIcon: {
        marginLeft: 10
    }
});