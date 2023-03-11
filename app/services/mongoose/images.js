const Images = require("../../api/v1/images/model");

// ada 2 cara 
// 1. gunakan cara ini 
// 2. gunakan generate url images


// 2. gunakan generate url images
const generateUrlImages = async(req) => {
  const result = `uploads/${req.file.filename}`;
  return result;
}

// 1. gunakan cara ini 
const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.jpg`,
  });
  return result;
};

module.exports = { createImages, generateUrlImages };
