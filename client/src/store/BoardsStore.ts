import {makeAutoObservable} from "mobx";
import {constructor} from "@typescript-eslint/eslint-plugin";


export interface Board {
    id: string,
    name: string,
    description: string,
    taskCount: number
}

export interface Todos {
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
    }
}

class BoardsStore {
    boards: Board[] = []
    todos:Todos[] = []

    constructor() {
        makeAutoObservable(this)
    }


    fetchBoards = async () => {
        const response = await fetch('http://localhost:8080/api/v1/boards', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };

    setBoards(newBoards: Board[]) {
        this.boards = newBoards;
    }

    getBoardName (id:string) : string{
        const board = this.boards.find((board) => board.id == id);
        return board ? board.name : 'Доска не найдена';
    }

    fetchTodos = async (id:string) => {
        const response = await fetch(`http://localhost:8080/api/v1/boards/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };
    setTodos(newTodos: Todos[]) {
        this.todos = newTodos;
    }

}
export default new BoardsStore()