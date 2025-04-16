import taskStore, {Tasks} from "../../store/TaskStore.ts";
import {
    Avatar,
    Button,
    Card,
    Flex,
    Input,
    Layout,
    List,
    Select,
    Skeleton,
} from "antd";
import {Typography} from 'antd';
import styles from './Issues.module.css'
import {observer} from "mobx-react-lite";
import {FC, useState} from "react";

const { Meta } = Card;
const {Title} = Typography;
const {Content} = Layout;
const { Search } = Input;

type StatusFilter = "Backlog" | "InProgress" | "Done" | undefined;
type BoardFilter = string | undefined;

const Issues:FC = observer(() => {
    const [searchValue, setSearchValue] = useState<string>(""); //  поиск
    const [statusFilter, setStatusFilter] = useState<StatusFilter>(); // Фильтр по статусу
    const [boardFilter, setBoardFilter] = useState<BoardFilter>(); // Фильтр по доске
    const editModal = (item: Tasks | null) => {
        if (item) {
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
        taskStore.openModal({ edit: item, issues: !!item});
    };
    const onSearch = (value: string) => {
        setSearchValue(value.toLowerCase());
    };

    const handleStatusChange = (value: StatusFilter) => {
        setStatusFilter(value);
    };

    const handleBoardChange = (value: BoardFilter) => {
        setBoardFilter(value);
    };

    if (taskStore.isLoading) {
        return <Skeleton className={styles.skeleton} active />;
    }


    const filteredTasks = taskStore.tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchValue);
        const matchesStatus = statusFilter ? task.status === statusFilter : true;
        const matchesBoard = boardFilter ? task.boardId === Number(boardFilter) : true;
        return matchesSearch && matchesStatus && matchesBoard;
    });

    return (
        <Content className={styles.content}>
            <Title level={2}>{"Все задачи"}</Title>
            <Flex justify={"space-between"}>
                <Search
                    placeholder="Введите название задачи"
                    onSearch={onSearch}
                    style={{ width: 300, marginBottom: "20px" }}
                />
                <Flex gap={20}>
                    <Select
                        allowClear
                        placeholder="Фильтр по статусу"
                        style={{ width: 300 }}
                        onChange={handleStatusChange}
                        options={[
                            { value: "Backlog", label: "Backlog" },
                            { value: "InProgress", label: "In Progress" },
                            { value: "Done", label: "Done" },
                        ]}/>
                    <Select
                        allowClear
                        placeholder="Фильтр по доске"
                        style={{ width: 300 }}
                        onChange={handleBoardChange}
                        options={taskStore.boards.map((board) => (
                            {value: board.boardId, label: board.name}))}/>
                </Flex>
            </Flex>

            <Card className={styles.card}>
                <List split={false} grid={{ column: 1 }}>
                    {filteredTasks.map((item) => (
                        <List.Item
                            key={item.id}
                            onClick={() => editModal(item)}
                            style={{ width: "100%" }}>
                            <Card style={{ width: "100%" }} hoverable>
                                <Meta
                                    avatar={<Avatar src={item.assignee.avatarUrl} />}
                                    title={item.title}
                                    description={item.description}
                                />
                            </Card>
                        </List.Item>
                    ))}
                </List>
            </Card>
            <Button
                className={styles.button}
                type="primary"
                onClick={() => editModal(null)}>
                Создать задачу
            </Button>
        </Content>
    )


})

export default Issues