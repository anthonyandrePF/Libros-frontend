import React, { useState } from "react";
import { validateEmail, validatePassword, validateRequired } from "./Validation";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    direccion: "",
    telefono: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateRequired(formData.nombre))
      newErrors.nombre = "Nombre es requerido";
    if (!validateRequired(formData.apellido))
      newErrors.apellido = "Apellido es requerido";
    if (!validateEmail(formData.email)) newErrors.email = "Email no es válido";
    if (!validatePassword(formData.password))
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setApiError("");
    if (validateForm()) {
      try {
        const response = await fetch(
          "http://localhost:8080/RestConectados/usuarios",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre: formData.nombre,
              apellido: formData.apellido,
              email: formData.email,
              clave: formData.password,
              direccion: formData.direccion,
              telefono: formData.telefono,
            }),
          }
        );

        if (response.ok) {
          setSuccess("Registro exitoso 🎉");
          setFormData({
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            confirmPassword: "",
            direccion: "",
            telefono: "",
          });
          setTimeout(() => navigate("/login"), 1500);
        } else {
          setApiError("Error al registrar usuario");
        }
      } catch (err) {
        setApiError("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Crear una cuenta
        </h2>

        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}
        {apiError && <p className="text-red-600 text-sm mb-3">{apiError}</p>}

        {["nombre", "apellido", "email", "direccion", "telefono"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors[field] ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400`}
            />
            {errors[field] && (
              <p className="text-red-500 text-xs">{errors[field]}</p>
            )}
          </div>
        ))}

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
            } rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        <div className="mb-6">
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
            } rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Registrarse
        </button>

        <p className="text-sm text-center mt-6 text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            ¡Inicia sesión aquí!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
