'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class AdminService extends Service {
  // 获取MD5加密
  async getMD5(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
  }

  // !! 登录--------------------------------

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
      result: result.password === await this.getMD5(pass),
      name: result.name,
    };
  }


  //  添加用户
  async tmpAdd(username, pass, identity) {
    pass = await this.getMD5(pass);
    const result = await this.app.mysql.insert(identity, {
      id: username,
      password: pass,
    });
    return result;
  }

  async studentAdd() {
    const {
      tableResults,
      role,
    } = this.ctx.request.body;

    for (let i = 0; i < tableResults.length; i++) {

      if (tableResults[i].name < 2 || tableResults[i].name > 10) {
        // 名字长度不正确
        return 'name';
      }

      try {
        await this.app.mysql.insert(role, {
          id: tableResults[i].id,
          // password: hashPass,
          password: await this.getMD5(tableResults[i].password),
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
  // 获取表中的信息
  async getAllData(role) {
    try {
      const result = await this.app.mysql.select(role);
      return result;
    } catch (error) {
      return error;
    }
  }

  async editUser(userData) {
    //  需要更新的数据
    const row = userData.editData;
    console.log(row);
    const role = userData.role;
    // 更新数据
    const result = await this.app.mysql.update(role, row);
    return result;
  }
}

module.exports = AdminService;
