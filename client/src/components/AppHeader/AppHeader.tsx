import {Button, Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import styles from './AppHeader.module.css'
import taskStore from "../../store/TaskStore.ts";
import {observer} from "mobx-react-lite";
import Popup from "../Popup/Popup.tsx";


const { Header } = Layout;

const AppHeader = observer(() => {
    const menuItems = [
        { key: '1', label: <Link to="/boards">Проекты</Link>, path:'/boards' },
        { key: '2',  label: <Link to="/issues">Все задачи</Link>, path:'/issues'},
    ];
    const editModal = (item) => {
        if (item) {
            // Редактирование существующей задачи
            taskStore.setModalData({
                id: item.id,
                title: item.title,
                description: item.description,
                priority: item.priority,
                assigneeId: item.assignee?.id,
                boardId: item.boardId,
                status: item.status
            });
        } else {
            // Создание новой задачи - сбрасываем данные
            taskStore.setModalData({
                id: undefined,
                title: undefined,
                description: undefined,
                priority: undefined,
                assigneeId: undefined,
                boardId: undefined,
                status: undefined
            });
        }
        taskStore.openModal({ edit: item, issues: !!item});
    };

    const selectedKey = menuItems.find(item => item.path === location.pathname)?.key || '1'
    return (<>
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
                    <Button type="primary" onClick={() => editModal(null)}>Создать задачу</Button>
                </div>
            </Header>
        </>
    );
});

export default AppHeader;