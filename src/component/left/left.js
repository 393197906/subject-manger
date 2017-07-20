import React, {Component} from 'react';
import {Row, Col} from 'antd'
import {Tree, Input, Button} from 'antd';
import './left.css'

const Search = Input.Search;
const TreeNode = Tree.TreeNode;
export default  class Left extends Component {
    render() {
        return (
            <div className="left">
                <Search style={{width: '100%'}} placeholder="搜索专题"/>
                <Tree
                    showLine
                    defaultExpandAll
                >
                    <TreeNode title="专题列表">
                        <TreeNode title="推荐"/>
                        <TreeNode title="水果"/>
                        <TreeNode title="肉禽"/>
                        <TreeNode title="蛋类"/>
                        <TreeNode title="测试"/>
                    </TreeNode>
                </Tree>
                <Button type="primary" style={{width: '100%', marginTop: '20px'}} icon="download">添加专题</Button>
            </div>
        );
    }
}

