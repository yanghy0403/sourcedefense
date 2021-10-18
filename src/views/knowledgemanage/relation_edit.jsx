import React, { Component,useState,useContext  } from 'react';


import {Row,Col,Input,Button,Form,Modal, message,Table} from 'antd';
// import { CheckOutlined} from '@ant-design/icons';
import EditTable from '../../component/EditTable'

import style from './relation_edit.module.scss';

import {RelationEdit,RelationAdd,getRelation,DeleteRlelation} from '../../axios/axios';
import context from '../../util/createContext'; //多层组件传参

const {Column} = Table;
 const {TextArea } = Input;

  let defaultattr = {};
//修改关系属性
const EditRelation= (props)=>{
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
 
   const {getRelation} = useContext(context) ||{}
  const showModal = () => {
  
    defaultattr = {...props.defaultContent};
    
    setIsModalVisible(true);
  };

  const handleOk = () => {
    
     form.submit();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //提交数据
   const onFinish=(value)=>{
  
        let data={
          docId:props.id,
          data:[
             {
              id:props.defaultContent.id ? props.defaultContent.id :"",
              ent_1:value.ent_1,
              rel:value.rel,
              ent_2:value.ent_2,
              ts:value.ts,
              remark:value.remark
             }
          ]
        }
       
      
        RelationEdit(data).then(res=>{
            //console.log(res);
             if(res.data.code ===0){
                  message.success('修改成功');
                  getRelation();
             }else{
                 message.error(res.data.msg)
             }
        })
        form.resetFields();
   }
  
  return (
       <div>
               <span style={{color:'#1890ff',cursor:"pointer"}} onClick={showModal}>修改</span>
               <Modal title="关系修改" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={false} okText="确定修改">
                      <Form {...{wrapperCol: { span: 24 }}} form={form} onFinish={onFinish} style={{maxHeight:400,overflow:'hidden',overflowY:'auto'}} initialValues={defaultattr}>
                               <Form.Item  name="ent_1" label="实体">
                                    <Input />
                                </Form.Item>
                                <Form.Item  name="rel" label="关系">
                                    <Input />
                                </Form.Item>
                                <Form.Item  name="ent_2" label="实体">
                                    <Input />
                                </Form.Item>
                                <Form.Item  name="remark" label="备注">
                                     <TextArea  rows={4}/>
                                </Form.Item>
                                <Form.Item  name="ts" label="时间">
                                    <Input placeholder="时间格式:2021-06-12"/>
                                </Form.Item>
                      </Form>
              </Modal>
       </div>
  )

}

//已经发现的关系表
const ReletionTable = (props)=>{
    
    const handleDelete=(item)=>{
       
        let data={
           id:item.id
        }
        DeleteRlelation(data).then(res=>{
            if(res.data.code ===0){
                 message.success('删除成功');
                 props.getRelation(props.id);
            }else{
                message.error(res.data.msg);
            }
        })
    }
   
    return (<Table dataSource={props.defaultRelation} pagination={false}>
       <Column title="实体" dataIndex="ent_1" key="ent1" />
       <Column title="关系" key="rel" render={(text,record)=>(
           <>
               <span>{record.rel}</span> 
              {
                  record.ts && record.ts !=='' ? <span>({record.ts})</span> :null
              }
           </>
       )}/>
       <Column title="实体" dataIndex="ent_2" key="ent1" />
       <Column title="备注" dataIndex="remark" key="remark"  />
       <Column title="操作" key="action" render={(text,record,index)=>(
          <div style={{display:'flex'}}>
           <EditRelation  callback1={()=>props.callback()} defaultContent={record} defaultIndex={index} id={props.id}/>
            {
                record.id && record.id !=='' ?  <span style={{color:'#1890ff',paddingLeft:10,cursor:"pointer"}} onClick={()=>handleDelete(record)}>删除</span> :null
            }
          </div>
       )}>
       </Column>
  </Table>)
}

export default class Relation_edit extends Component {
    state={
        inputvalue:'',
        defaultRelation:[],
        isadd:false,//是否新增关系  ,
        defaultValue:'',//默认修改的内容
        isaddText:'新增',
        tableData:[],//分析出来的关系数据
        merge1:'',//目标实体
        merge2:'',//融合的实体
        id:'',//文章的id
    }
  
    //点击关系新增
    handleConfimAdd = ()=>{
          this.setState({
              isadd:!this.state.isadd,
              isaddText:this.state.isadd ? '新增':'收起'
          })
    }
    //修改
    handleEdit=(key,item)=>{
      let {defaultRelation} = this.state;
      this.setState({
         defaultRelation:[...defaultRelation.splice(key,1)],
         defaultValue:item
      },()=>{
          console.log(this.state);
      })
    }
    //接收子组件修改完后的内容
    callback=(value)=>{
         console.log(333);
         
    }
    //添加一段文本关系发现
    handleAddRelation =()=>{
       let data={
         text:this.state.inputvalue
       }
       RelationAdd(data).then(res=>{
        //  console.log(res);
           if(res.data.code ===0){
               this.setState({
                 tableData:res.data.data.map((item,key)=>{
                     return {
                         ...item,
                         key:key
                     }
                 })
               },()=>{
                   //console.log(this.state.tableData);
               })
           }else{
               message.error(res.data.msg)
           }
       })

    }
    //文本域复制的额内容
    changeTextArea=(e)=>{
          this.setState({
            inputvalue:e.target.value,

          })
        //  console.log(e.target.value);
    }
    //查询已经发现的关系
    getRelation =()=>{
     
      let data={
          id:this.state.id
      }
       getRelation(data).then(res=>{
          // console.log(res);
          if(res.data.code ===0){
              if(res.data.data.length ===0){
                 // message.error('未发现相关关系');
              }
              let relations = res.data.data.map((item,i)=>{
                  return {
                       ...item,
                       key:i.toString()
                  }
              })
              this.setState({
                defaultRelation:[...relations]
              },()=>{
                  // console.log(this.state.defaultRelation);
              })
          }
        })
    }
   
    componentDidUpdate(props){
     
    }
    componentDidMount(){
     
      let {dataset} = this.props;
      this.setState({
         id:dataset.id
      },()=>{
        this.getRelation();
      })
     
     
    }
    render() {
     
       let {defaultRelation,isadd,isaddText,tableData,id} = this.state;
        return (
           <div>
                  <Row>
                        <Col span={24}>
                            <div className={style.re_box}>

                           {
                             defaultRelation.length>0 ?
                               <context.Provider value={{getRelation:this.getRelation}}>
                                   <ReletionTable  defaultRelation={defaultRelation} id={id} getRelation={this.getRelation}/>
                              </context.Provider>
                              :null
                           }
                                <ul style={{marginTop:10}}>
                                      
                                        <li>
                                              <span>.....</span>
                                              <Button  type="primary" onClick={this.handleConfimAdd} style={{marginRight:30}}>{isaddText}</Button>
                                          </li>
                                </ul>
                                   
                            </div>
                            {
                                isadd &&   <div className={style.re_box} style={{display:'flex'}}>
                                                        <TextArea  onChange={(e)=>this.changeTextArea(e)} placeholder="请输入你要分析的内容,文字不要超过100字" rows={4} maxLength={100}/>
                                                        <Button  type="primary" onClick={this.handleAddRelation}>提交</Button>
                                                </div>
                            }
                           {
                                isadd &&  <div className={style.re_box}>
                                    {
                                      tableData.length>0 ?   <EditTable tableData={tableData} id={id}/>:null
                                    }
                                  </div>
                           }
                            
                           
                        </Col>
                    </Row>
                 
           </div>
        )
    }
}
