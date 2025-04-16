import {Button, Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import styles from './AppHeader.module.css'
import taskStore from "../../store/TaskStore.ts";
import {observer} from "mobx-react-lite";
import Popup from "../Popup/Popup.tsx";
import {FC} from "react";


const { Header } = Layout;

interface MenuItem {
    key: string;
    label: React.ReactNode;
    path: string;
}

const AppHeader:FC = observer(() => {
    const menuItems: MenuItem[] = [
        { key: '1', label: <Link to="/boards">Проекты</Link>, path:'/boards' },
        { key: '2',  label: <Link to="/issues">Все задачи</Link>, path:'/issues'},
    ];
    const editModal = () => {
            taskStore.setModalData({
                id: undefined,
                title: undefined,
                description: undefined,
                priority: undefined,
                assigneeId: undefined,
                boardId: undefined,
                status: undefined
            });
        taskStore.openModal({ edit: false, issues: false});
    };

    const selectedKey:string = menuItems.find(item => item.path === location.pathname)?.key || '1'
    return (
        <>
        <Popup />
            <Header className={styles.header}>
                <div className={styles.header_menu}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[selectedKey]}
                        style={{flexGrow: 1}}
                        items={menuItems}
                    />
                    <Button type="primary" onClick={() => editModal()}>Создать задачу</Button>
                </div>
            </Header>
        </>
    );
});

export default AppHeader;