const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const categorySchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, 'minimal panjang huruf kategori'],
      maxlength: [20, 'maksimal panjang huruf kategori'],
      required: [true, 'kategori harus diisi'],
    },
  },
  { timestamps: true }
);

module.exports = model('Category', categorySchema);
