'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcrypt');

class AdminService extends Service {
  //  获取hash
  async getHash(orgin) {
    //  生成salt的迭代次数
    const saltRounds = 10;
    //  随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //  获取hash值
    return bcrypt.hashSync(orgin, salt);
  }

  // ------------------------------------------------------

  //  登录，检查用户名
  async checkUser(username, identity) {
    const result = await this.app.mysql.get(identity, {
      id: username,
    });
    return result;
  }

  // 登录，检查用户名和密码是否正确
  async checkUserInfo(username, pass, identity) {
    // const passHash = await this.getHash(pass);

    const result = await this.app.mysql.get(identity, {
      id: username,
    });

    return {
      result: bcrypt.compareSync(pass, result.password),
      name: result.name,
    };
  }

  //  添加用户
  async tmpAdd(username, pass, identity) {
    pass = await this.getHash(pass);
    const result = await this.app.mysql.insert(identity, {
      id: username,
      password: pass,
    });
    return result;
  }

  // todo 账户添加----------------------------------------
  // 学生账户的添加
  async studentAdd() {
    const {
      tableResults,
      role,
    } = this.ctx.request.body;

    for (let i = 0; i < tableResults.length; i++) {
      const hashPass = await this.getHash(tableResults[i].password);

      try {
        await this.app.mysql.insert(role, {
          id: tableResults[i].id,
          password: hashPass,
          name: tableResults[i].name,
        });
      } catch (error) {
        return error;
      }
    }

    return 'ok';
  }

  // 教师账户的添加
  async teacherAdd() {
    pass = await this.getHash(pass);
    const result = await this.app.mysql.insert(identity, {
      id: username,
      password: pass,
    });
    return result;
  }

  // 管理员账户的添加
  async adminAdd() {
    pass = await this.getHash(pass);
    const result = await this.app.mysql.insert(identity, {
      id: username,
      password: pass,
    });
    return result;
  }

  //  todo 查询各类表的所有数据
  // 获取表中的信息
  async getAllData(role) {
    try {
      const result = await this.app.mysql.select(role);
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = AdminService;
