let data = {
    categories: ["机构", "论文", "专利", "奖励", "标准"],
    nodes: [
      {
        name: "清华大学",
        id: "6aa560f14d8343b488b8963a48c72e65",
        category: "机构",
        influence: 60
      },
      {
        name: "北京大学",
        id: "ee99180eab564b6bafd4c655cfb5c886",
        category: "机构",
        influence: 60
      },
      {
        number: 2551,
        name: "论文：2551",
        id: "bfacab115297487281bfd2e7cffe6036",
        category: "论文"
      },
      {
        number: 1344,
        name: "专利：1344",
        id: "79618009f42940789df1664eda9b198f",
        category: "专利"
      },
      {
        number: 2,
        name: "奖励：2",
        id: "4931d29a3c9046e5987462090f28eba5",
        category: "奖励"
      }
    ],
    links: [
      {
       
        sourceType: "人才",
        targetType: "论文",
        source: "6aa560f14d8343b488b8963a48c72e65",
        target: "bfacab115297487281bfd2e7cffe6036"
      },
      {
       
        source: "ee99180eab564b6bafd4c655cfb5c886",
        target: "bfacab115297487281bfd2e7cffe6036"
      },
      {
       
        sourceType: "人才",
        targetType: "专利",
        source: "6aa560f14d8343b488b8963a48c72e65",
        target: "79618009f42940789df1664eda9b198f"
      },
      {
       
        source: "79618009f42940789df1664eda9b198f",
        target:'ee99180eab564b6bafd4c655cfb5c886'
      },
      {
       
        sourceType: "人才",
        targetType: "奖励",
        source: "6aa560f14d8343b488b8963a48c72e65",
        target: "4931d29a3c9046e5987462090f28eba5"
      },
      {
       
        source: "ee99180eab564b6bafd4c655cfb5c886",
        target: "4931d29a3c9046e5987462090f28eba5"
      }
    ]
  };
  export default data;