import React, { useEffect, useState, useCallback } from 'react'
import { Tabs, Layout, Row, Col, Input } from 'antd';
import './TodoList.css';
import TodoTab from './TodoTab';
import TodoForm from './TodoForm';
const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

function callback(key) {
    console.log(key);
}

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [activeTodos, setActiveTodos] = useState([]);
    const [completeTodos, setCompleteTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [filteredTodos, setFilteredTodos] = useState([]);

    const onTabChange = useCallback(
        (key) => {
            console.log(key);
            
            let displayTodos = todos;
            switch (key) {
                case 'all':
                    setFilter(key);
                    setFilteredTodos(displayTodos);
                    break;
                case 'active':
                    setFilter(key);
                    displayTodos = todos.filter(todo => todo.completed === false);
                    setFilteredTodos(displayTodos);
                    break;
                case 'complete':
                    setFilter(key);
                    displayTodos = todos.filter(todo => todo.completed === true);
                    setFilteredTodos(displayTodos);
                    break;
                default: break;
            }
        },
        [],
    )
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                setTodos(json);
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
                            <TodoForm />
    <br />
                            <Tabs defaultActiveKey="all" onChange={onTabChange}>
                                <TabPane tab="All" key="all">
                                    Content of Tab Pane 1
                                </TabPane>
                                <TabPane tab="Active" key="active">
                                    <TodoTab todos={todos}/>
                                </TabPane>
                                <TabPane tab="Complete" key="complete">
                                    Content of Tab Pane 3
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
