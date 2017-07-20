import React, {Component} from 'react';
import {Row, Col} from 'antd'
import Left from './component/left/left'
import Middle from './component/middle/middle'
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

export default App;
