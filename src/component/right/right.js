import React, {Component} from 'react';
import {Tabs, Spin, Row, Col, Message} from 'antd';
import './right.css'
import {Swiper, Nav, Amod, Bmod, Cmod, Dmod} from '../module/index'
import ModuleTools from '../common/module-tools/module-tools'
import Convent from '../convent/convent'
import Render from '../render/render'
import Danger from '../danger/danger'
import  API from '../../service/service'
const TabPane = Tabs.TabPane;

export default class Right extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            subjectData: {}
        };
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({loading: true});
        try {
            const subjectData = await API.find_subjcet(id);
            this.setState({loading: false, subjectData});
        } catch (err) {
            Message.error(err)
        }
    }

    async componentWillReceiveProps(nextProps) {
        const id = nextProps.match.params.id;
        if (id !== this.props.match.params.id) {
            this.setState({loading: true});
            try {
                const subjectData = await API.find_subjcet(id);
                this.setState({loading: false, subjectData});
            } catch (err) {
                Message.error(err)
            }
        }
    }


    render() {
        return (
            <Spin size="large" tip="数据加载中..." spinning={this.state.loading}>
                <div className="right">
                    <Row>
                        <Col span={18}>
                            <Tabs defaultActiveKey="1"
                                  tabPosition="left"
                            >
                                <TabPane tab="常规" key="1">
                                    <Convent subjectData={this.state.subjectData}/>
                                </TabPane>
                                <TabPane tab="渲染" key="2">
                                    <Render/>
                                </TabPane>
                                <TabPane tab="危险" key="3">
                                    <Danger/>
                                </TabPane>
                            </Tabs>
                        </Col>
                        <Col span={6} style={{padding: '0 10px'}}>
                            {/*<Card title="帮助">*/}
                            {/*<p>专题默认不启用，配置好模板后点击启用，首页生效</p>*/}
                            {/*</Card>*/}
                            <ModuleTools/>
                        </Col>
                    </Row>
                </div>
            </Spin>
        );
    }
}

