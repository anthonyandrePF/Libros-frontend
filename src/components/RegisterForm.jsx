import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    clave: "",
    direccion: "",
    telefono: "",
    idRol: { id: 1 }, // ejemplo: enviar rol con id 2
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8080/RestConectados/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.token) {
          setSuccess("Registro exitoso ✅");
          localStorage.setItem("token", data.token);
          setTimeout(() => navigate("/"), 1000);
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        name="apellido"
        value={form.apellido}
        onChange={handleChange}
        placeholder="Apellido"
        required
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Correo"
        type="email"
        required
      />
      <input
        name="clave"
        value={form.clave}
        onChange={handleChange}
        placeholder="Contraseña"
        type="password"
        required
      />
      <input
        name="direccion"
        value={form.direccion}
        onChange={handleChange}
        placeholder="Dirección"
      />
      <input
        name="telefono"
        value={form.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
      />
      {/* si idRol es requerido, puedes usar un select que envie { id: X } */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
