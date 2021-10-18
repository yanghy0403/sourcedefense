import React, { Component } from 'react'
import {Row,Col,Input, } from 'antd';
import Header from '../../component/Header'
import { ArrowLeftOutlined } from '@ant-design/icons';
import style from './managelist.module.scss'
import {GetDetails,DeatailSearch} from '../../axios/axios'
const { Search } = Input;

// let dataset ={
//      title:'美国国会批准空军采购6架F-35A试验机',
//      source:'维基百科',
//      date:'2021.1.25',
//      desc:"【英国剑舞房屋网站2021年1月5日报道】美国《2021财年国防授权法》于2021年1月1日正式生效成为法律，其中允许美国空军使用和改进6架罗马F-35A常规起降型实验飞机,编号AT-1至AT-6，目前由联邦政府长期存放在加利福尼亚州爱德华兹空军基地(AFB)。这一做法需要获得现任国防部长克里斯托弗.弥勒的额书面批准。虽然实验机为初始版本且经历长期储存，但相比新生长机型，改进和使用试验机用于演戏、维修训练以及实验新技术或者培训新试飞员，有助于降低成本。(航空工业信息中心 易长奇)",

// }
// let aboutlink = [
//     {
//           id:11,
//           title:'科拉托斯公司为美国空军开发新型无论喷气发动机。波音公司2020年共交付14教KC-46A加油机.日本酱紫啊2035年研发出无人战斗机'
//     }
// ]

// const layout = {
//     labelCol: { span: 4 },
//     wrapperCol: { span: 20 },
//   };

export default class Managelist extends Component {
   state={
         dataset:{
                title:'美国国会批准空军采购6架F-35A试验机',
                source:'维基百科',
                date:'2021.1.25',
                desc:"【英国剑舞房屋网站2021年1月5日报道】美国《2021财年国防授权法》于2021年1月1日正式生效成为法律，其中允许美国空军使用和改进6架罗马F-35A常规起降型实验飞机,编号AT-1至AT-6，目前由联邦政府长期存放在加利福尼亚州爱德华兹空军基地(AFB)。这一做法需要获得现任国防部长克里斯托弗.弥勒的额书面批准。虽然实验机为初始版本且经历长期储存，但相比新生长机型，改进和使用试验机用于演戏、维修训练以及实验新技术或者培训新试飞员，有助于降低成本。(航空工业信息中心 易长奇)",
        
          },
          remend:[],//推荐列表
          isremend:false,//控制推荐栏显示
          id:"",//文章的id
   }
    //返回上一页
    goBack =()=>{
       this.props.history.push({pathname:'/knowledgemanage'});
    }
    //检索
    onSearch=(value)=>{
       
      
        let data={
            tag:'',
            page:1,
            size:100,
            q:value
        }
        DeatailSearch(data).then(res=>{
         
            if(res.data.code ===0){
                  this.setState({
                      remend:res.data.data,
                      isremend:true
                  })
            }
        }).catch(error=>{
             console.log(error);
        })
    }
    //知识关联
    associate=()=>{
       this.props.history.push({pathname:'/linkdata',state:{id:this.state.id,dataset:this.state.dataset}});
    }
    //修改关联数据
    Edit=()=>{
        this.props.history.push({pathname:'/edit',state:{id:this.state.id,dataset:this.state.dataset}});
    }
    //获取文章详情
    getDetailsData=(id)=>{
        let data={
           id:id
        }
        GetDetails(data).then(res=>{
          // console.log(res);
            if(res.data.code ===0){
                  this.setState({
                      dataset:res.data.data
                  },()=>{
                      
                  })
            }
        })
    }
    //切换搜索结果查看对应详情
    handleSection=(id)=>{
        
        this.getDetailsData(id);
        this.setState({
            isremend:false,
            id:id
        })
    }
    componentDidMount(){
      
        this.setState({
           id:this.props.location.state.id
        },()=>{
            this.getDetailsData(this.state.id);
        })
       
    }
    render() {
        let {dataset,remend,isremend} = this.state;
        return (
            <div className="wrap">
                <Header/>
                <div className={style.banber}>
                        <div className={style.search}>
                           <div className={style.search_box}>
                                <Search placeholder="请输入标题" enterButton style={{width:'100%',height:40}} className="search" onSearch={this.onSearch} />
                                {
                                    isremend ?  <ul>
                                            {
                                                remend.map((item,key)=>{
                                                        return <li key={key} onClick={()=>this.handleSection(item.id)}>{item.title}</li>
                                                })
                                            }
                                        </ul>:null
                                }
                                </div>
                        </div>
                </div>
               <div className="content">
                     <Row style={{marginTop:20}}>
                         <Col span={24}>
                            {/* <Button icon={<ArrowLeftOutlined/>} onClick={this.goBack}>返回上一页</Button> */}
                            <span className={style.goback} onClick={this.goBack}><ArrowLeftOutlined/> 返回上一页</span>
                         </Col>
                     </Row>
                   
                    <Row>
                          <Col span={24}>
                                <div className={style.details}>
                                 <h2>{dataset.title}</h2>
                                <p>
                                        <span>来源 : {dataset.source}</span>
                                        <span>时间 : {dataset.date ? dataset.date:'暂无数据'}</span>
                                </p>
                                    <p className={style.desc}>简介 :{dataset.body}</p>
                                <div className={style.link}>
                                      <span onClick={this.associate}>开始关联</span>
                                      <span onClick={this.Edit}> 修改关联数据</span>
                                </div>
                               
                                 {/* <div className={style.about}>
                                       <label htmlFor="">相关文章推荐：</label>
                                       <ul>
                                       {aboutlink.map((item,key)=>{
                                                return <li key={key}>{item.title}</li>
                                            })}
                                       </ul>
                                 </div> */}
                                </div>  
                          </Col>
                    </Row>
               </div>
            </div>
        )
    }
}
