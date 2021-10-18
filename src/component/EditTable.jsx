import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Form,Row,Col,Button, message } from 'antd';
import {CloseCircleOutlined,CheckCircleFilled} from '@ant-design/icons';
import {AddRelation,knowlodeResult} from '../axios/axios';
import context from '../util/createContext';
import './EditTable.scss';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
   
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
 
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const [effect, setEffect] = useState(false); //判断输入的值是否有效
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    const {clearSelect} = useContext(context);
   
    useEffect(() => {
      if (editing) {
         
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    //监听输入框值得变化判断实体或者关系是否存在
     const change =(e)=>{
      clearSelect();
      let type =e.target.getAttribute("data-type");
      let value = e.target.value;
      if(type === 'ent_1' || type === "ent_2"){
          type = 'entity';
      }else if(type ==='rel'){
          type ="relation";
      }
           let data ={
                type:type,
                value:value
           }
          setTimeout(()=>{
            knowlodeResult(data).then(res=>{
                // console.log(res);
                if(res.data.code ===0){
                  let nodes = res.data.data.nodes;
                  if(nodes.length>0){
                     setEffect(!effect);
                  }else{
                    setEffect(effect);
                  }
                }else{
                  setEffect(effect);
                }
               
            })
          },500)

      
        
     }
    const save = async () => {
      try {
        const values = await form.validateFields();
       
        //这一块检验实体和关系是否重复
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
        >
          {
              dataIndex === 'remark' ||  dataIndex === 'ts' ?  ( <Form.Item style={{
                      margin: 0,
                    }}
                    name={dataIndex}
                    rules={[
                      {
                        required: false,
                        message: `${title} 是必填的.`,
                      },
                    ]}>
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} onChange={change} data-type={dataIndex}/>
                </Form.Item>) : ( <Form.Item style={{
                  margin: 0,
                }}
                name={dataIndex}
                rules={[
                  {
                    required: true,
                    message: `${title} 是必填的.`,
                  },
                ]}>
                 <Input ref={inputRef} onPressEnter={save} onBlur={save} onChange={change} data-type={dataIndex}/>
             </Form.Item>)
          }
            
              {
                  dataIndex !== 'remark' &&  dataIndex !== 'ts' ?
                ( !effect ? <CloseCircleOutlined className="error"/> : <CheckCircleFilled className="success" />) :null
              }
             
              
        
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };
  



export default class EditTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
          {
            title: '实体',
            dataIndex: 'ent_1',
            editable: true,
            align:'center',
            width:'20%'
          },
          {
            title: '关系',
            dataIndex: 'rel',
            editable: true,
            align:'center',
            width:'20%'
            
          },
          {
            title: '实体',
            dataIndex: 'ent_2',
            editable: true,
            align:'center',
            width:'40%'
          },
          {
            title: '时间',
            dataIndex: 'ts',
            editable: true,
            align:'center',
            width:'10%'
          },
          {
            title: '备注',
            dataIndex: 'remark',
            editable: true,
            align:'center',
            width:'10%'
          },
         
        
        ];
        this.state = {
          dataSource: [
            {
              key: '0',
              name: 'Edward King 0',
              relation: '32',
              name1: 'London, Park Lane no. 0',
            },
            {
              key: '1',
              name: 'Edward King 1',
              relation: '32',
              name1: 'London, Park Lane no. 1',
            },
          ],
          count: 2,
          selectedRowKeys: [], 
          selectedRows:[]
        };
      }
     //选择项发生改变
     onSelectChange = (selectedRowKeys,selectedRows) => {
        this.setState({ selectedRowKeys,selectedRows });
      };
      //当输入框发生变化时将选中项清空
      clearSelect =()=>{
        this.setState({ selectedRowKeys:[],selectedRows:[] });
      }
    //保存
      handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
          dataSource: newData,
        });
      };
      //提交新增的关系
      Submit=()=>{
       
           let obj= [...this.state.selectedRows].map(item=>{
                //  delete item.key;
                 return item;
            });
          
           let data={
              data:obj
           }
            
            AddRelation(data).then(res=>{
                // console.log(res);
                if(res.data.code ===0){
                    message.success('关系新增成功')
                }else{
                    message.error(res.data.msg,5);
                }
            })
      }
      //监听传过来的数据
      UNSAFE_componentWillReceiveProps(newProps){
         
          let {tableData} = newProps;
          tableData = tableData.map((item,i)=>{
             return {
                 ...item,
                 key:i.toString()
             }
          })
         
          this.setState({
            dataSource:[...tableData]
          })
      }
      componentDidMount(){
        let {tableData} = this.props;
       
        tableData = tableData.map((item,i)=>{
           return {
               ...item,
               key:i.toString()
           }
        })
      
        this.setState({
          dataSource:[...tableData]
        })
      }
      render() {
        const { dataSource,selectedRowKeys  } = this.state;
        // console.log(dataSource);
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,

          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
              key: 'odd',
              text: 'Select Odd Row',
              onSelect: changableRowKeys => {
                let newSelectedRowKeys = [];
                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                  if (index % 2 !== 0) {
                    return false;
                  }
                  return true;
                });
                this.setState({ selectedRowKeys: newSelectedRowKeys });
              },
            },
            {
              key: 'even',
              text: 'Select Even Row',
              onSelect: changableRowKeys => {
                let newSelectedRowKeys = [];
                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                  if (index % 2 !== 0) {
                    return true;
                  }
                  return false;
                });
                this.setState({ selectedRowKeys: newSelectedRowKeys });
              },
            },
          ],
        };
        const components = {
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        };
        const columns = this.columns.map((col) => {
          if (!col.editable) {
            return col;
          }
    
          return {
            ...col,
            onCell: (record) => ({
              record,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave: this.handleSave,
            }),
          };
        });
        return (
          <div className="edit_table">
             <p style={{background: 'rgb(239 236 236)', padding: 8,marginBottom:0}}> 
               <CloseCircleOutlined className="error"/> ：代表数据库里不存在对应的实体或关系
               <CheckCircleFilled className="success" style={{paddingLeft:10}}/> ：代表数据库存在对应的实体或关系。
               分析出来的两个实体必须在库里存在,且关系是新建的才能提交
            </p>
            <context.Provider value={{clearSelect:this.clearSelect}}>
                <Table
                  components={components}
                  rowClassName={() => 'editable-row'}
                  rowSelection={rowSelection}
                  bordered
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                />
            </context.Provider>
              <Row> 

                    <Col span={24} style={{display:'flex',justifyContent:'center',alignItems:'center',margin:"10px 0"}}>
                         <Button type="primary" onClick={this.Submit}>提交</Button>
                    </Col>
              </Row>
          </div>
        );
      }
}
