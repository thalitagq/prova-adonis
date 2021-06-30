"use strict";

const User = use("App/Models/User");
const Mail = use("Mail");
class UserController {
  async store({ request, response }) {
    try {
      const data = request.only(["username", "email", "password"]);

      const user = await User.create(data);

      await Mail.send(
        ["emails.new_account"],
        {
          username: user.username,
        },
        (message) => {
          message
            .to(user.email)
            .from("thalitagq@outlook.com", "Thalita")
            .subject("New Account");
        }
      );
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: "Something went wrong",
        },
      });
    }
  }

  async show({ params }) {
    const user = await User.findByOrFail("id", params.id);

    return user;
  }

  async update({ params, request }) {
    const user = await User.findByOrFail("id", params.id);
    const data = request.only(["username", "email"]);

    user.merge(data);

    await user.save();
    return user;
  }

  async destroy({ params }) {
    const user = await User.findByOrFail("id", params.id);

    await user.delete();
  }
}

// eslint-disable-next-line no-undef
module.exports = UserController;
