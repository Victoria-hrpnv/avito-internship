import React, {FC, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Flex, Form, Input, Modal, Select, Typography} from "antd";
import taskStore, {Tasks} from "../../store/TaskStore.ts";
import TextArea from "antd/es/input/TextArea";
import {Link} from "react-router-dom";
const {Title} = Typography;

interface FormValues {
    title: string,
    description: string,
    boardId: number,
    priority: 'High' | 'Medium' | 'Low',
    status: 'Backlog' | 'InProgress' | 'Done',
    assigneeId: number;
}

const Popup:FC = observer(() => {
    const [form] = Form.useForm<FormValues>();
    useEffect(() => {
        if (taskStore.modalIsOpen) {
            form.setFieldsValue(taskStore.modalData);
        }
    }, [taskStore.modalIsOpen, taskStore.modalData]);

    const updateTask = async () => {
        try {
            await form.validateFields();
            if (!taskStore.isEdit) {
                await taskStore.fetchCreateTask();
                await taskStore.fetchTask();

            } else {
                await taskStore.fetchUpdateTask(taskStore.modalData.id);
            }
            taskStore.closeModal();
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

    const handleInputChange = <K extends keyof Tasks>(field: K,value:Tasks[K]) => {
        taskStore.setModalData({
            ...taskStore.modalData,
            [field]: value,
        } as Partial<Tasks>);
    };

    return (
        <Modal
            open={taskStore.modalIsOpen}
            onCancel={() => taskStore.closeModal()}
            footer={[
                taskStore.openIssues &&
                <Button key="navigate" type="primary"
                        onClick={() => taskStore.closeModal()}>
                    <Link to={`/board/${taskStore.modalData?.boardId}`}>Перейти на доску</Link>
                </Button>,
                <Button key="submit" type="primary"
                        onClick={()=> updateTask()}>
                    {taskStore.isEdit ? 'Обновить' : 'Создать'}
                </Button>,]}>

            <Title
                level={2}>{taskStore.isEdit ? 'Редактирование задачи' : "Создание задачи"}</Title>
            <Form form={form}>
            <Flex vertical >
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: 'Введите название задачи' }]}>
                <Input value={taskStore.modalData?.title}
                       onChange={(e) => handleInputChange('title', e.target.value)}
                       placeholder="Название"/>
                </Form.Item>

                <Form.Item
                    name="description"
                    rules={[{ required: true, message: 'Введите описание задачи'}]}>
                    <TextArea value={taskStore.modalData?.description} rows={4}
                              placeholder="Описание" maxLength={500}
                              onChange={(e) => handleInputChange('description', e.target.value)}/>
                </Form.Item>

                <Form.Item
                    name="boardId"
                    rules={[{ required: true, message: 'Выберите проект'}]}>
                    <Select
                        disabled={taskStore.isEdit}
                        value={taskStore.isEdit ? taskStore.modalData?.boardId : null}
                        placeholder="Проект"
                        options={taskStore.boards.map((board) => (
                            {value: board.boardId, label: board.name}))}
                        onChange={(value) => handleInputChange('boardId', value)}/>
                </Form.Item>

                <Form.Item
                    name="priority"
                    rules={[{ required: true, message: 'Выберите приоритет задачи' }]}>
                    <Select
                        value={taskStore.isEdit ? taskStore.modalData?.priority : null}
                        placeholder="Приоритет"
                        options={[
                            {value: "High", label: "High"},
                            {value: "Low", label: "Low"},
                            {value: "Medium", label: "Medium"},
                        ]}
                        onChange={(value) => handleInputChange('priority', value)}/>
                </Form.Item>
                <Form.Item
                    name="status"
                    rules={[{ required: true, message: 'Выберите статус задачи' }]}>
                    <Select
                        value={taskStore.isEdit ? taskStore.modalData?.status : null}
                        placeholder="Статус"
                        options={[
                            {value: "Backlog", label: "Backlog"},
                            {value: "InProgress", label: "In Progress"},
                            {value: "Done", label: "Done"},
                        ]}
                        onChange={(value) => handleInputChange('status', value)}/>
                </Form.Item>
                <Form.Item
                    name="assigneeId"
                    rules={[{ required: true, message: "Выберите исполнителя задачи" }]}>
                    <Select
                        value={taskStore.modalData?.assigneeId || undefined}
                        placeholder="Исполнитель"
                        options={taskStore.users.map((user) => (
                            { value: user.id, label: user.fullName }
                        ))}
                        onChange={(value) => {
                            handleInputChange('assigneeId', value);
                        }}
                    />
                </Form.Item>
            </Flex>
            </Form>
        </Modal>
    );
});

export default Popup;