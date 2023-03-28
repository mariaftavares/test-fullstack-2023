const {encryptPassword} = require('../../utils/cryptography');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { name: 'Admin',email:"admin@admin.com",password:encryptPassword("admin@123"),role:"admin"},
    { name: 'User',email:"user@user.com",password:encryptPassword("user@123"),role:"user"}
  ]);
};
