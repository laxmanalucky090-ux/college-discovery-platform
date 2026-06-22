import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// 1. GET Route: Fetch all saved colleges for the authenticated user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const savedColleges = await prisma.favorite.findMany({
      where: { userId },
      include: {
        college: true, // Join the College table data automatically
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Flatten data structure before returning to UI
    const colleges = savedColleges.map((fav) => fav.college);

    return NextResponse.json({ colleges }, { status: 200 });
  } catch (error) {
    console.error('❌ Error in GET /api/saved:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// 2. POST Route: Toggle save/unsave state of a college
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await request.json();
    const { collegeId } = body;

    if (!collegeId) {
      return NextResponse.json({ error: 'College ID is required.' }, { status: 400 });
    }

    // Check if the link already exists in the database
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_collegeId: {
          userId,
          collegeId,
        },
      },
    });

    if (existingFavorite) {
      // If it exists, remove it (Unfavorite)
      await prisma.favorite.delete({
        where: {
          userId_collegeId: {
            userId,
            collegeId,
          },
        },
      });
      return NextResponse.json({ message: 'College removed from favorites successfully.', isSaved: false }, { status: 200 });
    } else {
      // If it does not exist, save it (Favorite)
      await prisma.favorite.create({
        data: {
          userId,
          collegeId,
        },
      });
      return NextResponse.json({ message: 'College saved to favorites successfully.', isSaved: true }, { status: 201 });
    }
  } catch (error) {
    console.error('❌ Error in POST /api/saved:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}