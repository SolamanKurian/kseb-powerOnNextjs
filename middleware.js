import { NextRequest, NextResponse } from 'next/server';

export function middleware(req) {
    const loginPage = '/login';
    const homePage = '/';
    const excludedPaths = [ '/public', '/api/auth', '/_next/static'];
  
    // Exclude requests to static files and other paths from being processed by middleware
    if (excludedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
      return NextResponse.next();
    }
  
    const sessionToken = req.cookies.get('next-auth.session-token')?.value;

  
    if (req.nextUrl.pathname === loginPage) {
      if (sessionToken) {
        return NextResponse.redirect(new URL(homePage, req.url));
      }
      return NextResponse.next();
    }
  
    if (!sessionToken) {
      return NextResponse.redirect(new URL(loginPage, req.url));
    }
  
    return NextResponse.next();
  }
  