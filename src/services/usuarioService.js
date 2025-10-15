// const API_BASE = 'http://localhost:8080';

// function getAuthHeaders() {
//     const token = localStorage.getItem('token');
//     if (!token) return { 'Content-Type': 'application/json' }; // sin token: sólo contenido
//     return {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//     };
// }

// export const getUsuarios = async () => {
//     const res = await fetch(`${API_BASE}/usuarios`, {
//         method: 'GET',
//         headers: getAuthHeaders()
//     });
//     if (!res.ok) throw new Error(await res.text());
//     return res.json();
// };

// export const getUsuarioById = async (id) => {
//     const res = await fetch(`${API_BASE}/usuarios/${id}`, {
//         method: 'GET',
//         headers: getAuthHeaders()
//     });
//     if (!res.ok) throw new Error(await res.text());
//     return res.json();
// };

// export const createUsuario = async (usuario) => {
//     const res = await fetch(`${API_BASE}/usuarios`, {
//         method: 'POST',
//         headers: getAuthHeaders(),
//         body: JSON.stringify(usuario)
//     });
//     if (!res.ok) throw new Error(await res.text());
//     return res.json();
// };

// export const updateUsuario = async (id, usuario) => {
//     const res = await fetch(`${API_BASE}/usuarios/${id}`, {
//         method: 'PUT',
//         headers: getAuthHeaders(),
//         body: JSON.stringify(usuario)
//     });
//     if (!res.ok) throw new Error(await res.text());
//     return res.json();
// };

// export const deleteUsuario = async (id) => {
//     const res = await fetch(`${API_BASE}/usuarios/${id}`, {
//         method: 'DELETE',
//         headers: getAuthHeaders()
//     });
//     if (!res.ok) throw new Error(await res.text());
//     return true;
// };