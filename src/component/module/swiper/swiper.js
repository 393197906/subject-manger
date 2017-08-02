import React  from 'react';
import {Row, Col} from 'antd';
import './swiper.css'
import '../module.css'
import Base from '../base'

const listData = [
    {
        id: 1,
        name: '图片1'
    },
    {
        id: 2,
        name: '图片2'
    },
    {
        id: 3,
        name: '图片3'
    },
    {
        id: 4,
        name: '图片4'
    },
    {
        id: 5,
        name: '图片5'
    }
];
export default class Swiper extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row type="flex" justify='space-between' className="module-card"
                 {...this._cellComProp(0, 'style')}
            >
                <Col span="24" className='module-card-title'>
                    <span  {...this._cellComProp(0, 'click')}>轮播图</span>
                </Col>
                {
                    listData.map((item) => (
                        <Col
                            span="4"
                            className="module-cell swiper-cell"
                            {...this._cellComProp(item.id)}
                        >{item.name}</Col>
                    ))
                }
                <Col
                    span="24"
                    className="module-cell swiper-bottom"
                    {...this._cellComProp(6)}
                >底部图片</Col>
            </Row>
        );
    }
}

