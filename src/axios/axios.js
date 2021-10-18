import fetch from './request';
import qs from 'qs';


//首页大图数据
export function GetgraphIndex(params){
    
    return fetch({
        url:'/defence/kr/index',
        method:'get',
        params
    })
}

//知识管理列表
export function GetTableList(params){
    
    return fetch({
        url:'/defence/km/docs',
        method:'get',
        params
    })
}
//知识管理文章详情
export function GetDetails(params){
    
    return fetch({
        url:'/defence/km/docs/'+ params.id +'/info',
        method:'get',
        // params
    })
}
//知识管理文章详情搜索
export function DeatailSearch(params){
    
    return fetch({
        url:'/defence/km/docs/search',
        method:'get',
        params
    })
}

//知识关联基本详情
export function Relateddetails(params){
    
    return fetch({
        url:'/defence/km/docs/'+ params.id+'/extraction',
        method:'get',
        //params
    })
}
//知识关联网络图谱
export function getGraph(params){
    
    return fetch({
        url:'/defence/km/docs/entity/graph',
        method:'get',
        params
    })
}
//知识关联关系发现
export function getRelation(params){
    
    return fetch({
        url:'/defence/km/docs/'+ params.id+'/relations',
        method:'get',
        //params
    })
}

//知识关联查询实体属性
export function SearchEntityAttr(params){
      return fetch({
        url:`/defence/km/entities/${params.name}/info`,
        method:'get',
        //params
    })
}
//知识关联属性关系修改
//查询菜单分类
export function Hierarchy(params){
    return fetch({
      url:`/defence/km/entities/hierarchy`,
      method:'get',
      params
  })
}

//查询菜单下的属性
export function HierarchyAttr(params){
    return fetch({
      url:`/defence/km/entities/hierarchy/props`,
      method:'get',
      params
  })
}


//实体属性修改提交
export function AttrEditSubmit(params){
    return fetch({
      url:`/defence/km/entities/${params.name}/edit`,
      method:'post',
       data:params.data
  })
}
//实体新增
export function AddEntity(params){
    return fetch({
      url:`/defence/km/entities/add`,
      method:'post',
      data:params
  })
}

//关系编辑
export function RelationEdit(params){
 
    return fetch({
      url:`/defence/km/docs/relations/upsert`,
      method:'post',
      data:params
  })
}
//关系发现

export function RelationAdd(params){
   // console.log(params)
    return fetch({
      url:`/defence/km/text/extraction`,
      method:'post',
      data:params
  })
}


//实体融合

export function EntityMerge(params){
    // console.log(params)
     return fetch({
       url:`/defence/km/entities/merge`,
       method:'post',
       data:params
   })
 }
 //实体融合撤销

export function EntityUndo(params){
    // console.log(params)
     return fetch({
       url:`/defence/km/entities/unmerge`,
       method:'post',
       data:params
   })
 }

//知识问答
export function SearchResult(params){
    
    return fetch({
        url:'/defence/kqa/search',
        method:'get',
        params
    })
}
//知识检索关系图
export function knowlodeResult(params){
    return fetch({
        url:'/defence/kr/search',
        method:'get',
        params
    })
}
//知识检索查找节点属性
export function SearchNodeattr(params){
    return fetch({
        url:'/defence/kr/search/'+ params.identity +'/info',
        method:'get',
        // params
    })
}

