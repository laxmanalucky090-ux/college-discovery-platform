import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Strict input validation checks
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password fields are all required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long for security.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Verification check: Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email address already exists.' },
        { status: 409 } // 409 Conflict status code
      );
    }

    // Cryptographic security hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save records to PostgreSQL via Prisma
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { message: 'User account registered successfully.', user: newUser },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Error inside POST /api/auth/signup:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred during registration.' },
      { status: 500 }
    );
  }
}