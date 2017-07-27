/**
 * Created by mr.xie on 2017/7/19.
 */
import React, {Component} from 'react';
import {Upload, Icon, Modal, message} from 'antd';
import axios from 'axios'

export default class Mupload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OSSAccessKeyId: '',
            policy: '',
            Signature: '',
            previewVisible: false,
            previewImage: '',
            fileList: [
                // {
                //     uid: -1,
                //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                // }
            ],
        }
    }

    componentWillMount() {
        axios.get("http://localhost/bingdenew/ec/mobile/index.php?m=default&c=subject&a=autograph_oss").then(({data, status}) => {
            if (status === 200) {
                this.setState({
                    OSSAccessKeyId: data.accessid,
                    policy: data.policy,
                    Signature: data.signature,
                    host: data.host
                })
            } else {
                message.error('oss 签名失败');
            }
        })
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
            console.log({
                image_name, image_url
            });
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
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">图片上传</div>
            </div>
        );
        return (
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
        );
    }
}

