import React, { useState } from 'react';
import { validateEmail, validatePassword, validateRequired } from './Validation';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateRequired(formData.nombre)) newErrors.nombre = 'Nombre es requerido';
    if (!validateRequired(formData.apellido)) newErrors.apellido = 'Apellido es requerido';
    if (!validateEmail(formData.email)) newErrors.email = 'Email no es válido';
    if (!validatePassword(formData.password)) newErrors.password = 'Contraseña debe tener al menos 6 caracteres';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [success, setSuccess] = useState('');
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setApiError('');
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8080/RestConectados/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            clave: formData.password,
            direccion: formData.direccion,
            telefono: formData.telefono
          })
        });
        if (response.ok) {
          setSuccess('Registro exitoso');
          setFormData({
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            confirmPassword: '',
            direccion: '',
            telefono: ''
          });
        } else {
          setApiError('Error al registrar usuario');
        }
      } catch (err) {
        setApiError('Error de conexión con el servidor');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">Registro</h2>
      {success && <p className="text-green-500 text-xs mb-2">{success}</p>}
      {apiError && <p className="text-red-500 text-xs mb-2">{apiError}</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={`mt-1 block w-full border ${
            errors.nombre ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.nombre && (
          <p className="text-red-500 text-xs">{errors.nombre}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Apellido
        </label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          className={`mt-1 block w-full border ${
            errors.apellido ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.apellido && (
          <p className="text-red-500 text-xs">{errors.apellido}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`mt-1 block w-full border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Confirmar Contraseña
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`mt-1 block w-full border ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Dirección
        </label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          className={`mt-1 block w-full border ${
            errors.direccion ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.direccion && (
          <p className="text-red-500 text-xs">{errors.direccion}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className={`mt-1 block w-full border ${
            errors.telefono ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.telefono && (
          <p className="text-red-500 text-xs">{errors.telefono}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;