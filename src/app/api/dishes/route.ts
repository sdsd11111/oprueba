import { NextResponse } from 'next/server';
import { 
  getDishes, 
  createDish, 
  Dish as DishType 
} from '@/lib/models/Dish';

export async function GET() {
  try {
    const dishes = await getDishes();
    return NextResponse.json(dishes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los platos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validación básica
    if (!body.title || !body.description || !body.price || !body.image) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }
    
    const newDish = await createDish({
      title: body.title,
      description: body.description,
      price: parseFloat(body.price),
      image: body.image,
      isFeatured: body.isFeatured || false,
      category: body.category || 'Otros',
    });
    
    return NextResponse.json(newDish, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear el plato' },
      { status: 500 }
    );
  }
}
