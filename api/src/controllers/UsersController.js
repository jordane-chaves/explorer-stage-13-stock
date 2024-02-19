const knex = require("../database/knex");
const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const checkUserExists = await knex("users").where({ email });

    if (checkUserExists.length > 0) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

     await knex("users").insert({ name, email, password: hashedPassword });

    return response.status(201).json();
  }

  async index(request, response) {
    const { id } = request.user

    const user = await knex("users").where('id', id).first();

    delete user.password

    return response.json({
      user,
    })
  }
}

module.exports = UsersController;