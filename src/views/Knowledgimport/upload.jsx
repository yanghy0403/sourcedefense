import React, { Component } from 'react'
import { Form, Input, Button,Upload, message,Tabs,Radio,Table,Modal,Space  } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
import Header from '../../component/Header.jsx';
import { InboxOutlined  } from '@ant-design/icons';
import style from './upload.module.scss';
import {unstructured,getTableList} from '../../axios/axios'
// const { Dragger } = Upload;
const { TabPane } = Tabs;
const { TextArea } = Input;
// const { confirm } = Modal;

const layout = {
    labelCol: { span: 4 ,offset:4},
    wrapperCol: { span: 12 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
  };

const tags=[
  {
    name:'热点专题',
    value:'hot'
  },
  {
    name:'领域前沿',
    value:'frontier'
  },
  {
    name:'飞机装备',
    value:'aircraft'
  },
  {
    name:'顶层文件',
    value:'top'
  }
]


// let uploadurl = process.env.REACT_APP_URL;
let uploadurl = 'http://localhost:8001';

//上传文件配置项
// const props = {
//     name: 'file',
//     multiple: true,
//     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//     accept:'.txt,.doc,.docx',
//     onChange(info) {
//       const { status } = info.file;
//       if (status !== 'uploading') {
//         console.log(info.file, info.fileList);
//       }
//       if (status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully.`);
//       } else if (status === 'error') {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//   };
// const props1 = {
//     name: 'file',
//     multiple: true,
//     action: uploadurl + '/defence/kf/struct/upload',
//     accept:'.xlsx',
//     onChange(info) {
//       console.log(info);
//       const { status } = info.file;
//       if (status !== 'uploading') {
//         console.log(info.file, info.fileList);
//       }
//       if (status === 'done') {
//         message.success(`${info.file.name} 文件上传成功.`);
//       } else if (status === 'error') {
//         message.error(`${info.file.name} 文件上传失败.`);
//       }
//     },
//   };


const Demo = ()=>{
     const [form] = Form.useForm();
    const onFinish = (values) => {
        // console.log('成功信息:', values);
   
      let data={
         tag:values.type,
         title:values.title,
         author:values.author,
         source:values.source,
         body:values.body
      }
         unstructured(data).then(res=>{
            //  console.log(res);
             if(res.status === 200){
                 message.success('上传成功',6);
                 form.resetFields();
                this.props.history.push({pathname:'/knowledgemanage'});
             }
         })
      };
    
      const onFinishFailed = (errorInfo) => {
        //console.log('失败信息:', errorInfo);
      };
     return (
         <Form {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
                <Form.Item label="分类标签" name="type" rules={[{required:true,message:"请选择分类标签"}]}>
                
                 <Radio.Group>
                     {
                          tags.map((item)=>{
                                return <Radio.Button value={item.value} key={item.value}>{item.name}</Radio.Button>
                          })
                      }
                  </Radio.Group>
             </Form.Item>
               <Form.Item
                    label="标题"
                    name="title"
                    rules={[
                    {
                        required: true,
                        message: '请输入标题!',
                    },
                    ]}
                >
                    <Input placeholder=""/>
                </Form.Item>
               
                <Form.Item
                    label="来源"
                    name="source"
                    rules={[
                    {
                        required: true,
                        message: '请输入数据来源!',
                    },
                    ]}
                >
                    <Input placeholder=""/>
                </Form.Item>
                <Form.Item
                    label="作者"
                    name="author"
                    rules={[
                    {
                        required: true,
                        message: '请填写作者',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="正文"
                    name="body"
                    rules={[
                      {
                          required: true,
                          message: '正文信息为必填项',
                      },
                      ]}
                  >
                  <TextArea rows={4} placeholder=""/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <div className="action">
                       <Button type="primary" htmlType="submit">提交</Button>
                    </div>
                </Form.Item>
         </Form>
     )
}

const Demo1 = ()=>{
    //上传成功
    const onFinish = (values) => {
       // console.log('成功信息:', values);
        this.props.history.push({pathname:'/knowledgemanage'});
      };
      //上传失败
      const onFinishFailed = (errorInfo) => {
        console.log('失败信息:', errorInfo);
      };
      
      const normFile = (e) => {
         console.log(e);
         if(e.file.status ==="error"){
        
          Modal.error({
            title: '消息警告',
            content: '文件内容错误',
          });
         }
        if (Array.isArray(e)) {
          return e;
        }
       if(e.file.status === "done"){
         console.log(111);
        message.info(e.file.response.msg,5);
       }
      
        return e && e.fileList;
      };
      
      //结构化模板数据下载
      const DownloadTem = ()=>{
          let url = process.env.REACT_APP_URL + `/defence/kf/template/struct/download`;
          window.open(url);
      }
     return (
         <Form {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed} className={style.form}>
                 <Form.Item
                    label="结构化数据模板"
                   >
                   <Button type="primary" onClick={DownloadTem}>结构化数据模板下载</Button>
                </Form.Item>
               
                <Form.Item
                    label="结构化数据上传"
                  
                    rules={[
                    {
                        required: true,
                        message: '请输入机构化数据上传!',
                    },
                    ]}
                   >
                    
                      <Form.Item name="url" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                          <Upload.Dragger name="file" action={uploadurl + '/defence/kf/struct/upload'} accept='.xlsx' >
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">单击或拖动文件到该区域进行上传</p>
                            <p className="ant-upload-hint">支持单个或批量上传,目前支持.xlsx格式</p>
                          </Upload.Dragger>
                        </Form.Item>
                </Form.Item>
               
                {/* <Form.Item {...tailLayout}>
                    <div className="action">
                       <Button type="primary" htmlType="submit">提交</Button>
                    </div>
                </Form.Item> */}
         </Form>
     )
}

const Demo2 =(props)=>{
 
  let tableData = props.data.map(item=>{
      return {
           ...item,
           key:item.id.toString()
      }
  })
 
   const columns=[
    {
      title: '表名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '原表名',
      dataIndex: 'origin_name',
      key: 'origin_name',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'name',
      render:(record)=>(
         <Space>
              <span style={{color:'#1890ff',cursor:'pointer'}} onClick={()=>handleDown(record)}>下载</span>
              {/* <span style={{color:'#1890ff',cursor:'pointer'}} onClick={()=>showConfirm(record)}>删除</span> */}
         </Space>
      )
    }
   ]

   //下载结构化数据
   const handleDown =(record)=>{
      let baseurl = process.env.REACT_APP_URL;
      let url=`${baseurl}/defence/kf/struct/download?name=${record.name}`;
      window.open(url);
   }
  
   return(
      <div>
           {
              tableData.length>0 ?   <Table columns={columns} dataSource={tableData}  pagination={props.pagination}/>:null
            }
      </div>
   )
}


export default class MyUpload extends Component {
      state={
          page:1,
          size:5,
          total:5,
          tableData:[],//结构化数据
         
      }
      //返回上一页
      goBack =()=>{
        this.props.history.goBack();
     }
     //获取结构化数据列表
     getTableLIst =()=>{
         let data ={
             page:this.state.page,
             size:this.state.size
         }
         getTableList(data).then(res=>{
          //  console.log(res);
             if(res.data.code === 0){
                this.setState({
                   tableData:[...res.data.data],
                   total:res.data.total
                })
             }
         })

     }
     //切换tab
     changeTab =(key)=>{
       
         if(key.toString()==="3"){
            this.getTableLIst();
         }
     }
     //页码改变
     changePage=(current)=>{
         this.setState({
             page:current
          },()=>{
              this.getTableLIst();
          })
     }
     //页数改变
     onShowSizeChange =(current,size)=>{
          this.setState({
            page:current,
            size:size
          },()=>{
              this.getTableLIst();
          })
     }
    render() {
         const pagination = {
          showSizeChanger: true,//设置每页显示数据条数
          showQuickJumper: false,
          // current: 1,
          pageSize: this.state.size,
          total:this.state.total,
          showTotal: () => `共 ${this.state.total} 条`,
          onChange: (current) => this.changePage(current),
          onShowSizeChange: (current, pageSize) => {//设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
              this.onShowSizeChange(current, pageSize);
          }

        }
        return (
            <div className="wrap">
                  <Header/>
                 <div className={style.content}>
                  
                     <Tabs defaultActiveKey="1" onChange={this.changeTab}>
                        <TabPane tab="普通数据导入" key="1">
                             <div className="form">
                                <Demo/>
                            </div>
                        </TabPane>
                        <TabPane tab="结构化数据导入" key="2">
                             <div className={style.form}>
                                <Demo1/>
                            </div>
                        </TabPane>
                        <TabPane tab="结构化数据列表" key="3">
                             <div className="form">
                                <Demo2 data={this.state.tableData}  pagination={pagination} getTableLIst={this.getTableLIst}/>
                            </div>
                        </TabPane>
                    </Tabs>
                    
                 </div>
                 
            </div>
        )
    }
}
