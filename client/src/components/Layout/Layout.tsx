import {Outlet} from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader.tsx";


const Layout = () => {
    return (
        <>
            <AppHeader />
            <Outlet />
        </>
    )

}

export default Layout