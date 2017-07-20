import React, {Component} from 'react';
import {Row, Col} from 'antd'
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Left from './component/left/left'
import Right from './component/right/right'
import './App.css';
class App extends Component {
    render() {
        return (
            <Row>
                <Col span={3}>
                    <Left/>
                </Col>
                <Col span={21}>
                    <Right/>
                </Col>
            </Row>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);
