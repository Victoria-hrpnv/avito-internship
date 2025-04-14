import {observer} from "mobx-react-lite";
import {Button, Card, Layout, List, Skeleton} from "antd";
import styles from './Boards.module.css'
import {Typography} from 'antd';
import {Link} from "react-router-dom";
import taskStore from "../../store/TaskStore.ts";


const {Title} = Typography;
const {Content} = Layout;

const Boards = observer(() => {

    if (taskStore.isLoading) {
        return (<Skeleton className={styles.skeleton} active/>)
    }
    // if (error instanceof Error) {
    //     return <div>Ошибка: {error.message}</div>;
    // }

    return (
        <Content className={styles.content}>
            <Title level={2}>Список проектов</Title>
            <List grid={{column: 1}}
                  dataSource={taskStore.boards}
                  renderItem={item => (
                      <List.Item>
                          <Card
                              title={item.name}
                              extra={<Button> <Link to={`/board/${item.boardId}`}>Перейти
                                  к доске</Link></Button>}>
                              {item.description}
                              <p>Количество задач: {item.taskCount}</p>
                          </Card>
                      </List.Item>
                  )}/>
        </Content>
    )
})

export default Boards