export async function getAutores() {
  try {
    const response = await fetch("http://localhost:8080/RestConectados/autores");
    if (!response.ok) throw new Error("Error al obtener autores");
    return await response.json();
  } catch (error) {
    console.error("Error al cargar autores:", error);
    return [];
  }
}
 