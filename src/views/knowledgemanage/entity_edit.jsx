import React, { Component, useState,useContext } from 'react'
import { Button, Form, Input, Row, Col, Modal, Cascader, Tag, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import context from '../../util/createContext'; //多层组件传参

import style from './entity_edit.module.scss'
import { Hierarchy, SearchEntityAttr, AttrEditSubmit, AddEntity, HierarchyAttr } from '../../axios/axios'
// const { Option } = Select;

const layout = {
  labelCol: { span:6 },
  wrapperCol: { span: 16 },
};
const layout1 = {
  labelCol: { span:3 },
  wrapperCol: { span: 12 },
};
const layout2 = {
 
  wrapperCol: { span: 16,offset:6 },
};


let initValues = {};
//实体属性组件
const Myinput = (props) => {

  const [form] = Form.useForm();
  window.tagForm = form;

  const handleSubmit = () => {
    form.submit();
  }

  //成功提交
  const onFinish = (values) => {
   
    let data = {
      name: props.tagName,
      data: {
        props: values
      }
    }

    AttrEditSubmit(data).then(res => {
      // console.log(res);
      if (res.data.code === 0) {
        props.getlatestData();
        message.success(res.data.msg);
        // props.getEntityAttr();
      } else {
        message.error(res.data.msg)
      }
    })
  };
  //失败提交
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFieldsChange =(value)=>{

  }

  let arr = [];
  if (props.attr !== undefined) {
    arr = props.attr;
   
    arr.forEach(item => {
      initValues[item.label] = item.value;
    })
  }
  
  return (
    <Row>
      <Col span={24} style={{ maxHeight: 400, overflow: 'hidden', overflowY: 'auto' }}>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} {...layout1} form={form} ref={props.formRef} onFieldsChange={onFieldsChange}>
          {
            arr.length > 0 ? arr.map((item, key) => {
              return <Form.Item label={item.name} name={item.label} key={key} initialValue={item.value}>
                <Input width={200}  />
              </Form.Item>
            }) : null
          }

        </Form>

      </Col>
      <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <Custom type="2"/>
        <Button type="primary" onClick={handleSubmit} style={{marginLeft:20}}> 提交</Button>
      </Col>
    </Row>
  )
}

let level = [];
//添加实体属性
const Add = (props) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = (props) => {
    setIsModalVisible(true);
  };

  const handleOk = () => {

    form.submit();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChange = (value) => {
    //value是选择的层级
    level = value;
    let data = {
      level_0: level[0],
      level_1: level[1],
      level_2: level[2],
    }
    HierarchyAttr(data).then(res => {
      // console.log(res);
      if (res.data.code === 0) {
        props.UpdateAttr(res.data.data)
      }
    })
  }
  //提交新增数据
  const onFinish = (value) => {

    let data = {
      props: {
        level_0: level[0],
        level_1: level[1],
        level_2: level[2],
        ...value,
        type: value['type'].join(',')
      }
    }

    AddEntity(data).then(res => {
      if (res.data.code === 0) {
        message.success(res.data.msg);
        //  window.location.reload();
      }else{
          message.error(res.data.msg);
      }
    })
    form.resetFields();
  }

  let arr = props.NewAttr;
  //清除name字段，改为手动设置name为必填字段
  arr = arr.filter(item => {
    return item.label !== 'name';
  })

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>添加实体</Button>
      <Modal title="实体新增" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={false} >
        <Form {...layout} form={form} onFinish={onFinish} style={{ maxHeight: 400, overflow: 'hidden', overflowY: 'auto' }}>
          <Form.Item label={'分类'} name="type">
            <Cascader options={props.submenu} placeholder="请选择分类" style={{ width: '100%',paddingLeft:0 }} onChange={onChange} className={style.cascader}/>
          </Form.Item>
          {
            arr.length > 0 ? <Form.Item
              label="名字"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Name为必填项!',
                },
              ]}
            >
              <Input />
            </Form.Item> : null
          }
          {
            arr.map((item, key) => {
              return <Form.Item label={item.name} name={item.label} key={key}>
                <Input width={200} />
              </Form.Item>
            })
          }
          {
            arr.length>0 ?  <Form.Item {...layout2}>
                        <Custom type="1"></Custom>
                </Form.Item> :null
          }
          
        </Form>
      </Modal>
    </div>
  )

}

