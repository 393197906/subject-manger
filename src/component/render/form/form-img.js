import React, {Component} from 'react';
import {Form, Input, Radio} from 'antd';
import pubsub from 'pubsub-js'
import '../render.css'
import Mupload from '../../common/upload/upload'

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


export default class FormImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.formData.type || 'goods',
            primary_key: this.props.formData.primary_key || '',
            search: this.props.formData.search || '',
            description: this.props.formData.description || '',
        }
    }

    _typeChange(e) {
        const type = e.target.value;
        this.setState({type});
        pubsub.publish('RENDER_PHONE_JS_UPDATE', {
            level: this.props.level,
            cell: this.props.cell,
            cellData: {
                key: 'type',
                value: type
            }
        });
    }

    _valueChange(key, e) {
        const value = e.target.value;
        let temp = {};
        temp[key] = value;
        this.setState(temp);
        const cellData = {
            key, value
        };
        pubsub.publish('RENDER_PHONE_JS_UPDATE', {
            level: this.props.level,
            cell: this.props.cell,
            cellData
        });
    }

    render() {
        return (
            <div>
                <FormItem label="细胞模型" layout="vertical">
                    <RadioGroup value={this.state.type} onChange={this._typeChange.bind(this)}>
                        <RadioButton value="goods">商品</RadioButton>
                        <RadioButton value="activity">活动</RadioButton>
                        <RadioButton value="classification">分类</RadioButton>
                        <RadioButton value="search">搜索</RadioButton>
                    </RadioGroup>
                </FormItem>
                {   this.state.type !== 'search' ?
                    <FormItem label="主键" layout="vertical">
                        <Input type='number' placeholder="请输入模型主键"
                               onChange={this._valueChange.bind(this, 'primary_key')}
                               value={this.state.primary_key}/>
                    </FormItem> : null
                }
                {
                    this.state.type === 'search' ?
                        <FormItem label="搜索关键词" layout="vertical">
                            <Input placeholder="输入搜索关键词" value={this.state.search}
                                   onChange={this._valueChange.bind(this, 'search')}/>
                        </FormItem> : null
                }

                <FormItem label="描述" layout="vertical">
                    <Input placeholder="请输入细胞描述" value={this.state.description}
                           onChange={this._valueChange.bind(this, 'description')}/>
                </FormItem>
                <FormItem label="细胞图片" layout="vertical">
                    <Mupload level={this.props.level} cell={this.props.cell} image_url={this.props.formData.image_url}/>
                </FormItem>
            </div>
        );
    }
}

FormImg.defaultProps = {
    type: undefined,
};

FormImg.PropTypes = {
    type: React.PropTypes.string
};

