import React, { Component } from 'react';
import {Row,Col,Input,Button, message} from 'antd';
import style from './relation_edit.module.scss';
import {EntityMerge,EntityUndo,EntitySearch} from '../../axios/axios';

// import {CloseCircleOutlined,CheckCircleFilled} from '@ant-design/icons';
export default class Physical extends Component {
      state={
          isundo:false,//判断用户是否提交过数据
         
          isEditing:false,//输入框状态
          nodes:[],//符合条件的数据
      }
     //实体融合提交
     handleMerge =()=>{
      
        let data={
          tgt:this.state.merge1,
          src:this.state.merge2
        }
        EntityMerge(data).then(res=>{
          if(res.data.code ===0){
               message.success("融合数据提交成功");
               this.setState({
                   isundo:true
               })
            }else{
                message.error(res.data.msg)
            }
        })
      }
      //融合撤销
      handleUndo =()=>{
        let data={
            tgt:this.state.merge1,
            src:this.state.merge2
          }
          EntityUndo(data).then(res=>{
            if(res.data.code ===0){
                 message.success("实体撤销成功");
                 this.setState({
                    isundo:false
                })
              }else{
                  message.error(res.data.msg)
              }
          })
      }
      //实体融合第一个输入框
      handleChange1=(e)=>{
        let value = e.target.value;
        let data ={
           q:value,
           page:1,
           size:500
       }
       this.setState({
           isEditing:true,
           merge1:e.target.value
      })
      setTimeout(()=>{
        EntitySearch(data).then(res=>{
            console.log(res);
            if(res.data.code ===0){
              let nodes = res.data.data;
              this.setState({
               nodes
              })
            }else{
                this.setState({
                    nodes:[]
               })
            }
           
        })
      },500)
         
      }
       //实体融合第二个输入框
       handleChange2=(e)=>{
        this.setState({
          merge2:e.target.value
       })
      }
      //聚焦
      focus =()=>{
        
          this.setState({
            isEditing:true
          })
      }
      //失焦
      blur =()=>{
        this.setState({
            isEditing:false
          })
      }
      //选择匹配到的内容
      handleClick =(name)=>{
          console.log(name);
        this.setState({
           isEditing:false,
           merge1:name
        })
      }
    render() {
        let {isundo,nodes,isEditing,merge1} = this.state;
     
        return (
            <div className={style.entity_relation}>
                    <h2>实体融合</h2>
                    <div className={style.relation_table}>
                        <ul>
                            <li>源数据</li>
                            <li></li>
                            {/* <li>对照</li> */}
                            <li>目标实体</li>
                        </ul>
                        <ul >
                            <li style={{position:'relative'}}>
                                <Input onChange={(e)=>this.handleChange1(e)} value={merge1}/>
                                 {
                                  
                                    isEditing ? (
                                        <ol>
                                           { nodes.length > 0 ? nodes.map((item,key)=>{
                                                  return <li key={key} onClick={()=>this.handleClick(item.name)}>{item.name}</li>
                                              }): <li>暂无数据</li>
                                           }
                                        </ol>   ) :null
                                }
                               
                            </li>
                            <li>对齐</li>
                            <li>
                                <Input onChange={(e)=>this.handleChange2(e)}/>
                                </li>
                        </ul>
                        
                    </div>
                    <Row style={{marginTop:20}}>
                        <Col span={24} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Button type="primary" onClick={this.handleMerge}>提交</Button>
                            {
                                isundo ? <Button type="primary" onClick={this.handleUndo} style={{marginLeft:10}}>撤销</Button>:null
                            }
                           
                        </Col>
                    </Row>
            </div>
        )
    }
}
