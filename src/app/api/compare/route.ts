import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idA = searchParams.get('idA');
    const idB = searchParams.get('idB');

    // Validation: Require both parameters before hitting database
    if (!idA || !idB) {
      return NextResponse.json(
        { error: 'Both idA and idB query parameters are required for comparison.' },
        { status: 400 }
      );
    }

    // Parallel processing optimization to fetch both entities at the same time
    const [collegeA, collegeB] = await Promise.all([
      prisma.college.findUnique({ where: { id: idA } }),
      prisma.college.findUnique({ where: { id: idB } }),
    ]);

    return NextResponse.json({
      collegeA: collegeA || null,
      collegeB: collegeB || null,
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Database error in GET /api/compare:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred while building the comparison matrix.' },
      { status: 500 }
    );
  }
}