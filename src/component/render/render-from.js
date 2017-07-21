import React, {Component} from 'react';
import {Card, Button, Row, Col, Form, Input, Radio} from 'antd';
import pubsub from 'pubsub-js'
import './render.css'
import {FormRoot, FormImg} from './form'

const Help = (props) => (
    <Card title="操作说明">
        <ol>
            <li>1.点击组件标题选择根元素</li>
            <li>2.点击子元素选择子元素</li>
            <li>3.模块工具栏可用于拖曳</li>
        </ol>
    </Card>
);

export default class RenderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: -1,
            level: -1,
            countLevel: 0
        }
    }

    componentDidMount() {
        pubsub.subscribe('RENDER_FORM_JS_UPDATE_FROM', (msg, {cell, level, countLevel}) => {
            this.setState({type: cell, level, countLevel});
        })
    }

    componentWillUnmount() {
        pubsub.unsubscribe('RENDER_FORM_JS_UPDATE_FROM');
    }

    _renderChild() {
        if (this.state.type > 0) {
            return <FormImg level={this.state.level}/>
        }

        if (this.state.type === 0) {
            return <FormRoot level={this.state.level} countLevel={this.state.countLevel} changeLevel={(level) => {
                this.setState({level})
            }}/>
        }

        return <Help/>;
    }


    render() {
        return (
            <Form>
                {
                    this._renderChild()
                }
            </Form>

        );
    }
}
