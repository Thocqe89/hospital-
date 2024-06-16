import { NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const { isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        // If the user is not authenticated, redirect to login page
        return NextResponse.redirect(new URL('/api/auth/login?post_login_redirect_url=/', request.url));
    }
    // If the user is authenticated, allow the request to proceed
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/patients','/search','/details/','/my-booking:path*']
    
  }