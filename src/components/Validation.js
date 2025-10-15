// import React from 'react';

// export const validateEmail = (email) => {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// };

// export const validatePassword = (password) => {
//   return password.length >= 6; // Minimum length for password
// };

// export const validateRequired = (value) => {
//   return value.trim() !== '';
// };

// export const validateUserFields = (user) => {
//   const errors = {};
  
//   if (!validateRequired(user.name)) {
//     errors.name = 'El nombre es requerido';
//   }
  
//   if (!validateRequired(user.email) || !validateEmail(user.email)) {
//     errors.email = 'El correo es inválido';
//   }
  
//   if (!validateRequired(user.password) || !validatePassword(user.password)) {
//     errors.password = 'La contraseña debe tener al menos 6 caracteres';
//   }
  
//   // Add more validations as per Usuario_Entity.java fields
  
//   return errors;
// };