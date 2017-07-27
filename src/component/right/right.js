import React, {Component} from 'react';
import {Tabs, Spin, Row, Col, message, Card} from 'antd';
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
            tabActive: 'convent',
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
            message.error(err)
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
                message.error(err)
            }
        }
    }

    render() {
        return (
            <Spin size="large" tip="数据加载中..." spinning={this.state.loading}>
                <div className="right">
                    <Row>
                        <Col span={18}>
                            <Tabs
                                tabPosition="left"
                                // defaultActiveKey={'convent'}
                                defaultActiveKey={'render'}
                                onChange={(key) => {
                                    this.setState({
                                        tabActive: key
                                    })
                                }}
                            >
                                <TabPane tab="常规" key="convent">
                                    <Convent subjectData={this.state.subjectData}/>
                                </TabPane>
                                <TabPane tab="渲染" key="render">
                                    <Render subjectData={this.state.subjectData}/>
                                </TabPane>
                                <TabPane tab="危险" key="danger">
                                    <Danger subject_id={this.state.subjectData.subject_id} goback={() => {
                                        this.props.history.push('/');
                                    }}/>
                                </TabPane>
                            </Tabs>
                        </Col>
                        <Col span={6} style={{padding: '0 10px'}}>
                            {
                                this.state.tabActive === 'convent' ?
                                    <Card title="帮助">
                                        <p>专题默认不启用，配置好模板后点击启用，首页生效</p>
                                    </Card> : this.state.tabActive === 'render' ?
                                    <ModuleTools/> :
                                    <Card title="提示">
                                        <p>删除操作不可逆，谨慎使用</p>
                                    </Card>
                            }
                        </Col>
                    </Row>
                </div>
            </Spin>
        );
    }
}

