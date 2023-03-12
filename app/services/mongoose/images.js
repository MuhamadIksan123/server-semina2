const Images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors/index");

// ada 2 cara
// 1. gunakan cara ini
// 2. gunakan generate url images

// 2. gunakan generate url images
// const generateUrlImages = async(req) => {
//   const result = `uploads/${req.file.filename}`;
//   return result;
// }

// 1. gunakan cara ini
const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.jpg`,
  });
  return result;
};

// tambahkan function checking Image
const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  console.log(result);

  if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id :  ${id}`);

  return result;
};

module.exports = { createImages, checkingImage };
