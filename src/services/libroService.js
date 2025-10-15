// src/services/libroService.js
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/RestConectados';

export async function getLibrosDestacados() {
  try {
    const response = await fetch(`${API_BASE}/ediciones`);
    if (!response.ok) throw new Error("Error al cargar libros destacados");
    return await response.json();
  } catch (error) {
    console.error("Error al cargar libros destacados:", error);
    return [];
  }
}

export async function getLibrosPorCategoria(nombre) {
  const res = await fetch(`${API_BASE}/libros/categoria/${encodeURIComponent(nombre)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
