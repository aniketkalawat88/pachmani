// // middleware.js

// import { NextRequest, NextResponse } from 'next/server';
// import { verify } from 'jsonwebtoken';

// const secret = 'your_secret_key';
// export async function middleware(req:NextRequest) {
//   const token = req.cookies.get('authToken') || localStorage.getItem('token');
//   if (!token) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
//   try {
//     const decoded = verify(token as string, secret  as string);
//     if (decoded?.role !== 'admin') {
//       return NextResponse.redirect(new URL('/unauthorized', req.url));
//     }
//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
// }
// s