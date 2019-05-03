'use strict';

const Service = require('egg').Service;

class PostService extends Service {
  async getAllData() {
    //  选择全部的课程信息
    try {
      const result = await this.app.mysql.select('post');
      return result;
    } catch (error) {
      return error;
    }
  }

  // 添加
  async addPost(data) {
    const {
      postData,
    } = data;

    const result = await this.app.mysql.insert('post', postData);
    return result;
  }

  // 编辑公告信息
  async editPost(data) {
    const {
      postData,
    } = data;

    // 更新数据
    const result = await this.app.mysql.update('post', postData);
    return result;
  }

  // 删除公告
  async deletePost(data) {
    const {
      postId,
    } = data;


    const result = await this.app.mysql.delete('post', { id: postId });
    return result;
  }
}

module.exports = PostService;
