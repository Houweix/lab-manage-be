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

  // 添加
  async addLab(data) {
    const {
      labData,
    } = data;

    const result = await this.app.mysql.insert('lab', labData);
    return result;
  }

  // 编辑实验室信息
  async editLab(labData) {
    //  需要更新的数据
    const row = labData;

    // 更新数据
    const result = await this.app.mysql.update('lab', row);
    return result;
  }

  // 删除实验室
  async deleteLab(data) {
    const {
      labId,
    } = data;


    const result = await this.app.mysql.delete('lab', { id: labId });
    return result;
  }
}

module.exports = LabService;
