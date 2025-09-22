'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Dish {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const sampleDishes: Dish[] = [
  {
    id: 1,
    title: 'Pasta Carbonara',
    description: 'Pasta con salsa cremosa de huevo, queso pecorino, panceta y pimienta negra.',
    price: 15.99,
    image: '/images/dishes/dish1.jpg',
  },
  {
    id: 2,
    title: 'Ensalada César',
    description: 'Lechuga romana, crutones, queso parmesano y aderezo césar casero.',
    price: 12.99,
    image: '/images/dishes/dish2.jpg',
  },
  {
    id: 3,
    title: 'Salmón a la Parrilla',
    description: 'Filete de salmón fresco con vegetales de temporada y salsa de eneldo.',
    price: 22.99,
    image: '/images/dishes/dish3.jpg',
  },
];

const DishSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // En producción, esto vendría de una API
  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setDishes(sampleDishes);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === dishes.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? dishes.length - 1 : prev - 1));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (dishes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No hay platos disponibles en este momento.</p>
      </div>
    );
  }

  const currentDish = dishes[currentSlide];

  return (
    <div className="relative w-full max-w-4xl mx-auto my-12 overflow-hidden rounded-xl shadow-2xl">
      {/* Imagen del plato */}
      <div className="relative h-96 w-full">
        <Image
          src={currentDish.image}
          alt={currentDish.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-8 text-white">
          <h3 className="text-3xl font-bold mb-2">{currentDish.title}</h3>
          <p className="text-lg mb-4">{currentDish.description}</p>
          <p className="text-2xl font-bold text-primary">${currentDish.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Controles del slider */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Plato anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Siguiente plato"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores de paginación */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {dishes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${currentSlide === index ? 'bg-primary w-6' : 'bg-white bg-opacity-50'}`}
            aria-label={`Ir al plato ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DishSlider;
