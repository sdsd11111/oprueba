import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaYelp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4">La Herencia</h3>
            <p className="text-gray-400">
              Ofreciendo los sabores tradicionales más auténticos en un ambiente cálido y familiar.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaYelp size={24} />
              </a>
            </div>
          </div>

          {/* Horario */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Horario</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Lunes - Jueves:</span>
                <span>11:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Viernes - Sábado:</span>
                <span>11:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo:</span>
                <span>12:00 PM - 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/menu" className="text-gray-400 hover:text-white transition-colors">Nuestro Menú</Link></li>
              <li><Link href="/reservas" className="text-gray-400 hover:text-white transition-colors">Reservaciones</Link></li>
              <li><Link href="/galeria" className="text-gray-400 hover:text-white transition-colors">Galería</Link></li>
              <li><Link href="/contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <address className="not-italic space-y-2">
              <p className="text-gray-400">123 Calle Principal</p>
              <p className="text-gray-400">Ciudad, Estado 12345</p>
              <p className="text-gray-400">
                Tel: <a href="tel:+1234567890" className="hover:text-white transition-colors">(123) 456-7890</a>
              </p>
              <p className="text-gray-400">
                Email: <a href="mailto:info@laherencia.com" className="hover:text-white transition-colors">info@laherencia.com</a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} La Herencia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
