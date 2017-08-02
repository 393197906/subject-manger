import React from 'react';
import {Row, Col} from 'antd';
import './tools-seat.css'
import '../module.css'
import Base from '../base'


export default class Tools_Seat extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row type="flex" justify='space-around' className="module-card"
                 {...this._cellComProp(0, 'style')}
            >
                <Col span="24" className='module-card-title'>
                    <span {...this._cellComProp(0, 'click')}>间距组件({this.props.data['1'].height}px)</span>
                </Col>
                <Col
                    span="24"
                    className="module-cell seat-cell"
                    {...this._cellComProp(1, 'height')}
                >&nbsp;</Col>
            </Row>
        );
    }
}

