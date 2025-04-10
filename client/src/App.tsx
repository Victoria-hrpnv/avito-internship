
import './App.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import Boards from "./pages/Boards/Boards.tsx";
import Issues from "./pages/Issues/Issues.tsx";
import BoardTodo from "./pages/BoardToDo/BoardTodo.tsx";




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



function App() {

  return (
                <RouterProvider router={router} />
)
}

export default App
