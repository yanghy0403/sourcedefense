let data = {
    
    nodes: [{
      name: 'F-35闪电II战斗机',
      category: 0
    }, {
      name: '美国',
      category: 1
    }, {
      name: '隐身战机',
      category: 1
    }, {
      name: '雅克-141战斗机',
      category: 1
    }, {
      name: 'x-35验证机',
      category: 1
    }, {
      name: '爱国者飞弹',
      category: 2
    }, {
      name: '高层大气研究卫星',
      category: 2
    }, {
      name: 'B-10轰炸机',
      category: 2
    }, {
      name: '波音食物鸟',
      category: 2
    },
    {
        name: '航空器',
        category: 2
      },
      {
        name: '苏联',
        category: 2
      },
      {
        name: '战斗轰炸机',
        category: 2
      },
      {
        name: '第五代战斗机',
        category: 2
      },
      {
        name: '罗马丁公司',
        category: 1
      }
],
    
    links: [{
      source: 'F-35闪电II战斗机',
      target: '第五代战斗机',
      name: '上级类别'
    }, {
      source: 'F-35闪电II战斗机',
      target: '隐身战机',
      name: '生产商'
    }, {
      source: 'F-35闪电II战斗机',
      target: '美国',
      name: '国家'
    }, {
      source: 'F-35闪电II战斗机',
      target: '罗马丁公司',
      name: '生产'
    }, {
      source: '罗马丁公司',
      target: '高层大气研究卫星',
      name: '主制造商'
    }, 
    {
        source: '罗马丁公司',
        target: '航天器',
        name: '主制造商'
      },
    {
        source: '罗马丁公司',
        target: 'B-10轰炸机',
        name: '主制造商'
      },
    {
      source: '隐身战机',
      target: '波音食物鸟',
      name: '上级类别'
    }, {
      source: '10轰炸机',
      target: '苏联',
      name: '国家'
    }, {
      source: 'F-35闪电II战斗机',
      target: '战斗轰炸机',
      name: '上级类别'
    }, 
    {
        source: '爱国者飞弹',
        target: '罗马丁公司',
        name: '生厂商'
      },
      {
        source: '波音食物鸟',
        target: '罗马丁公司',
        name: '生厂商'
      },
      {
        source: '雅克-141战斗机',
        target: '苏联',
        name: '国家'
      }, 
      {
        source: '雅克-141战斗机',
        target: 'F-35闪电II战斗机',
        name: '衍生机型'
      }, 
      {
        source: '雅克-141战斗机',
        target: 'x-35验证机',
        name: '衍生机型'
      }, 
      {
        source: '雅克-141战斗机',
        target: '航空器',
        name: '上级类别'
      }, 
      {
        source: 'F-35闪电II战斗机',
        target: '雅克-141战斗机',
        name: '衍生机型'
      }, 
]
  };
  export default data;