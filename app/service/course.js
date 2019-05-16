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

    const courseData = await this.app.mysql.select('course', {
      where: { id: courseId },
    });
    const courseName = courseData[0].name;

    // console.log('kaishi ------------');
    // console.log(courseName);
    // console.log('kaishi ------------');
    // return;

    await this.app.mysql.delete('class', { course: courseName });
    await this.app.mysql.delete('grade', { course: courseName });

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

  //  根据班级名获取课程
  async getFilterStudentData(data) {
    const { className, courseName } = data;

    console.log('---------');
    console.log(data);

    const result = await this.app.mysql.select('grade', {
      where: { class: className, course: courseName },
      columns: [ 'id', 'student', 'grade_val' ],
    });
    return result;
  }

  //  根据班级名获取学生list
  async getClassStudent(data) {
    const { className } = data;

    console.log('---------');
    console.log(data);

    const result = await this.app.mysql.select('student', {
      where: { class: className },
      columns: [ 'name' ],
    });
    return result;
  }

  //  添加成绩
  async addGrade(data) {
    const { postData } = data;

    console.log('---------');
    console.log(data);

    const result = await this.app.mysql.insert('grade', postData);
    return result;
  }

  //  编辑成绩
  async editGrade(data) {
    const { postData } = data;

    // 更新数据
    const result = await this.app.mysql.update('grade', postData);
    return result;
  }

  // 根据学生名字获取成绩
  async getGradeByName(data) {
    const { studentName } = data;

    console.log('---------');
    console.log(data);

    const result = await this.app.mysql.select('grade', {
      where: { student: studentName },
      columns: [ 'course', 'grade_val' ],
    });
    return result;
  }

  // 根据班级和课程删除关联记录
  async deleteCourseByClass(data) {
    const { className, courseName } = data;

    console.log('---------');
    console.log(data);

    //  删除关联表
    const result = await this.app.mysql.delete('class', {
      class: className,
      course: courseName,
    });

    //  删除成绩表
    await this.app.mysql.delete('grade', {
      class: className,
      course: courseName,
    });


    return result;
  }
}

module.exports = CourseService;
