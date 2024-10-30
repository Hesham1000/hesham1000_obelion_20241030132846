module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      email: '[email1]',
      password: '[hashedPassword1]'
    },
    {
      email: '[email2]',
      password: '[hashedPassword2]'
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
