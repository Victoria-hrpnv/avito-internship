import { makeAutoObservable, } from "mobx";


export interface Board {
    boardId: string,
    name: string,
    description: string,
    taskCount: number
}

export interface Tasks {
    id: number,
    title: string,
    description: string,
    priority: string,
    status: 'InProgress' | 'Backlog' | 'Done',
    assignee: {
        id: number,
        fullName: string,
        email: string,
        avatarUrl: string
    },
    boardId: number,
    boardName: string
}

export interface User {
    id: number,
    fullName: string,
    email: string,
    description: string,
    avatarUrl: string,
    teamId: number,
    teamName: string,
    tasksCount: number
}

export interface Data {
    id?:number,
    title?: string,
    description?: string,
    priority?: string,
    assigneeId?: number,
    boardId?: number,
    status?: string
}

class TaskStore {
    boards: Board[] = []
    tasks: Tasks[] = []
    users: User[] = []
    isLoading:boolean =false;
    modalData: Data = {};
    modalIsOpen = false;
    isEdit: boolean = false;
    openIssues:boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    openModal(payload:{ edit, issues}) {
        console.log(this.modalData)
        this.isEdit = payload.edit;
        this. openIssues = payload.issues;
        this.modalIsOpen = true;
    }

    closeModal() {
        this.modalIsOpen = false;

    }
    setModalData(data: Partial<typeof this.modalData>) {
        this.modalData = { ...this.modalData, ...data };
    }

    fetchUser = async () => {
        this.isLoading = true;
        try {
            const response = await fetch('http://localhost:8080/api/v1/users', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            this.users = data.data;
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
        }
        finally {
            this.isLoading=false
        }
    };

    fetchTask = async () => {
        this.isLoading = true;
        const response = await fetch('http://localhost:8080/api/v1/tasks', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json()
        this.tasks = data.data
        this.isLoading = false;
    };

    //Создание и обновление задач
     fetchCreateTask = async ()=> {
        const data:Data ={
            assigneeId: this.modalData.assigneeId,
            boardId: this.modalData.boardId,
            description: this.modalData.description,
            priority: this.modalData.priority,
            title: this.modalData.title
        }
         console.log(JSON.stringify(data))
        try {
                const response = await fetch('http://localhost:8080/api/v1/tasks/create', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                if (!response.ok) {
                    throw new Error('Ошибка при создании задачи');
                }
                const responseData = await response.json();
                console.log('Задача успешно создана:', responseData );
            }
        catch (error) {
            console.error('Ошибка при отправке запроса:', error);
         }
    }

    fetchUpdateTask = async (id: number | undefined)=> {
        const data:Data ={
            assigneeId: this.modalData.assigneeId,
            description: this.modalData.description,
            priority: this.modalData.priority,
            title: this.modalData.title,
            status: this.modalData.status,
        }
        try {
            const response = await fetch(`http://localhost:8080/api/v1/tasks/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error('Ошибка при создании задачи');
            }
            const responseData = await response.json();
            console.log('Задача успешно обновлена:', responseData );
            const taskIndex = this.tasks.findIndex((task) => task.id === id);
            if (taskIndex !== -1) {
                this.tasks[taskIndex] = <Tasks>{...this.tasks[taskIndex], ...data}; // Обновляем только изменённые свойства
            }
        }
        catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }


    fetchUpdateStatusTask = async (id:number)=> {
        const data:Data ={
            status: this.modalData.status,
        }

        try {
            const response = await fetch(`http://localhost:8080/api/v1/tasks/updateStatus/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error('Ошибка при создании задачи');
            }
            const responseData = await response.json();
            console.log('Задача успешно обновлена:', responseData );
        }
        catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }
  //доски
    fetchBoards = async () => {
        this.isLoading = true;
        const response = await fetch('http://localhost:8080/api/v1/boards', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json()
        this.boards = data.data
        this.isLoading=false
    };


    getBoardName (id:string) : string{
        const board = this.boards.find((board) => board.boardId == id);
        return board ? board.name : 'Доска не найдена';
    }

}

export default new TaskStore()