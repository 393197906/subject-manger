import React, {Component} from 'react';
import {Card, Row, Col, Button, Dropdown, Icon, Menu} from 'antd';
import './render.css'
import RenderPhone from './render-phone'
import RenderForm from './render-from'
import pubsub from 'pubsub-js'

const MenuList = (props) => (
    <span>
        <Button icon="save" type="primary" onClick={props.saveRender}>保存</Button>
       <Dropdown overlay={
           <Menu>
               <Menu.Item key="1">初始化</Menu.Item>
           </Menu>
       }>
      <Button style={{marginLeft: '5px'}}>
        更多 <Icon type="down"/>
      </Button>
    </Dropdown>
    </span>
);
export default class Render extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneHeight: 0,
            phonePaddingTop: 0,
            phonePaddingLeft: 0,
            phoneContentWidth: 0,
            phoneContentHeight: 0,
            operaceNum: 0
        }
    }

    componentDidMount() {
        let phoneWidth = this.refs.renderPhone.offsetWidth;
        let phoneHeight = phoneWidth * 777 / 367;
        let phonePaddingTop = 124 / 777 * phoneHeight;
        let phonePaddingLeft = 24 / 367 * phoneWidth;
        let phoneContentWidth = phoneWidth - 10 - 2 * phonePaddingLeft;
        let phoneContentHeight = phoneHeight - 20 - 2 * phonePaddingTop;
        this.setState({phoneHeight, phonePaddingTop, phonePaddingLeft, phoneContentWidth, phoneContentHeight})
    }

    _saveRender = async () => {
        await pubsub.publish('RENDER_PHONE_JS_SAVE', {subject_id: this.props.subjectData.subject_id});
    };

    render() {
        return (
            <div >
                <Card title="渲染骨架" extra={<MenuList saveRender={this._saveRender}/>}>
                    <Row type='flex' justify='space-between'>
                        <Col span={13}>
                            <div className="render-phone" style={
                                {
                                    height: this.state.phoneHeight,
                                    paddingTop: this.state.phonePaddingTop,
                                }
                            }
                                 ref="renderPhone">
                                <RenderPhone
                                    phoneContentWidth={this.state.phoneContentWidth}
                                    phoneContentHeight={this.state.phoneContentHeight}
                                    subjectData={this.props.subjectData}
                                />
                            </div>
                        </Col>
                        <Col span={9}>
                            <RenderForm/>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

