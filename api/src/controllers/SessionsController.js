const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const knex = require("../database/knex");
const authConfig = require("../configs/auth");
const AppError = require("../utils/AppError");

class SessionsController {
  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response
      .cookie("token", token, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 15, // 15 min
      })
      .send();
  }

  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   */
  async delete(request, response) {
    return response
      .cookie("token", "", {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 2, // 2 seconds
      })
      .send();
  }
}

module.exports = SessionsController;
