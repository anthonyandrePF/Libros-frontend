import React from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-700">
      <div className="w-full max-w-lg p-12 space-y-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
        <h2 className="text-3xl font-semibold text-center text-blue-900 tracking-wide">
          Bienvenido a LibroStore
        </h2>
        
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
