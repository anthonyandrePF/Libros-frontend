import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    clave: "",
    direccion: "",
    telefono: "",
    idRol: { id: 1 }, // ejemplo: enviar rol cliente
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "http://localhost:8080/RestConectados/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data && data.token) {
          setSuccess("✅ Registro exitoso. Ahora puedes iniciar sesión.");
          localStorage.setItem("token", data.token);
        } else {
          setError("Error en el registro");
        }
      } else {
        const text = await response.text();
        setError("Error: " + text);
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-10 bg-white shadow-xl rounded-2xl border border-gray-200">
      {/* Encabezado con icono */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-blue-700 text-white p-3 rounded-full mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-blue-900 tracking-wide">
          ¡Regístrate!
        </h2>
        <p className="text-gray-600 text-sm mt-1 text-center">
          Completa el formulario para registrarte en LibroStore
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-center text-sm">{success}</p>
        )}

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Nombre
          </label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
            required
            className="w-full border border-black/60 rounded-md px-4 py-3 text-black text-base 
                       placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>

        {/* Apellido */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Apellido
          </label>
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            placeholder="Ingresa tu apellido"
            required
            className="w-full border border-black/60 rounded-md px-4 py-3 text-black text-base 
                       placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>

        {/* Correo */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Correo electrónico
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ejemplo@email.com"
            type="email"
            required
            className="w-full border border-black/60 rounded-md px-4 py-3 text-black text-base 
                       placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Contraseña
          </label>
          <input
            name="clave"
            value={form.clave}
            onChange={handleChange}
            placeholder="Crea una contraseña"
            type="password"
            required
            className="w-full border border-black/60 rounded-md px-4 py-3 text-black text-base 
                       placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Dirección
          </label>
          <input
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            placeholder="Ingresa tu dirección"
            className="w-full border border-black/60 rounded-md px-4 py-3 text-black text-base 
                       placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Teléfono
          </label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Ingresa tu número de teléfono"
            className="w-full border border-black/60 rounded-md px-4 py-3 text-black text-base 
                       placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-800 to-blue-500 text-white font-medium 
                     rounded-md shadow-md hover:from-blue-700 hover:to-blue-400 transition-all duration-300"
        >
          Crear cuenta
        </button>
      </form>

      {/* Enlace al login */}
      <p className="text-center text-gray-700 mt-8 text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-blue-700 font-semibold hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
