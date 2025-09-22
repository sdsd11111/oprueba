import DishSlider from '@/components/ui/DishSlider';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section relative">
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">La Herencia</h1>
          <h2 className="text-2xl md:text-4xl font-medium mb-8 text-primary">Plato del Día</h2>
          
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-white mb-8">
              Descubre nuestros exquisitos platos preparados con los ingredientes más frescos y recetas tradicionales que han pasado de generación en generación.
            </p>
            
            <Link 
              href="/menu" 
              className="btn-primary inline-block text-lg px-8 py-3"
            >
              ¡Pide el Plato del Día!
            </Link>
          </div>
        </div>
      </section>

      {/* Nuestros Platos Destacados */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Nuestros Platos Destacados</h2>
          
          {/* Slider de Platos */}
          <DishSlider />
          
          <div className="text-center mt-8">
            <Link 
              href="/menu" 
              className="inline-block bg-primary text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-opacity-90 transition-all"
            >
              Ver Menú Completo
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Sobre Nosotros */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Sobre Nosotros</h2>
            <p className="text-lg text-gray-600 mb-8">
              En La Herencia, nos enorgullece ofrecer una experiencia culinaria única que combina recetas tradicionales con ingredientes frescos y de la más alta calidad. Nuestro restaurante familiar ha sido un referente en la gastronomía local durante más de 20 años.
            </p>
            <Link 
              href="/nosotros" 
              className="inline-block border-2 border-primary text-primary px-8 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition-all"
            >
              Conoce Nuestra Historia
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
