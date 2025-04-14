import {observer} from "mobx-react-lite";
import {Avatar, Card, Col, Layout, List, Row, Skeleton,} from "antd";
import styles from './BoardToDo.module.css'
import {Typography} from 'antd';
import { useParams} from "react-router-dom";
import taskStore from "../../store/TaskStore.ts";

const { Meta } = Card;
const {Title} = Typography;
const {Content} = Layout;

const BoardsTodo = observer(() => {
    const { id } = useParams<{ id: string }>();
    const boardName: string = taskStore.getBoardName(id);

    if (taskStore.isLoading) {
        return <Skeleton className={styles.skeleton} active />;
    }
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
        taskStore.openModal({ edit: item, issues: false});
    };


    return (

        <Content className={styles.content}>
            <Title level={2}>{boardName}</Title>
            <Card
                headStyle={{ padding: 0, backgroundColor: 'rgba(22, 119, 255, 0.7)', color: 'white' }}
                title={
                    <Row style={{ textAlign: "center" }}>
                        {['To do', 'In progress', 'Done'].map((title) => (
                            <Col span={8} key={title}>{title}</Col>
                        ))}
                    </Row>}>
                {['Backlog', 'InProgress', 'Done'].map((status) => (
                    <Card.Grid
                        key={status}
                        className={styles.card_grid}
                        hoverable={false}>
                        <List split={false}>
                            {taskStore.tasks
                                .filter(item => item.status === status
                                    && item.boardName === boardName //Хотела по айди, но они отличаются (при запросе Boards у доски "Редизайн карточки товара id = 1", при запросе tasks c этим же названием -  "boardId": 0,)
                                )
                                .map(item => (
                                    <List.Item onClick={()=>editModal(item)} key={item.id}>
                                        <Card hoverable = {true} className={styles.card}>
                                            <Meta
                                                avatar={<Avatar src={item.assignee.avatarUrl} />}
                                                title={item.title}
                                                description={item.description}/>
                                        </Card>
                                    </List.Item>
                                ))}
                        </List>
                    </Card.Grid>
                ))}
            </Card>
        </Content>
    )


})

export default BoardsTodo