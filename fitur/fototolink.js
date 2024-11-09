const axios = require('axios');
const FormData = require('form-data');

// Fungsi untuk mengubah foto menjadi link menggunakan API ImgBB
async function fotoToLink(bot, chatId, photo) {
  const imgbbApiKey = '9de4a193e1dac4d9a112f35664aa07bd';  // Ganti dengan API Key ImgBB yang baru

  try {
    // Mengambil foto dari pengguna
    const photoId = photo.file_id;

    console.log('Photo ID:', photoId);  // Log untuk memeriksa ID foto

    // Mengunduh gambar dari ID
    const fileUrl = await bot.getFileLink(photoId);
    console.log('File URL:', fileUrl);  // Log untuk memeriksa URL file

    // Mengambil data gambar
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    console.log('Gambar berhasil diambil');  // Log untuk memeriksa apakah gambar berhasil diambil

    // Membuat form data untuk upload ke ImgBB
    const form = new FormData();
    form.append('image', response.data, { filename: 'image.jpg' });

    // Meng-upload gambar ke ImgBB menggunakan API
    const uploadResponse = await axios.post('https://api.imgbb.com/1/upload?key=' + imgbbApiKey, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    console.log('Upload response:', uploadResponse.data);  // Log untuk memeriksa respons dari ImgBB

    const imageUrl = uploadResponse.data.data.url; // URL gambar yang di-upload ke ImgBB

    // Kirim URL gambar menggunakan ImgBB
    bot.sendMessage(chatId, `Gambar berhasil diupload! \nLink Gambar: ${imageUrl}`);
  } catch (error) {
    console.error('Error:', error);  // Log kesalahan
    bot.sendMessage(chatId, 'Terjadi kesalahan saat memproses gambar. Silakan coba lagi nanti.');
  }
}

module.exports = { fotoToLink };
