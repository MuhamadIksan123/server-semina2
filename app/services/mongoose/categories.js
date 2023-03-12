const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors/index");

const getAllCategories = async () => {
  const result = await Categories.find();
  if (!result) throw new NotFoundError("Belum ada data yang diinputkan");
  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findById(id);
  if (!result)
    throw new NotFoundError(`Kategori dengan id: ${id} tidak ditemukan`);
  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  const check = await Categories.findOne({ name });
  if (check) throw new BadRequestError("kategori nama duplikat");

  const result = await Categories.create({ name });
  return result;
};

const updateCategories = async (req) => {
  const { name } = req.body;
  const { id } = req.params;

  const check = await Categories.findOne({ name, id: { $ne: id } });
  if (check) throw new BadRequestError("Nama kategori duplikat");

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );
  if (!result)
    throw new NotFoundError(`Kategori dengan id: ${id} tidak ditemukan`);

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findByIdAndDelete(id);
  if (!result)
    throw new NotFoundError(`Kategori dengan id: ${id} tidak ditemukan`);
  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories
};
