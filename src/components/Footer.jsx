import React from "react";
import { Link } from "react-router-dom";
// ...existing code...

export default function Footer() {
  const añoActual = new Date().getFullYear();

  return (
    <footer className="footer-principal">
      {/* Sección principal del footer */}
      <div className="footer-contenido">
        <div className="container">
          <div className="footer-grid">
            {/* Información de la empresa */}
            <div className="footer-seccion">
              <h3 className="footer-titulo">Libro Store</h3>
              <p className="footer-descripcion">
                Tu librería de confianza con la mejor selección de libros. Descubre nuevos mundos a través de la lectura.
              </p>
              <div className="redes-sociales" aria-label="Redes sociales">
                <a href="https://facebook.com/bookify" target="_blank" rel="noopener noreferrer" className="red-social" title="Facebook">📘</a>
                <a href="https://twitter.com/bookify" target="_blank" rel="noopener noreferrer" className="red-social" title="Twitter">🐦</a>
                <a href="https://instagram.com/bookify" target="_blank" rel="noopener noreferrer" className="red-social" title="Instagram">📷</a>
                <a href="https://youtube.com/bookify" target="_blank" rel="noopener noreferrer" className="red-social" title="YouTube">📺</a>
              </div>
            </div>

            {/* Atención al cliente */}
            <div className="footer-seccion">
              <h4 className="footer-subtitulo">Atención al Cliente</h4>
              <ul className="footer-lista">
                <li><Link to="/contacto" className="footer-enlace">Contacto</Link></li>
                <li><Link to="/ayuda" className="footer-enlace">Centro de Ayuda</Link></li>
                <li><Link to="/envios" className="footer-enlace">Información de Envíos</Link></li>
                <li><Link to="/devoluciones" className="footer-enlace">Devoluciones</Link></li>
                <li><Link to="/terminos" className="footer-enlace">Términos y Condiciones</Link></li>
              </ul>
            </div>

            {/* Información de contacto */}
            <div className="footer-seccion">
              <h4 className="footer-subtitulo">Contáctanos</h4>
              <div className="contacto-info">
                <div className="contacto-item">
                  <span className="contacto-icono">📍</span>
                  <span className="contacto-texto">Av. Principal 123, Lima</span>
                </div>
                <div className="contacto-item">
                  <span className="contacto-icono">📞</span>
                  <span className="contacto-texto">+1 234 567 8900</span>
                </div>
                <div className="contacto-item">
                  <span className="contacto-icono">✉️</span>
                  <span className="contacto-texto">MundoDePapel@hotmail.com</span>
                </div>
                <div className="contacto-item">
                  <span className="contacto-icono">🕒</span>
                  <span className="contacto-texto">Lun - Vie: 9:00 - 18:00</span>
                </div>
              </div>
            </div>

            {/* Métodos de Pago */}
            <div className="footer-seccion">
              <h4 className="footer-subtitulo">Formas de Pago</h4>
              <div className="metodos-pago">
                <div className="pago-iconos">
                  <span className="pago-icono" title="Tarjeta de crédito">💳</span>
                  <span className="pago-icono" title="Transferencia bancaria">🏦</span>
                  <span className="pago-icono" title="Pago móvil">📱</span>
                  <span className="pago-icono" title="Efectivo/Pago contra entrega">💰</span>
                </div>
              </div>
              <p className="footer-descripcion" style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                Paga de forma segura con tu método favorito.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="footer-inferior">
        <div className="container">
          <div className="footer-inferior-contenido">
            <div className="copyright">
              <p>© {añoActual} Bookify. Todos los derechos reservados.</p>
            </div>
            <div className="enlaces-legales">
              <Link to="/privacidad" className="enlace-legal">Política de Privacidad</Link>
              <span className="separador">|</span>
              <Link to="/cookies" className="enlace-legal">Política de Cookies</Link>
              <span className="separador">|</span>
              <Link to="/terminos" className="enlace-legal">Términos de Uso</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos locales (puedes moverlos a un archivo CSS) */}
      <style>{`
        .footer-principal {
          background: #002e4d;
          color: #f5f0e6;
          margin-top: auto;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .footer-contenido { padding: 3rem 0 2rem; }
        .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        .footer-seccion { margin-bottom: 1rem; }
        .footer-titulo { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; color: #ffd18a; }
        .footer-subtitulo { font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; color: #f5f0e6; border-bottom: 2px solid #ffd18a; padding-bottom: 0.5rem; }
        .footer-descripcion { line-height: 1.6; margin-bottom: 1.5rem; color: rgba(245,240,230,0.85); }
        .redes-sociales { display: flex; gap: 1rem; }
        .red-social { display: inline-flex; align-items: center; justify-content: center; width: 45px; height: 45px; background: rgba(255,255,255,0.06); border-radius: 12px; text-decoration: none; font-size: 1.3rem; transition: all 0.3s; border: 1px solid rgba(255,255,255,0.06); }
        .red-social:hover { background: rgba(255,255,255,0.12); transform: translateY(-4px) scale(1.05); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
        .footer-lista { list-style: none; padding: 0; }
        .footer-lista li { margin-bottom: 0.5rem; }
        .footer-enlace { color: rgba(245,240,230,0.85); text-decoration: none; transition: all 0.3s ease; display: inline-block; }
        .footer-enlace:hover { color: #ffd18a; transform: translateX(5px); }
        .contacto-info { display:flex; flex-direction:column; gap:0.75rem; }
        .contacto-item { display:flex; align-items:center; gap:0.5rem; }
        .contacto-icono { font-size:1.1rem; width:20px; }
        .contacto-texto { color: rgba(245,240,230,0.85); font-size:0.9rem; }
        .metodos-pago { margin-top: 1.5rem; }
        .pago-iconos { display:flex; gap:0.5rem; }
        .pago-icono { display:inline-flex; align-items:center; justify-content:center; width:40px; height:28px; background: rgba(255,255,255,0.06); border-radius:8px; font-size:1.1rem; border:1px solid rgba(255,255,255,0.06); transition: all 0.3s; }
        .pago-icono:hover { background: rgba(255,255,255,0.12); transform: scale(1.05); box-shadow: 0 4px 12px rgba(0,0,0,0.12); }
        .footer-inferior { background: rgba(0,46,77,0.85); padding:1rem 0; border-top:1px solid rgba(255,255,255,0.06); }
        .footer-inferior-contenido { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; }
        .copyright p { margin:0; color: rgba(245,240,230,0.85); font-size:0.9rem; }
        .enlaces-legales { display:flex; align-items:center; gap:0.5rem; }
        .enlace-legal { color: rgba(245,240,230,0.85); text-decoration:none; font-size:0.9rem; transition: color 0.3s ease; }
        .enlace-legal:hover { color: #ffd18a; }
        .separador { color: rgba(245,240,230,0.5); }

        @media (max-width:768px) {
          .footer-grid { grid-template-columns: 1fr; gap:2rem; }
          .footer-inferior-contenido { flex-direction:column; text-align:center; }
          .enlaces-legales { flex-wrap:wrap; justify-content:center; }
          .redes-sociales { justify-content:center; }
        }
        @media (max-width:480px) {
          .footer-contenido { padding:2rem 0 1rem; }
        }
      `}</style>
    </footer>
  );
}

// ...existing code...