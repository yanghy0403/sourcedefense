module.exports = Object.freeze({
    development: {//测试
      sshIp: '39.106.187.165', // ssh地址 服务器地址
      sshUserName: 'root', // ssh 用户名
      //登录方式 (二选一, 不用的方式注释掉)
      // privateKey: 'C:/Users/Administrator/.ssh/id_rsa', //方式一 使用秘钥登录服务器
      password: 'Km159870610',  //方式二 用密码连接服务器
      wwwPath: '/usr/local/nginx/html', // 需要上传的服务器目录地址 如 /usr/local/nginx/html/prodName
      distFolder: 'build', // 打包后的文件夹 默认 /dist
      loadingStyle: 'arrow4', // 打包后的文件夹 默认 /dist
      buildShell: 'yarn build', // 自定义打包命令 若为空则会直接部署，不会打包
      readyTimeout: 80000 // 超时时间
    },
    production: {//正式
      sshIp: 'xx.xxx.xx.xx',
      sshUserName: 'xxxxx',
      password: 'xxxxxx',
      wwwPath: '',
      loadingStyle: 'arrow4',
      buildShell: 'npm run build',
      readyTimeout: 5000 
    }
  })