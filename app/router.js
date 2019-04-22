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

  // 用户管理------------------------------------------------------
  // 登录
  router.post('/admin/login', controller.admin.login);

  //  处理上传的表格文件
  router.post('/admin/uploadResult', controller.admin.uploadResult);

  router.get('/admin/getAllData', controller.admin.getAllData);

  //  编辑用户
  router.post('/admin/editUser', controller.admin.editUser);

  //  搜索用户
  router.post('/admin/searchUser', controller.admin.searchUser);

  // 添加一条用户
  router.post('/admin/addUser', controller.admin.addUser);

  // 删除用户信息
  router.post('/admin/deleteUser', controller.admin.deleteUser);

  // 课程相关---
  router.get('/course/getAllData', controller.admin.getCourseData);


  // 实验室管理------------------------------------------------------

  router.get('/lab/getLabData', controller.admin.getLabData);


  // ! 以下是用户端接口（学生）


};
