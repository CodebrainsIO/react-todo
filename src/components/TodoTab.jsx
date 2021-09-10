import React, { useEffect } from 'react'
import { Tabs, Layout, Row, Col, List } from 'antd';
const { TabPane } = Tabs;

const TodoTab = ({ todos }) => {
    return (
        <><List
            locale={{
                emptyText: "There's nothing to do :(",
            }}
            dataSource={todos}
            renderItem={(todo) => (
                <li key={todo.id}>Title: {todo.title} | Complete: {todo.completed.toString()}</li>
            )}
            pagination={{
                position: 'bottom',
                pageSize: 10,
            }} /></>
    )
}

export default TodoTab
