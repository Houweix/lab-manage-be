'use strict';

const Service = require('egg').Service;

class CourseService extends Service {
  async getAllData() {
    //  选择全部的课程信息
    try {
      const result = await this.app.mysql.select('course');
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = CourseService;
