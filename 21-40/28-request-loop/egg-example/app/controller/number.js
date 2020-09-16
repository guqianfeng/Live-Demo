'use strict';

const Controller = require('egg').Controller;

class NumberController extends Controller {
  async create() {
    const { ctx } = this;
    const {random, floor} = Math;
    const number = floor(random() * 100) + 1;
    ctx.body = {
      number,
      code: number > 90 ? 10000 : floor(random() * 99999),
      msg: number > 90 ? `这就是我们想要的数字` : `这数字不行`,
    };
  }
}

module.exports = NumberController;
