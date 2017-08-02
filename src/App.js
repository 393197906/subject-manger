import React, {Component} from 'react';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom'
import {Row, Col} from 'antd'
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Left from './component/left/left'
import Right from './component/right/right'
import Main from './component/main/main'
import 'antd/dist/antd.css';
import './App.css';

class Root extends Component {
    render() {
        return (
            <Row>
                <Col span={4}>
                    <Left/>
                </Col>
                <Col span={20}>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/:id" component={Right}/>
                </Col>
            </Row>
        );
    }
}

const App = () => (
    <Router><Root/></Router>
)

export default DragDropContext(HTML5Backend)(App);
