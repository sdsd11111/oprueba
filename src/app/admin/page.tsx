'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';

interface Dish {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  isFeatured: boolean;
  category: string;
}

export default function AdminPanel() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    isFeatured: false,
    category: 'Platos Principales',
  });
  const router = useRouter();

  // Cargar platos
  const fetchDishes = async () => {
    try {
      const response = await fetch('/api/dishes');
      const data = await response.json();
      setDishes(data);
    } catch (error) {
      console.error('Error al cargar los platos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Abrir modal para crear/editar plato
  const openModal = (dish: Dish | null = null) => {
    if (dish) {
      setEditingDish(dish);
      setFormData({
        title: dish.title,
        description: dish.description,
        price: dish.price.toString(),
        image: dish.image,
        isFeatured: dish.isFeatured,
        category: dish.category,
      });
    } else {
      setEditingDish(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        image: '',
        isFeatured: false,
        category: 'Platos Principales',
      });
    }
    setShowModal(true);
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingDish 
        ? `/api/dishes/${editingDish.id}`
        : '/api/dishes';
      
      const method = editingDish ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Error al guardar el plato');
      }
      
      setShowModal(false);
      fetchDishes(); // Recargar la lista de platos
    } catch (error) {
      console.error('Error al guardar el plato:', error);
      alert('Error al guardar el plato. Por favor, inténtalo de nuevo.');
    }
  };

  // Eliminar plato
  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este plato?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/dishes/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar el plato');
      }
      
      fetchDishes(); // Recargar la lista de platos
    } catch (error) {
      console.error('Error al eliminar el plato:', error);
      alert('Error al eliminar el plato. Por favor, inténtalo de nuevo.');
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    // Aquí iría la lógica de cierre de sesión
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header del panel de administración */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Panel de Administración - La Herencia</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Gestión de Platos</h2>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
          >
            <FaPlus /> Agregar Plato
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {dishes.map((dish) => (
                <li key={dish.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 relative">
                      <Image
                        src={dish.image || '/images/placeholder-dish.jpg'}
                        alt={dish.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {dish.title}
                          {dish.isFeatured && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Destacado
                            </span>
                          )}
                        </h3>
                        <p className="text-lg font-semibold text-gray-900">${dish.price.toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-1">{dish.description}</p>
                      <p className="text-sm text-gray-500">{dish.category}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex space-x-2">
                      <button
                        onClick={() => openModal(dish)}
                        className="p-2 text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(dish.id)}
                        className="p-2 text-red-600 hover:text-red-800"
                        title="Eliminar"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {dishes.length === 0 && (
                <li className="text-center py-8 text-gray-500">
                  No hay platos registrados. ¡Agrega tu primer plato!
                </li>
              )}
            </ul>
          </div>
        )}
      </main>

      {/* Modal para crear/editar plato */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                {editingDish ? 'Editar Plato' : 'Agregar Nuevo Plato'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Título del Plato <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descripción <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Precio <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Categoría
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    >
                      <option>Platos Principales</option>
                      <option>Entradas</option>
                      <option>Ensaladas</option>
                      <option>Postres</option>
                      <option>Bebidas</option>
                      <option>Especialidades</option>
                      <option>Otros</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    URL de la Imagen <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    required
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                    ¿Plato destacado? (aparecerá en la sección principal)
                  </label>
                </div>
                
                {formData.image && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-700 mb-2">Vista previa de la imagen:</p>
                    <div className="relative h-48 w-full rounded-md overflow-hidden border border-gray-200">
                      <Image
                        src={formData.image}
                        alt="Vista previa"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {editingDish ? 'Actualizar Plato' : 'Agregar Plato'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
