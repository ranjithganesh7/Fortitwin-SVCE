import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, password, role } = body;

    // Validate the input
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Verify the email and password against your database
    // 2. Create a session or token
    // 3. Return user information

    // For demo purposes, mock successful login with simple validation
    // This is just for simulation; in a real app you'd check against a database
    if (email === 'test@example.com' && password === 'password123') {
      return NextResponse.json({
        success: true,
        user: {
          name: 'Test User',
          email,
          role,
        }
      });
    }
    
    // Simulate successful login for any credentials in this demo
    return NextResponse.json({
      success: true,
      user: {
        name: email.split('@')[0], // Use part of the email as a mock name
        email,
        role,
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 