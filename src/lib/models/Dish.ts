export interface Dish {
  id?: string;
  title: string;
  description: string;
  price: number;
  image: string;
  isFeatured: boolean;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Simulación de base de datos en memoria (en producción, usa una base de datos real)
let dishes: Dish[] = [
  {
    id: '1',
    title: 'Pasta Carbonara',
    description: 'Pasta con salsa cremosa de huevo, queso pecorino, panceta y pimienta negra.',
    price: 15.99,
    image: '/images/dishes/dish1.jpg',
    isFeatured: true,
    category: 'Platos Principales',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Ensalada César',
    description: 'Lechuga romana, crutones, queso parmesano y aderezo césar casero.',
    price: 12.99,
    image: '/images/dishes/dish2.jpg',
    isFeatured: true,
    category: 'Ensaladas',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Salmón a la Parrilla',
    description: 'Filete de salmón fresco con vegetales de temporada y salsa de eneldo.',
    price: 22.99,
    image: '/images/dishes/dish3.jpg',
    isFeatured: true,
    category: 'Especialidades',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Obtener todos los platos
export const getDishes = async (): Promise<Dish[]> => {
  return [...dishes];
};

// Obtener un plato por ID
export const getDishById = async (id: string): Promise<Dish | undefined> => {
  return dishes.find(dish => dish.id === id);
};

// Crear un nuevo plato
export const createDish = async (dishData: Omit<Dish, 'id' | 'createdAt' | 'updatedAt'>): Promise<Dish> => {
  const newDish: Dish = {
    ...dishData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  dishes.push(newDish);
  return newDish;
};

// Actualizar un plato existente
export const updateDish = async (id: string, dishData: Partial<Dish>): Promise<Dish | null> => {
  const index = dishes.findIndex(dish => dish.id === id);
  
  if (index === -1) return null;
  
  const updatedDish: Dish = {
    ...dishes[index],
    ...dishData,
    updatedAt: new Date(),
  };
  
  dishes[index] = updatedDish;
  return updatedDish;
};

// Eliminar un plato
export const deleteDish = async (id: string): Promise<boolean> => {
  const initialLength = dishes.length;
  dishes = dishes.filter(dish => dish.id !== id);
  return dishes.length < initialLength;
};

// Obtener platos destacados
export const getFeaturedDishes = async (limit: number = 3): Promise<Dish[]> => {
  return dishes
    .filter(dish => dish.isFeatured)
    .slice(0, limit);
};
