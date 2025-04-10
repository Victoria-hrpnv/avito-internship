import { observer } from "mobx-react-lite";
import { useQuery } from 'react-query';
import boardsStore from "../../store/BoardsStore.ts";
import {Button, Card, Layout, List, Skeleton} from "antd";
import styles from './Boards.module.css'
import { Typography } from 'antd';
import {Link} from "react-router-dom";


const { Title } = Typography;
const {Content} = Layout;

const Boards = observer(() => {
    const {isLoading, error } = useQuery("boards", boardsStore.fetchBoards, {
        onSuccess: (response) => {
            boardsStore.setBoards(response.data);
        },
    });

    if (isLoading) {
        return(

            <Skeleton className={styles.skeleton} active />
            )

    }
    if (error instanceof Error) {
        return <div>Ошибка: {error.message}</div>;
    }

    return (
        <Content className={styles.content}>
            <Title  level={2}>Список проектов</Title>
            <List grid={{ column: 1}}
                  dataSource={boardsStore.boards}
                  renderItem={item => (
                      <List.Item>
                          <Card
                              title={item.name}
                              extra={ <Button > <Link to = {`/board/${item.id}`}>Перейти к доске</Link></Button>}>
                              {item.description}
                              <p>Количество задач: {item.taskCount}</p>
                          </Card>
                      </List.Item>
                  )}/>
        </Content>
    )
})

export default Boards