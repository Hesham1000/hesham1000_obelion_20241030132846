const nodemailer = require('nodemailer');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db',
  dialect: 'mysql',
});

// Define User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users', // Ensure it matches the table name in the database
  timestamps: false,
});

class EmailUtils {
  static async sendEmail(to, subject, text) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@example.com',
      to: to,
      subject: subject,
      text: text,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw new Error('Error sending email');
    }
  }
}

module.exports = { EmailUtils, User };