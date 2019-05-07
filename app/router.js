'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;

  // ! 以下是管理系统接口（教师，管理员）

  // !!用户管理------------------------------------------------------
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
  //  获取管理员列表
  router.get('/admin/getAdmin', controller.admin.getAdmin);

  //  !!修改个人密码---------------------------------用户端也能用-----------------
  router.post('/admin/editPass', controller.admin.editPassword);

  // !!实验室管理------------------------------------------------------
  // 获取全部
  router.get('/lab/getLabData', controller.admin.getLabData);
  // 添加实验室
  router.post('/lab/addLab', controller.admin.addLab);
  // 编辑实验室
  router.post('/lab/editLab', controller.admin.editLab);
  //  删除
  router.post('/lab/deleteLab', controller.admin.deleteLab);

  // !!公告管理------------------------------------------------------
  // 获取全部
  router.get('/post/getData', controller.admin.getPostData);
  // 添加实验室
  router.post('/post/addData', controller.admin.addPost);
  // 编辑实验室
  router.post('/post/editData', controller.admin.editPost);
  //  删除
  router.post('/post/deleteData', controller.admin.deletePost);


  // !!课程相关------------------------------------
  // 获取全部课程
  router.get('/course/getAllData', controller.admin.getCourseData);
  // 添加课程
  router.post('/course/addData', controller.admin.addCourse);
  // 编辑课程
  router.post('/course/editData', controller.admin.editCourse);
  //  删除科课程
  router.post('/course/deleteData', controller.admin.deleteCourse);


  //  !!班级课程分配
  // 获取所有的班级
  router.get('/class/getClass', controller.admin.getClass);

  //  根据班级名获取课程
  router.post('/class/getCourseByClass', controller.admin.getCourseByClass);
  //  为班级添加课程
  router.post('/class/addCourseByClass', controller.admin.addCourseByClass);

  // ! 以下是用户端接口（学生）

};
