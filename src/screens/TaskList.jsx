import moment from 'moment';
import 'moment/locale/pt-br';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import todayImage from '../../assets/imgs/today.jpg';
import common from '../../assets/styles/common';
import Task from '../components/Task';
import AddTask from './AddTask';
import { loadTasks, saveTask, excludeTask, updateTask, setShowDoneTasksState, getShowDoneTasksState } from '../libs/storage'

export default function TaskList() {
    const today = moment().locale('pt-br').format('dddd, D [de] MMMM');

    const [tasks, setTasks] = useState([]);
    const [visibleTasks, setVisibleTasks] = useState(tasks)
    const [showDoneTasks, setShowDoneTasks] = useState();
    const [icon, setIcon] = useState('eye');
    const [showAddTask, setShowAddTask] = useState(false)

    useEffect(() => {
        loadStorageTasks();
        getShow();
    }, [])

    useEffect(() => {
        setIcon(showDoneTasks ? 'eye' : 'eye-slash')
        setVisibleTasks(showDoneTasks ? tasks : visibleTasks.filter(t => t.doneAt == null))
        setShowDoneTasksState(showDoneTasks)
    }, [showDoneTasks])

    useEffect(() => {
        setVisibleTasks(showDoneTasks ? tasks : tasks.filter(t => t.doneAt == null))
    }, [tasks])

    async function loadStorageTasks() {
        const tasksLoaded = await loadTasks();
        setTasks(tasksLoaded);
    }

    async function getShow() {
        const show = await getShowDoneTasksState()
        setShowDoneTasks(show)
    }

    toggleTask = taskId => {
        const clonedTasks = [...tasks]
        const editedTask = clonedTasks.filter(t => t.id === taskId)
        if (editedTask.length != 0) {
            const toUpdateTask = editedTask[0]
            toUpdateTask.doneAt = toUpdateTask.doneAt ? null : new Date()
            updateTask(toUpdateTask)
            setTasks(clonedTasks)
        }
    }

    deleteTask = taskId => {
        if (!taskId) return
        const clonedTasks = tasks.filter(t => t.id !== taskId)
        excludeTask(taskId)
        setTasks(clonedTasks)
    }

    addTask = ({ desc, date }) => {
        const validTask = desc && date && desc.trim().length != 0

        if (!validTask) {
            Alert.alert('Ops!', 'Você precisa preencher a descrição e informar uma data válida')
            return false
        }

        const newTask = {
            id: Math.random(),
            desc: desc,
            estimateAt: date,
            doneAt: null
        }

        saveTask(newTask)

        const clonedTasks = [...tasks]
        clonedTasks.push(newTask)
        setTasks(clonedTasks)

        setShowAddTask(false)
    }

    return (
        <View style={styles.container}>
            <AddTask
                isVisible={showAddTask}
                onCancel={() => setShowAddTask(false)}
                saveTask={addTask}
            />

            <ImageBackground source={todayImage} style={styles.background}>
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={() => setShowDoneTasks(!showDoneTasks)}>
                        <Icon name={icon} size={20} color={common.colors.secondary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
            </ImageBackground>

            <View style={styles.taskList} >
                <FlatList
                    data={visibleTasks}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <Task
                            task={item}
                            toggleTask={toggleTask}
                            onDelete={deleteTask}
                        />
                    )}
                />
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddTask(true)}
                activeOpacity={0.7}
            >
                <Icon name='plus' size={20} color={common.colors.secondary} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
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
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: 50
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: common.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
});