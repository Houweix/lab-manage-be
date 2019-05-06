'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  // 登录
  async login() {
    //  获取ctx 和 service
    const {
      ctx,
      service,
    } = this;

    const {
      username,
      identity,
      password,
    } = ctx.request.body;

    const userinfo1 = await service.admin.checkUser(username, identity);

    //  用户不存在
    if (!userinfo1) {
      ctx.body = {
        msg: '该用户不存在',
        data: [],
        retcode: -100,
      };
      return;
    }
    const userinfo2 = await service.admin.checkUserInfo(
      username,
      password,
      identity
    );

    //  密码不正确
    if (!userinfo2.result) {
      ctx.body = {
        msg: '密码不正确',
        data: [],
        retCode: -101,
      };
    } else {
      ctx.body = {
        msg: '登录成功',
        data: {
          name: userinfo2.name,
          identity,
          id: username,
        },
        retcode: 0,
      };
    }
  }

  // !! 用户管理-----------------------------

  //  用户管理-批量添加
  async uploadResult() {
    const {
      ctx,
      service,
    } = this;

    const {
      role,
    } = ctx.request.body;

    // console.log(tableTitle);
    // console.log(tableResults);
    // console.log(role);

    // JSON.parse(tableTitle).forEach(elem => {

    let result;
    if (role === 'student') {
      result = await service.admin.studentAdd();
    } else if (role === 'teacher') {
      result = await service.admin.teacherAdd();
    } else {
      result = await service.admin.adminAdd();
    }
    // console.log(result);
    // console.log(111111);
    if (result === 'ok') {
      ctx.body = {
        msg: 'ok',
        data: {},
        retcode: 0,
      };
    } else if (result === 'name') {
      ctx.body = {
        msg: '名字长度不规范',
        data: {},
        retcode: 1002,
      };
    } else {
      ctx.body = {
        msg: result.code,
        data: {},
        retcode: 1002,
      };
    }
  }

  // 用户管理-获取当前分类的所有信息
  async getAllData() {
    const {
      ctx,
      service,
    } = this;
    const result = await service.admin.getAllData(ctx.query.role);
    // console.log(result);

    if (result) {
      ctx.body = {
        msg: 'ok',
        data: result,
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: [],
        retcode: -1,
      };
    }
  }

  //  修改用户信息
  async editUser() {
    const {
      ctx,
      service,
    } = this;

    const data = ctx.request.body;
    console.log(data);

    const result = await service.admin.editUser(data);
    console.log(result);

    if (result.affectedRows !== 0) {
      ctx.body = {
        msg: 'ok',
        data: [],
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: result,
        retcode: -1,
      };
    }
  }

  // 搜索用户 by name
  async searchUser() {
    const {
      ctx,
      service,
    } = this;

    const data = ctx.request.body;
    console.log('传来的数据：------------------------');
    console.log(data);

    const result = await service.admin.searchUser(data);
    console.log(result);

    if (result && data.role === 'student') {
      ctx.body = {
        msg: 'ok',
        data: [ result ],
        retcode: 0,
      };
    } else if (result && data.role === 'teacher') {
      ctx.body = {
        msg: 'ok',
        data: result,
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: result,
        retcode: -1,
      };
    }
  }

  async addUser() {
    const {
      ctx,
      service,
    } = this;

    const data = ctx.request.body;
    console.log('传来的数据：------------------------');
    console.log(data);


    const result = await service.admin.addUser(data);
    console.log(result);

    if (result.affectedRows === 1) {
      ctx.body = {
        msg: 'ok',
        data: [],
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: result,
        retcode: -1,
      };
    }
  }

  // 删除一条用户的数据
  async deleteUser() {
    const {
      ctx,
      service,
    } = this;

    const data = ctx.request.body;

    const result = await service.admin.deleteUser(data);
    console.log(result);

    if (result.affectedRows === 1) {
      ctx.body = {
        msg: 'ok',
        data: [],
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: result,
        retcode: -1,
      };
    }
  }

  //  获取管理员列表
  async getAdmin() {
    const {
      ctx,
      service,
    } = this;

    const result = await service.admin.getAdmin();
    console.log(result);

    if (result) {
      ctx.body = {
        msg: 'ok',
        data: result,
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: result,
        retcode: -1,
      };
    }
  }

  //  修改个人密码----------------------
  async editPassword() {
    const {
      ctx,
      service,
    } = this;


    const data = ctx.request.body;

    //  首先验证数据库原始密码是否正确

    const result = await service.admin.editPassword(data);

    if (result === 0) {
      ctx.body = {
        msg: 'ok',
        data: [],
        retcode: 0,
      };
    } else if (result === 2) {
      ctx.body = {
        msg: '原始密码不正确',
        data: [],
        retcode: 2,
      };
    } else {
      ctx.body = {
        msg: '网络错误，稍后重试',
        data: [],
        retcode: result,
      };
    }
  }

  // !! 课程管理
  //  获取全部课程
  async getCourseData() {
    const {
      ctx,
      service,
    } = this;

    const result = await service.course.getAllData();

    if (result) {
      ctx.body = {
        msg: 'ok',
        data: result,
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: [],
        retcode: -1,
      };
    }
  }


  //  !!实验室管理
  //  获取全部实验室
  async getLabData() {
    const {
      ctx,
      service,
    } = this;

    const result = await service.lab.getAllData();

    if (result) {
      ctx.body = {
        msg: 'ok',
        data: result,
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: [],
        retcode: -1,
      };
    }
  }

  // 添加实验室信息
  async addLab() {
    const {
      ctx,
      service,
    } = this;

    const data = ctx.request.body;
    console.log('传来的数据：------------------------');
    console.log(data);


    const result = await service.lab.addLab(data);
    console.log(result);

    if (result.affectedRows === 1) {
      ctx.body = {
        msg: 'ok',
        data: [],
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: result,
        retcode: -1,
      };
    }
  }

  //  修改实验室信息
  async editLab() {
    const {
      ctx,
      service,
    } = this;

    const data = ctx.request.body;
    console.log(data);

    const result = await service.lab.editLab(data.labData);
    console.log(result);

    if (result.affectedRows !== 0) {
      ctx.body = {
        msg: 'ok',
        data: [],
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: result,
        retcode: -1,
      };
    }
  }

  // 删除实验室
  async deleteLab() {
    const {
      ctx,
      service,
    } = this;

    const data = ctx.request.body;

    const result = await service.lab.deleteLab(data);
    console.log(result);

    if (result.affectedRows === 1) {
      ctx.body = {
        msg: 'ok',
        data: [],
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: result,
        retcode: -1,
      };
    }
  }

  //  !!公告管理
  //  获取全部公告
  async getPostData() {
    const {
      ctx,
      service,
    } = this;

    const result = await service.post.getAllData();

    if (result) {
      ctx.body = {
        msg: 'ok',
        data: result,
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: [],
        retcode: -1,
      };
    }
  }

  // 添加公告信息
  async addPost() {
    const {
      ctx,
      service,
    } = this;

    const data = ctx.request.body;
    console.log('传来的数据：------------------------');
    console.log(data);


    const result = await service.post.addPost(data);
    console.log(result);

    if (result.affectedRows === 1) {
      ctx.body = {
        msg: 'ok',
        data: [],
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: result,
        retcode: -1,
      };
    }
  }

  //  修改公告信息
  async editPost() {
    const {
      ctx,
      service,
    } = this;

    const data = ctx.request.body;
    console.log(data);

    const result = await service.post.editPost(data);
    console.log(result);

    if (result.affectedRows !== 0) {
      ctx.body = {
        msg: 'ok',
        data: [],
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: result,
        retcode: -1,
      };
    }
  }

  // 删除公告
  async deletePost() {
    const {
      ctx,
      service,
    } = this;

    const data = ctx.request.body;

    const result = await service.post.deletePost(data);
    console.log(result);

    if (result.affectedRows === 1) {
      ctx.body = {
        msg: 'ok',
        data: [],
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: result,
        retcode: -1,
      };
    }
  }

  // !!课程相关-----------------------
  // 添加课程信息
  async addCourse() {
    const {
      ctx,
      service,
    } = this;

    const data = ctx.request.body;
    console.log('传来的数据：------------------------');
    console.log(data);

    const result = await service.course.addCourse(data);
    console.log(result);

    if (result.affectedRows === 1) {
      ctx.body = {
        msg: 'ok',
        data: [],
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: result,
        retcode: -1,
      };
    }
  }

  //  修改课程信息
  async editCourse() {
    const {
      ctx,
      service,
    } = this;

    const data = ctx.request.body;
    console.log(data);

    const result = await service.course.editCourse(data);
    console.log(result);

    if (result.affectedRows !== 0) {
      ctx.body = {
        msg: 'ok',
        data: [],
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: result,
        retcode: -1,
      };
    }
  }

  // 删除课程
  async deleteCourse() {
    const {
      ctx,
      service,
    } = this;

    const data = ctx.request.body;

    const result = await service.course.deleteCourse(data);
    console.log(result);

    if (result.affectedRows === 1) {
      ctx.body = {
        msg: 'ok',
        data: [],
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: 'error',
        data: result,
        retcode: -1,
      };
    }
  }
}

module.exports = AdminController;
