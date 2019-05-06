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

  //  添加课程
  async addCourse(data) {
    const {
      postData,
    } = data;

    const result = await this.app.mysql.insert('course', postData);
    return result;
  }

  // 编辑课程
  async editCourse(data) {
    const {
      postData,
    } = data;

    // 更新数据
    const result = await this.app.mysql.update('course', postData);
    return result;
  }

  async deleteCourse(data) {
    const {
      courseId,
    } = data;


    const result = await this.app.mysql.delete('course', { id: courseId });
    return result;
  }

}

module.exports = CourseService;
