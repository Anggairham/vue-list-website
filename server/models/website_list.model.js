// GUNAKAN createdAt,updateAt dari sequelize karena ketika melakukan crud sudah otomatis, tinggal mengatur timezone, jika manual harus menonaktifkan timestamp : false, lalu pada controller insert createdAt dan updateAt harus dimasukan kedalam field yang akan diinsert/update dan menggunakan fungsi NOW(), karena jika tidak nanti response ketika insert akan menjadi seperti ini {"createdAt":{"val":"CURRENT_TIMESTAMP()"},"updatedAt":{"val":"CURRENT_TIMESTAMP()"},"id":5,"nama":"nama","url":"url"}
module.exports = (sequelize, Sequelize) => {
    const Table = sequelize.define("website_list", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nama: {
        type: Sequelize.STRING(200)
      },
      url: {
        type: Sequelize.STRING(255)
      },
      // createdAt: {
      //   type: Sequelize.DATE,
      //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP()')
      // },
      // updatedAt: {
      //   type: Sequelize.DATE,
      //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()')
      // },
    },
    // {
    //   timestamps:false
    // }
    );
  
    return Table;
  };