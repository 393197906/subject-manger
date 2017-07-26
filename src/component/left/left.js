import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Input, Button, Menu, Icon, Spin, Modal, Message} from 'antd';
import AddSubject from './add-subject'
import  API from '../../service/service'
import pubsub from 'pubsub-js'
import './left.css'

const Search = Input.Search;
export default  class Left extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addSubjectShow: false,
            loading: true,
            subjectData: []
        };
    }

    async componentDidMount() {
        this._service();
        pubsub.subscribe('LEFT_UPDATE', this._service.bind(this));
    }

    async _service() {
        this.setState({loading: true});
        try {
            const subjectData = await API.subjcet_list();
            this.setState({subjectData})
        } catch (err) {
            Message.error(err);
        }
        this.setState({loading: false});
    }

    render() {
        return (
            <Spin size="large" tip="专题加载中..." spinning={this.state.loading}>
                <div className="left">
                    <Search style={{width: '100%'}} placeholder="搜索专题"/>
                    <Menu mode="inline" defaultOpenKeys={['sub']} defaultSelectedKeys={['main']}>
                        <Menu.Item key='main'><Link
                            to='/'><Icon type="bar-chart"/>梗概
                        </Link></Menu.Item>
                        <Menu.SubMenu title={<span><Icon type="bars"/>专题列表</span>} key="sub">
                            {
                                this.state.subjectData.map((item) => (
                                    <Menu.Item key={`${item.subject_id}${item.subject_name}`}><Link
                                        to={`/${item.subject_id}`}><Icon
                                        type="database"/>{item.subject_name}
                                        {
                                            parseInt(item.subject_active) === 1 ? <span className="left-label"><Icon
                                                type="eye"/></span> : null
                                        }

                                    </Link></Menu.Item>
                                ))
                            }
                        </Menu.SubMenu>
                    </Menu>
                    <Button type="primary" style={{width: '100%', marginTop: '20px'}} icon="download" onClick={() => {
                        this.setState({
                            addSubjectShow: true
                        })
                    }}>添加专题</Button>
                </div>
                <AddSubject addSubjectShow={this.state.addSubjectShow} hide={async (statu) => {
                    if (statu === undefined) {
                        this.setState({
                            addSubjectShow: false,
                        });
                        return;
                    }
                    await this._service();
                    Message.success('专题添加成功');
                    this.setState({
                        addSubjectShow: false,
                    })
                }}/>
            </Spin>
        );
    }
}

