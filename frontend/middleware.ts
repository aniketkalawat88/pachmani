// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export function middleware(request: NextRequest) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const url = request.nextUrl.clone();

  if (!isAuthenticated) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