//添加自定义属性
const Custom = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const {SetAttrs} = useContext(context) ||{};
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //提交自定义属性的值
  const onFinish = (value)=>{
     
       //当类别为1时更新选择的层级下的属性，当为2时更新选择的实体的属性
      if(props.type ==='1'){
        SetAttrs('1',value)
      }else{
        SetAttrs('2',value)
      } 
      form.resetFields();
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
         添加自定义属性
      </Button>
      <Modal title="自定义属性" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={false} >
        <Form {...layout} form={form} onFinish={onFinish} style={{ maxHeight: 400, overflow: 'hidden', overflowY: 'auto' }}>
        <Form.Item label="自定义属性英文名" name="label">
              <Input />
          </Form.Item>
          <Form.Item label="自定义属性中文名" name="name">
              <Input />
          </Form.Item>
           <Form.Item label="自定义属性值" name="value">
              <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};



export default class Entityedit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      actionTag: '',//点击的实体名称
      tagindex: 0,
      submenu: [],
      NewAttr: [],//选择要添加的实体属性
      entity:[],//点击的实体属性
    };
    this.myRef = React.createRef();
  }

  //查询点击的实体属性
  getEntityAttr = (name) => {
    let data = {
      name: name
    }
    SearchEntityAttr(data).then(res => {
      if (res.data.code === 0) {
        this.setState({
          entity: res.data.data.props
        }, () => {
          this.myRef.current.resetFields();
        })
      } else {
        message.error(res.data.msg)
      }
    })
  }
  //实体切换
  handleTag = (i, name, context) => {
    this.setState({
      tagindex: i,
      actionTag: name
    }, () => {
      // context.changeTag(name);
      this.getEntityAttr(name);
    })
  }
  //新增实体后通知父组件更新属性
  UpdateAttr = (value) => {
    this.setState({
      NewAttr: value
    })
  }
  //获取修改后的实体属性
  getlatestData = () => {
    this.getEntityAttr(this.state.actionTag);
  }
  //自定义属性后通知父组件更新数据
  SetAttrs = (key,value)=>{
      if(key === '1'){
           this.setState({
            NewAttr:[...this.state.NewAttr,value]
           })
       }else{
        this.setState({
          entity:[...this.state.entity,value]
         })
       }
  }
  //获取层级关系
  gethierarchy = () => {
    Hierarchy({}).then(res => {
      // console.log(res);
      if (res.data.code === 0) {
        this.setState({
          submenu: res.data.data
        })
      } else {
        message.error(res.data.msg);
      }
    })
  }
  componentDidMount() {
    this.gethierarchy();
  }
  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      tags: [...props.tags],
      actionTag: props.tags[0]
    }, () => {
      if (this.state.tags.length === 0) {
        // message.warning('暂未发现实体数据')
      } else {
     
        this.getEntityAttr(this.state.tags[0])
      }
    })
  }
  render() {
    let { tags, entity, tagindex, actionTag, submenu, NewAttr } = this.state;
    return (
      <div className={style.edit_box}>

        <div className={style.tags}>
          <context.Consumer>
            {

              context => (
                <>
                  {
                    tags.map((item, i) => {
                      return <Tag key={i} className={tagindex === i ? 'tag_active' : ''} onClick={() => this.handleTag(i, item, context)} style={{ lineHeight: '32px', cursor: 'pointer',marginBottom:10 }}>{item}</Tag>
                    })
                  }
                </>
              )
            }
          </context.Consumer>
           {/* 把获取曾经属性方法传递给孙子组件 */}
           <context.Provider value={{SetAttrs:this.SetAttrs}}>
              <Add submenu={submenu} UpdateAttr={this.UpdateAttr} NewAttr={NewAttr} />
           </context.Provider>
         
         
        </div>
        <div className={style.info}>
          {entity !== undefined ? 
             <context.Provider value={{SetAttrs:this.SetAttrs}}>
                  <Myinput attr={entity} tagName={actionTag} getlatestData={this.getlatestData} getEntityAttr={this.getEntityAttr} formRef={this.myRef} />
              </context.Provider>
           : null}
        </div>
      </div>
    )
  }
}


