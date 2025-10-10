// src/services/libroService.js
export async function getLibrosDestacados() {
  try {
    const response = await fetch("http://localhost:8080/RestConectados/ediciones");
    if (!response.ok) throw new Error("Error al cargar libros destacados");
    return await response.json();
  } catch (error) {
    console.error("Error al cargar libros destacados:", error);
    return [];
  }
}
