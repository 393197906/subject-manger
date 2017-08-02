import React, {Component} from 'react';
import {Form,InputNumber,Slider} from 'antd';
import pubsub from 'pubsub-js'
import '../render.css'

const FormItem = Form.Item;



const style = {
    float: 'left',
    height: 300,
    marginLeft: 70,
};

const marks = {
    1: '1px',
    10: '10px',
    20: {
        style: {
            color: '#f50',
        },
        label: <strong>20px</strong>,
    },
};
export default class FormHeight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: this.props.formData.height || 1,
        }
    }


    _valueChange(value) {
        this.setState({height: value});
        const cellData = {
            key: 'height', value
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
                <FormItem label="组件高度(1px-100px)" layout="vertical">
                    <InputNumber min={1} max={100} value={this.state.height}
                                 onChange={this._valueChange.bind(this)}/>
                </FormItem>
            </div>
        );
    }
}




