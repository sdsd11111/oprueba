import { NextResponse } from 'next/server';
import { 
  getDishById, 
  updateDish, 
  deleteDish 
} from '@/lib/models/Dish';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const dish = await getDishById(params.id);
    
    if (!dish) {
      return NextResponse.json(
        { error: 'Plato no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(dish);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener el plato' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedDish = await updateDish(params.id, {
      ...body,
      price: body.price ? parseFloat(body.price) : undefined,
    });
    
    if (!updatedDish) {
      return NextResponse.json(
        { error: 'Plato no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedDish);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar el plato' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const success = await deleteDish(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Plato no encontrado' },
        { status: 404 }
      );
    }
    
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar el plato' },
      { status: 500 }
    );
  }
}
