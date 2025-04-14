import './App.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import Boards from "./pages/Boards/Boards.tsx";
import Issues from "./pages/Issues/Issues.tsx";
import BoardTodo from "./pages/BoardToDo/BoardTodo.tsx";
import {observer} from "mobx-react-lite";
import taskStore from "./store/TaskStore.ts";
import {useEffect} from "react";





const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <h1>404 Not Found</h1>,
        children: [
            {
            path: '/',
            element:   <Navigate to="/boards" replace />
             },
            {
                path: '/boards',
                element:   <Boards />
            },
            {
                path: '/board/:id',
                element: <BoardTodo />,
            },

            {
                path: '/issues',
                element:   <Issues />
            },


        ]
    }
]);



const App = observer(() =>{
    useEffect(()=>{
        const fetchData = async () => {
            try {
                await taskStore.fetchBoards()
                await taskStore.fetchTask()
                await taskStore.fetchUser();
            } catch (error) {
                console.error("Ошибка при загрузке данных", error);
            }
        };

        fetchData();
    },[])

  return (
                <RouterProvider router={router} />
)
})

export default App
