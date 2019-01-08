'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
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
    const userinfo2 = await service.admin.checkUserInfo(username, password, identity);

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
        },
        retcode: 0,
      };
    }
  }

  // 临时添加用户
  async tmpAdd() {
    const {
      ctx,
      service,
    } = this;

    const {
      username,
      identity,
      password,
    } = ctx.request.body;

    const result = await service.admin.tmpAdd(username, password, identity);
    if (result) {
      ctx.body = {
        msg: '添加成功',
        data: {},
        retcode: 0,
      };
    } else {
      ctx.body = {
        msg: '添加失败',
        data: {},
        retcode: -100,
      };
    }
  }


  // 处理管理后台添加
  async uploadResult() {
    const {
      ctx,
      service,
    } = this;

    const {
      tableTitle,
      tableResults,
      role,
    } = ctx.request.body;

    // console.log(tableTitle);
    // console.log(tableResults);
    // console.log(role);

    // JSON.parse(tableTitle).forEach(elem => {
    tableResults.forEach(elem => {
      console.log(elem);
      console.log(typeof elem);
    });

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
    } else {
      ctx.body = {
        msg: result.code,
        data: {},
        retcode: 1001,
      };
    }
  }

  // 获取当前分类的所有信息
  async getAllData() {
    const {
      ctx,
      service,
    } = this;
    const result = await service.admin.getAllData(ctx.query.role);
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
        data: [],
        retcode: -1,
      };
    }
  }

  // {
  //   ctx.body = {
  //     msg: 'ok',
  //     data: {},
  //     retcode: 0,
  //   };
  // }
}


module.exports = AdminController;
