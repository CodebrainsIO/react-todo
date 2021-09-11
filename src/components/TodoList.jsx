import React, { useEffect, useState, useCallback } from 'react'
import { Tabs, Layout, Row, Col, Input, message } from 'antd';
import './TodoList.css';
import TodoTab from './TodoTab';
import TodoForm from './TodoForm';
const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;


const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [activeTodos, setActiveTodos] = useState([]);
    const [completeTodos, setCompleteTodos] = useState([]);

    const handleFormSubmit = (todo) => {
        message.success('Todo added!');
    };

    const handleRemoveTodo = (todo) => {
        message.warn('Todo removed!');
    };

    const handleToggleTodoStatus = (todo) => {
        message.info('Todo state updated!');
    };

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                setTodos(json);
                setActiveTodos(json.filter(todo => todo.completed === false));
                setCompleteTodos(json.filter(todo => todo.completed === true));
            });
        console.log('fetch completed');
    }, []);

    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                <div className="todolist">
                    <Row>
                        <Col span={14} offset={5}>
                            <h1>Codebrains Todos</h1>
                            
                            <TodoForm onFormSubmit={handleFormSubmit}/>
                            <br />
                            <Tabs defaultActiveKey="all" >
                                <TabPane tab="All" key="all">
                                    <TodoTab todos={todos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                                <TabPane tab="Active" key="active">
                                    <TodoTab todos={activeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                                </TabPane>
                                <TabPane tab="Complete" key="complete">
                                    <TodoTab todos={completeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    )
}

export default TodoList
