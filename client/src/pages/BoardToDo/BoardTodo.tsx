import {observer} from "mobx-react-lite";
import {useQuery} from 'react-query';
import boardsStore from "../../store/BoardsStore.ts";
import {Button, Card, Col, Layout, List, Row, Skeleton} from "antd";
import styles from './BoardToDo.module.css'
import {Typography} from 'antd';
import {Link, useParams} from "react-router-dom";


const {Title} = Typography;
const {Content} = Layout;


const BoardsTodo = observer(() => {
    const {id} = useParams<{ id: string }>();
    console.log(id)
    const boardName: string = boardsStore.getBoardName(id);
    const {
        isLoading,
        error
    } = useQuery(['todos', id], () => boardsStore.fetchTodos(id), {
        onSuccess: (response) => {
            boardsStore.setTodos(response.data);
        },
    });
    console.log(boardsStore.todos)


    if (isLoading) {
        return (
            <Skeleton className={styles.skeleton} active/>
        )

    }
    if (error instanceof Error) {
        return <div>Ошибка: {error.message}</div>;
    }

    return (

        <Content className={styles.content}>
            <Title level={2}>{boardName}</Title>
            <Row className={styles.col}>

                <Col span={8}>
                    <Card bordered='false'
                        type="inner" title='To do'>
                        <List
                              dataSource={boardsStore.todos}
                              renderItem={item => (
                                  item.status == 'Backlog' &&
                                  <List.Item>
                                      <Card title={item.title}>
                                          {item.description}
                                      </Card>
                                  </List.Item>
                              )}/>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card type="inner" title='In progress'>
                        <List
                              dataSource={boardsStore.todos}
                              renderItem={item => (
                                  item.status == 'InProgress' &&
                                  <List.Item>
                                      <Card title={item.title}>
                                          {item.description}
                                      </Card>
                                  </List.Item>
                              )}/>
                     </Card>
                </Col>

                <Col span={8}>
                    <Card type="inner" title='Done'>
                        <List
                              dataSource={boardsStore.todos}
                              renderItem={item => (
                                  item.status == 'Done' &&
                                  <List.Item>
                                      <Card title={item.title}>
                                          {item.description}
                                      </Card>
                                  </List.Item>
                              )}/>
                    </Card></Col>
            </Row>
        </Content>
    )
})

export default BoardsTodo