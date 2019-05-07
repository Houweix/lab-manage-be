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
    const { postData } = data;

    const result = await this.app.mysql.insert('course', postData);
    return result;
  }

  // 编辑课程
  async editCourse(data) {
    const { postData } = data;

    // 更新数据
    const result = await this.app.mysql.update('course', postData);
    return result;
  }

  async deleteCourse(data) {
    const { courseId } = data;

    const result = await this.app.mysql.delete('course', { id: courseId });
    return result;
  }

  async getClass() {
    //  选择全部的课程信息
    const result = await this.app.mysql.query(
      'select distinct class from student'
    );
    return result;
  }

  //  根据班级名获取课程
  async getCourseByClass(data) {
    const { className } = data;

    const result = await this.app.mysql.select('class', {
      where: { class: className },
      columns: [ 'course' ],
    });
    console.log(result);
    return result;
  }

  //  根据班级名获取课程
  async addCourseByClass(data) {
    const { className, courseName } = data;

    console.log('---------');
    console.log(data);

    const result = await this.app.mysql.insert('class', {
      class: className,
      course: courseName,
    });
    return result;
  }
}

module.exports = CourseService;
