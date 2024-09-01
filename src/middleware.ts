import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup';
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

// protected paths
export const config = {
    matcher:[
        '/dashboard',
        '/profile',
        '/login',
        '/signup',
        '/edit-image',
        '/generate-sign',
        '/edit-pdf'
    ]
}