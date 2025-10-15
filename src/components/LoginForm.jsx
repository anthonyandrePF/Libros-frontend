import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const [nombre, setNombre] = useState("");
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
      const response = await fetch("http://localhost:8080/RestConectados/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: nombre,
          clave: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.token) {
          setSuccess("Login exitoso ✅");
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", JSON.stringify(data));
          setTimeout(() => {
            navigate("/");
            setTimeout(() => window.location.reload(), 400);
          }, 1000);
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
    <form
      onSubmit={handleSubmit}
      className="max-w-lg w-full bg-white p-14 rounded-2xl shadow-2xl border border-blue-100 space-y-8"
    >
      {/* Ícono superior */}
      <div className="flex flex-col items-center">
        <div className="bg-[#002B5B] text-white p-3 rounded-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4h16v13H6.5A2.5 2.5 0 004 19.5V4z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-semibold text-center text-[#001B3A] tracking-wide">
          Iniciar sesión
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Ingresa tus datos para acceder a tu cuenta
        </p>
      </div>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      {success && <p className="text-green-600 text-sm text-center">{success}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Nombre de usuario o correo
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border border-black/60 rounded-md px-4 py-3 text-black text-base 
                     placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
          placeholder="Ingrese su nombre o correo"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-black/60 rounded-md px-4 py-3 text-black text-base 
                     placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
          placeholder="Ingrese su contraseña"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-800 to-blue-500 text-white font-medium 
                   rounded-md shadow-md hover:from-blue-700 hover:to-blue-400 transition-all duration-300"
      >
        Iniciar sesión
      </button>

      <p className="text-sm text-center mt-6 text-gray-700">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-blue-700 font-semibold hover:underline">
          ¡Regístrate aquí!
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
