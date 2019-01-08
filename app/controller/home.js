'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {

    const a = await this.service.admin.insertUser();
    console.log(a);
    this.ctx.body = {
      message: 'ok',
      retcode: 0,
      data: a,
    };
    this.ctx.status = Number('201');
  }

  async new() {
    this.ctx.body = 'hi, new';
  }
}

module.exports = HomeController;
