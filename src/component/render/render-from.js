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
            cell: -1,
            level: -1,
            countLevel: 0,
            formData: null
        }
    }

    componentDidMount() {
        pubsub.subscribe('RENDER_FORM_JS_UPDATE_FROM', (msg, {cell, level, countLevel, formData}) => {
            console.log(formData);
            this.setState({cell, level, countLevel, formData});
        })
    }

    componentWillUnmount() {
        pubsub.unsubscribe('RENDER_FORM_JS_UPDATE_FROM');
    }

    _renderChild() {
        // return <FormImg level={this.state.level} cell={this.state.type}/>;
        if (this.state.cell > 0) {
            return <FormImg key={this.state.cell} level={this.state.level} cell={this.state.cell} formData={this.state.formData}/>
        }

        if (this.state.cell === 0) {
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

