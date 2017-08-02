/**
 * Created by mr.xie on 2017/7/19.
 */
import React, {Component} from 'react';
import {Upload, Icon, Modal, message, Spin} from 'antd';
import axios from 'axios'
import  './upload.css'
import pubsub from 'pubsub-js'

let server_keys = null;
export default class Mupload extends Component {
    constructor(props) {
        super(props);

        let fileList = [];
        if (props.image_url) {
            fileList = [{
                uid: -1,
                url: props.image_url
            }]
        }
        this.state = {
            loading: false,
            OSSAccessKeyId: '',
            policy: '',
            Signature: '',
            previewVisible: false,
            previewImage: '',
            fileList
        }
    }

    componentWillMount() {
        if (server_keys) {
            this.setState(server_keys);
        } else {
            this.setState({loading: true});
            axios.get("index.php?m=default&c=subject&a=autograph_oss").then(({data, status}) => {
                if (status === 200) {
                    const server_data = {
                        OSSAccessKeyId: data.accessid,
                        policy: data.policy,
                        Signature: data.signature,
                        host: data.host
                    };
                    this.setState(server_data);
                    server_keys = server_data;
                    this.setState({loading: false});
                } else {
                    message.error('oss 签名失败');
                }
            })
        }
    }

    handleCancel = () => this.setState({previewVisible: false});
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };
    handleChange = ({file, fileList, event}) => {
        if (file.status === 'done') {
            const image_name = `${file.lastModified}@@${file.size}@@${file.name}`;
            const image_url = `http://bingde360.oss-cn-beijing.aliyuncs.com/${image_name}?x-oss-process=style/width400`;
            // console.log({
            //     image_name, image_url
            // });
            pubsub.publish('RENDER_PHONE_JS_UPDATE', {
                level: this.props.level,
                cell: this.props.cell,
                cellData: {
                    key: 'image_url',
                    value: image_url
                }
            });
            // console.log(this.props.level);
            // console.log(this.props.cell);
        } else if (file.status === 'error') {
            message.error('图片上传失败,请稍后重试');
        }
        this.setState({fileList});
    };

    _beforeUpload(file) {
        const alowType = ['image/jpeg', 'image/png', 'image/gif'];
        if (alowType.indexOf(file.type) === -1) {
            message.error('只允许上传图片');
            return false;
        }
        if (file.size > 2 * 1024 * 1024) {
            message.error('图片不能大于2M');
            return false;
        }
    }


    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div style={{width: '100%'}}>
                <Icon type="plus"/>
                <div className="ant-upload-text">图片上传</div>
            </div>
        );
        return (
            <Spin spinning={this.state.loading}>
                <div >
                    <Upload
                        action={this.state.host}
                        listType="picture-card"
                        data={(file) => {
                            const key = `${file.lastModified}@@${file.size}@@${file.name}`;
                            return {
                                OSSAccessKeyId: this.state.OSSAccessKeyId,
                                policy: this.state.policy,
                                Signature: this.state.Signature,
                                // key: file.name
                                key
                            }
                        }}
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        beforeUpload={this._beforeUpload.bind(this)}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{width: '100%'}} src={previewImage}/>
                    </Modal>
                </div>
            </Spin>
        );
    }
}

