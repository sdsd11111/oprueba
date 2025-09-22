import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo y nombre */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-12 h-12 relative">
            <Image
              src="/images/logo.png"
              alt="La Herencia Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-2xl font-bold text-gray-800">La Herencia</span>
        </Link>

        {/* Navegación */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="nav-link">Inicio</Link>
          <Link href="/menu" className="nav-link">Menú</Link>
          <Link href="/nosotros" className="nav-link">Nosotros</Link>
          <Link href="/galeria" className="nav-link">Galería y Reseñas</Link>
          <Link href="/contacto" className="nav-link">Contacto</Link>
        </nav>

        {/* Botón de reserva */}
        <div className="hidden md:block">
          <Link 
            href="/reservas" 
            className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-all"
          >
            Reserva ¡Aquí!
          </Link>
        </div>

        {/* Menú móvil */}
        <button className="md:hidden text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
