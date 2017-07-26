/**
 * Created by mr.xie on 2017/7/26.
 */
import React, {Component} from 'react';
import {Input, Button, Menu, Icon, Spin, Modal, Message} from 'antd';
import  API from '../../service/service'
import './left.css'
export default  class Left extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            value: ''
        };
    }

    handleOk = async () => {
        this.setState({
            confirmLoading: true
        });
        try {
            await API.add_subject({subject_name: this.state.value});
            this.props.hide(true);
            this.setState({
                value: ''
            });
        } catch (e) {
            Message.error(e);
            this.props.hide();
        }
        this.setState({
            confirmLoading: false
        });
    };
    handleCancel = () => {
        this.props.hide();
    };


    render() {
        return (
            <Modal title="添加专题"
                   visible={this.props.addSubjectShow}
                   onOk={this.handleOk}
                   confirmLoading={this.state.confirmLoading}
                   onCancel={this.handleCancel}
            >
                <p>
                    <Input placeholder="请输入专题名称" value={this.state.value} onChange={(e) => {
                        this.setState({
                            value: e.target.value
                        })
                    }}/>
                </p>
            </Modal>
        );
    }
}

