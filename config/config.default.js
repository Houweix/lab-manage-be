'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  config.onerror = {
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      // console.log(err + '1');
      ctx.body = {
        msg: err.name,
        data: {},
        retcode: -100,
      };
      ctx.status = 200;
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1543325733589_2833';

  // add your config here
  config.middleware = [];

  //  以下是解决跨域代码
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '',
      // 数据库名
      database: 'labmanage',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return config;
};
