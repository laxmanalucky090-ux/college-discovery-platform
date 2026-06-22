import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Next.js 15 requires awaiting dynamic parameters safely
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json(
        { error: 'College ID is required.' },
        { status: 400 }
      );
    }

    const college = await prisma.college.findUnique({
      where: { id },
    });

    if (!college) {
      return NextResponse.json(
        { error: 'College not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(college, { status: 200 });
  } catch (error) {
    console.error(`❌ Database error in GET /api/colleges/[id]:`, error);
    return NextResponse.json(
      { error: 'An internal server error occurred while retrieving college data.' },
      { status: 500 }
    );
  }
}