import AsyncStorage from '@react-native-async-storage/async-storage'

export async function loadTasks() {
    const data = await AsyncStorage.getItem('@tasks:tasks')
    const tasksLoaded = data ? JSON.parse(data) : []
    return tasksLoaded
}

export async function saveTask(newTask) {
    const tasks = await loadTasks();

    tasks.push(newTask)
    await AsyncStorage.setItem('@tasks:tasks',
        JSON.stringify(tasks))
}

export async function excludeTask(taskId) {
    const tasks = await loadTasks()
    const newList = tasks.filter(t => t.id !== taskId)
    await AsyncStorage.setItem('@tasks:tasks', JSON.stringify(newList))
}

export async function updateTask(task) {
    const tasks = await loadTasks()

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === task.id) {
            tasks[i] = task
            break
        }
    }

    await AsyncStorage.setItem('@tasks:tasks', JSON.stringify(tasks))
}

async function removeByKey() {
    await AsyncStorage.removeItem('@tasks:tasks')
}

export async function setShowDoneTasksState(state) {
    await AsyncStorage.setItem('@tasks:showDoneTasksState', JSON.stringify(state === true ? 'true' : 'false'))
}

export async function getShowDoneTasksState() {
    let data = await AsyncStorage.getItem('@tasks:showDoneTasksState')
    data = JSON.parse(data)
    return data === 'true' ? true : false
}