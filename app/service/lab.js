'use strict';

const Service = require('egg').Service;

class LabService extends Service {
  async getAllData() {
    //  选择全部的课程信息
    try {
      const result = await this.app.mysql.select('lab');
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = LabService;
