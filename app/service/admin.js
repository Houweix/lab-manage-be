'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class AdminService extends Service {
  // 获取MD5加密
  async getMD5(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
  }


  // 根据角色获取初始id
  async getInitId(role) {
    // 设置初始插入id
    const roleMap = [{
      name: 'student',
      id: '100000',
    },
    {
      name: 'teacher',
      id: '200000',
    },
    {
      name: 'admin',
      id: '300000',
    },
    ];

    //   寻找对象
    const finded = roleMap.find(elem => {
      return elem.name === role;
    });

    return finded.id;
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
      result: result.password === (await this.getMD5(pass)),
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


    const search = await this.app.mysql.select(role, {
      orders: [
        [ 'id', 'desc' ],
      ],
      limit: 1,
    });

    //  当前表为空
    if (!search[0].id) {
      const initId = await this.getInitId(role);
      tableResults[0].id = initId;
    } else {
      //  不为空
      tableResults[0].id = parseInt(search[0].id) + 1;
    }


    //  插入第一条
    await this.app.mysql.insert(role, {
      id: tableResults[0].id,
      // password: hashPass,
      password: await this.getMD5(tableResults[0].password),
      name: tableResults[0].name,
      sex: tableResults[0].sex,
    });


    //  插入其他的
    for (let i = 1; i < tableResults.length; i++) {
      if (tableResults[i].name < 2 || tableResults[i].name > 10) {
        // 名字长度不正确
        return 'name';
      }

      const search = await this.app.mysql.select(role, {
        orders: [
          [ 'id', 'desc' ],
        ],
        limit: 1,
      });

      try {
        await this.app.mysql.insert(role, {
          id: parseInt(search[0].id) + 1,
          // password: hashPass,
          password: await this.getMD5(tableResults[i].password),
          name: tableResults[i].name,
          sex: tableResults[0].sex,
        });
      } catch (error) {
        return error;
      }
    }

    return 'ok';
  }

  // 教师账户的添加
  /*   async teacherAdd() {
    pass = await this.getHash(pass);
    const result = await this.app.mysql.insert(identity, {
      id: username,
      password: pass,
    });
    return result;
  } */

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
  //  编辑用户信息
  async editUser(userData) {
    //  需要更新的数据
    const row = userData.editData;
    console.log(row);
    const role = userData.role;
    // 更新数据
    const result = await this.app.mysql.update(role, row);
    return result;
  }

  // 搜索用户 by name
  async searchUser(userData) {
    const {
      role,
      name,
    } = userData;

    const result = await this.app.mysql.get(role, {
      name,
    });
    return result;
  }

  //  统一的添加用户
  async addUser(data) {
    const {
      role,
      userData,
    } = data;

    const tuserData = JSON.parse(JSON.stringify(userData));

    const md5 = await this.getMD5(tuserData.password);
    tuserData.password = md5;


    const search = await this.app.mysql.select(role, {
      orders: [
        [ 'id', 'desc' ],
      ],
      limit: 1,
    });

    //  当前表为空
    if (!search[0].id) {
      const initId = await this.getInitId(role);
      tuserData.id = initId;
    } else {
      //  不为空
      tuserData.id = parseInt(search[0].id) + 1;
    }

    const result = await this.app.mysql.insert(role, tuserData);
    return result;
  }


  // 添加一条用户信息
}

module.exports = AdminService;
