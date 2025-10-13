import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const [nombre, setNombre] = useState(""); // Cambiamos email → nombre
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nombre || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/RestConectados/usuarios/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: nombre,
            clave: password, // backend espera 'clave'
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data) {
          setSuccess("Login exitoso ✅");
          localStorage.setItem("usuario", JSON.stringify(data));
          setTimeout(() => navigate("/"), 1000);
        } else {
          setError("Usuario o contraseña incorrectos");
        }
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Iniciar sesión
        </h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nombre de usuario
          </label>
          <input
            type="text" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400"
            placeholder="Ingrese su nombre"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-400"
            placeholder="Ingrese su contraseña"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Iniciar Sesión
        </button>

        <p className="text-sm text-center mt-6 text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            ¡Regístrate aquí!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
