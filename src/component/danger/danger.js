import React, {Component} from 'react';
import {Card, Button, Modal, Message} from 'antd';
import pubsub from 'pubsub-js'
import API from '../../service/service'

const confirm = Modal.confirm;

export default class Danger extends Component {
    _remove() {
        const {subject_id, goback} = this.props;
        confirm({
            title: '删除确认',
            content: '确定要删除该专题吗',
            onOk() {
                return API.remove_subject({subject_id}).then((result) => {
                    Message.success('专题删除成功');
                    pubsub.publish('LEFT_UPDATE');
                    goback();
                }).catch((err) => {
                    Message.error(err);
                })
            },
        });
    }

    render() {
        return (
            <Card title="删除专题">
                <Button type="danger" onClick={this._remove.bind(this)}>删除</Button>
            </Card>
        );
    }
}