//知识应用
export function Pathanalysis(params){
    return fetch({
        url:'/defence/ka/path-analysis',
        method:'get',
        params
    })
}
//知识
export function structuOrgan(params){
    return fetch({
        url:'/defence/ka/networks',
        method:'get',
        params
    })
}
//非结构化数据上传
export function unstructured(params){
 
    return fetch({
        url:'/defence/kf/unstruct/upload',
        method:'post',
        data:qs.stringify(params),
        headers:{
            'Content-type': 'application/x-www-form-urlencoded'
         },
    })
}
//结构化数据上传
export function structured(params){
    return fetch({
        url:'/defence/kf/struct/upload',
        method:'post',
        data:params,
        headers:{
            'Content-type': 'multipart/form-data'
         },
    })
}
//结构化数据列表
export function getTableList(params){
    return fetch({
        url:'/defence/kf/struct/list',
        method:'get',
        params,
       
    })
}
//结构化数据列表下载
export function DownData(params){
    return fetch({
        url:'/defence/kf/struct/download',
        method:'get',
        params,
       
    })
}
//结构化数据列表删除
export function DeleteTableData(params){
    return fetch({
        url:'/defence/kf/struct/delete',
        method:'get',
        params,
       
    })
}
//关系新增
export function AddRelation(params){
    return fetch({
        url:'/defence/km/relations/add',
        method:'post',
        data:params,
       
    })
}
//查询实体类别
export function getEntityType(params){
    return fetch({
        url:'/defence/km/labels',
        method:'get',
        params,
       
    })
}
//问题模板列表

export function getProblemTem(params){
    return fetch({
        url:'/defence/kqa/template/list',
        method:'get',
        params,
        headers:{
           isLoading :false,//设置成false就不会有加载效果
        }
    })
}
//问题模板新增
export function AddProblemTem(params){
    return fetch({
        url:'/defence/kqa/template/add',
        method:'post',
        data:params,
       
    })
}
//知识网络下的整体网络图谱
export function AsawholeNetwork(params){
    return fetch({
        url:'/defence/ka/schema',
        method:'get',
        // data:params,
       
    })
}
//知识网络下的点击节点获取相关数据
export function associatedNetwork(params){
    return fetch({
        url:'/defence/ka/networks/roam',
        method:'get',
        params,
       
    })
}
//知识检索下新增关系查询
export function AddRelationSearch(params){
    return fetch({
        url:'/defence/km/docs/relations/search',
        method:'get',
        params,
       
    })
}
//关系删除
export function DeleteRlelation(params){
    return fetch({
        url:'/defence/km/docs/relations/delete',
        method:'delete',
        params,
        headers:{
            isLoading :false,//设置成false就不会有加载效果
         }
    })
}
//登录
export function handleLogin(params){
    return fetch({
        url:'/defence/hub/user/login',
        method:'post',
        data:params,
        headers:{
            isLoading :false,//设置成false就不会有加载效果
         }
    })
}
//退出登录
export function logout(params){
    return fetch({
        url:'/defence/hub/user/logout',
        method:'get',
        params,
        headers:{
            isLoading :false,//设置成false就不会有加载效果
         }
    })
}
//后台管理用户列表

export function userList(params){
    return fetch({
        url:'/defence/hub/user/list',
        method:'get',
        params,
       
    })
}
//用户新增
export function adduser(params){
    return fetch({
        url:'/defence/hub/user/add',
        method:'post',
        data:params,
       
    })
}
//密码重置
export function Resetpwd(params){
    return fetch({
        url:'/defence/hub/user/reset_password',
        method:'post',
        data:params,
       
    })
}
//知识查询 - 关系模糊匹配
export function RelationSearch(params){
    return fetch({
        url:'/defence/km/relations/list',
        method:'get',
        params,
       
    })
}
//知识查询 - 实体模糊匹配
export function EntitySearch(params){
    return fetch({
        url:'/defence/km/entities/list',
        method:'get',
        params,
        headers:{
            isLoading :false,//设置成false就不会有加载效果
         }
    })
}
//模板删除
export function temDelete(params){
    return fetch({
        url:'/defence/kqa/template/delete',
        method:'DELETE',
        params,
       
    })
}
// 接过话数据解析
export function parsingData(params){
    return fetch({
        url:'/defence/kf/struct/parse',
        method:'get',
        params,
       
    })
}
// 日志
export function LogData(params){
    return fetch({
        url:'/defence/hub/req_log',
        method:'get',
        params,
       
    })
}
// 实体删除
export function EntityDelete(params){
    return fetch({
        url:'/defence/km/entities/delete',
        method:'DELETE',
         params
       
    })
}