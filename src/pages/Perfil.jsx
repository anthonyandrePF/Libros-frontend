import React, { useEffect, useState } from "react";

export default function Perfil() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        Debes iniciar sesión para ver tu perfil ⚠️
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-8 mt-10 border border-gray-100">
      <div className="text-center mb-6">
        <span className="text-5xl">👤</span>
        <h2 className="text-2xl font-bold mt-2 text-gray-800">Mi Perfil</h2>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Nombre</p>
          <p className="font-medium text-gray-800">{user.nombre || "—"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Correo electrónico</p>
          <p className="font-medium text-gray-800">{user.email || "—"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Rol</p>
          <p className="font-medium text-gray-800">{user.rol || "Usuario"}</p>
        </div>

        <div className="pt-4">
          <button
            onClick={() => alert("Función de editar perfil próximamente ✏️")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
}
