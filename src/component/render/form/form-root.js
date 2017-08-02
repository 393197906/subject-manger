import React, {Component} from 'react';
import {Button, Form, Icon, Modal} from 'antd';
import pubsub from 'pubsub-js'
import '../render.css'
const confirm = Modal.confirm;
const FormItem = Form.Item;


export default class FormRoot extends Component {
    constructor(props) {
        super(props);
    }

    _moveUp() {
        pubsub.publish('RENDER_PHONE_JS_LAYOUT_PHONE', {level: this.props.level, direction: 'up'});
        this.props.changeLevel(this.props.level ? this.props.level - 1 : 0);
    }

    _moveDown() {
        pubsub.publish('RENDER_PHONE_JS_LAYOUT_PHONE', {level: this.props.level, direction: 'down'});
        this.props.changeLevel(this.props.level === this.props.countLevel - 1 ? this.props.level : this.props.level + 1);
    }

    _remove() {
        const level = this.props.level;
        confirm({
            title: '删除确认?',
            content: '确定要删除吗？',
            onOk() {
                pubsub.publish('RENDER_PHONE_JS_REMOVE_OF_PHONE', {level})
            },
        });
    }

    render() {
        return (
            <div>
                <FormItem label="排序" layout="vertical">
                    <Button.Group size="large">
                        <Button type="primary" onClick={this._moveUp.bind(this)}>
                            <Icon type="up"/>上移
                        </Button>
                        <Button type="primary" onClick={this._moveDown.bind(this)}>
                            下移<Icon type="down"/>
                        </Button>
                    </Button.Group>
                </FormItem>
                <FormItem label="删除" layout="vertical">
                    <Button type="danger" size="large" onClick={this._remove.bind(this)}><Icon
                        type="delete"/>删除</Button>
                </FormItem>
            </div>
        );
    }
}

