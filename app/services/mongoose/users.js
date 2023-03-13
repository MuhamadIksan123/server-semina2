const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");

const createOrganizer = async (req) => {
  const { organizer, email, password, confirmPassword, role, name } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("password dan confirmPassword tidak sama");
  }

  const result = await Organizers.create({ organizer });

  const users = await Users.create({
    name,
    email,
    password,
    role,
    organizer: result._id,
  });

  delete users._doc.password;

  return users;
};

const createUsers = async (req, res) => {
  const { name, password, role, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password dan Konfirmasi password tidak cocok");
  }

  const result = await Users.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });

  return result;
};

module.exports = { createOrganizer, createUsers };
