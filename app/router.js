'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;
  // router.get('/', controller.home.index);
  // router.get('/new', controller.home.new);
  // router.get('/admin', controller.admin.index);

  // ! 以下是管理系统接口（教师，管理员）

  // 登录
  router.post('/admin/login', controller.admin.login);

  //  临时 添加用户的接口（管理员
  router.post('/admin/tmpAdd', controller.admin.tmpAdd);


  //  处理上传的表格文件
  router.post('/admin/uploadResult', controller.admin.uploadResult);

  router.get('/admin/getAllData', controller.admin.getAllData);


  // ! 以下是用户端接口（学生）


};
