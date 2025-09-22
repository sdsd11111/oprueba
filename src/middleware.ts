import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ruta de la solicitud actual
  const path = request.nextUrl.pathname;
  
  // Rutas públicas que no requieren autenticación
  const isPublicPath = path === '/admin/login' || path === '/';
  
  // Verificar si el usuario está autenticado
  // NOTA: En producción, usa un sistema de autenticación más seguro
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';
  
  // Redirigir al inicio de sesión si el usuario no está autenticado y no está en una ruta pública
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
  }
  
  // Redirigir al panel de administración si el usuario está autenticado y trata de acceder al login
  if (isAuthenticated && path === '/admin/login') {
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }
  
  return NextResponse.next();
}

// Configuración de las rutas que activarán el middleware
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
