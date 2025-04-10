import {Button, Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import styles from './AppHeader.module.css'

const { Header } = Layout;

const AppHeader = () => {
    const menuItems = [
        { key: '1', label: <Link to="/boards">Проекты</Link>, path:'/boards' },
        { key: '2',  label: <Link to="/issues">Все задачи</Link>, path:'/issues'},
    ];
    return (
            <Header className={styles.header}>
                <div className={styles.header_menu}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                        style={{flexGrow: 1}}
                        items={menuItems}
                    />
                    <Button type="primary">Создать задачу</Button>
                </div>
            </Header>
    );
};

export default AppHeader;