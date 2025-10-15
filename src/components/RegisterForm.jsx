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
          // ❌ Eliminamos la redirección automática
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Registro</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          type="email"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="clave"
          value={form.clave}
          onChange={handleChange}
          placeholder="Contraseña"
          type="password"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Registrarse
        </button>
      </form>

      {/* 🔹 Enlace debajo del formulario */}
      <p className="text-center text-gray-600 mt-4">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
