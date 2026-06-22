import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters with production-ready defaults
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, parseInt(searchParams.get('limit') || '6', 10));
    const skip = (page - 1) * limit;

    // Construct resilient SQL conditions based on dynamic user input
    const whereClause: any = {};

    if (search) {
      whereClause.name = {
        contains: search,
        mode: 'insensitive', // Case-insensitive matching
      };
    }

    if (location) {
      whereClause.location = {
        contains: location,
        mode: 'insensitive',
      };
    }

    // Execute parallel database queries to maximize throughput optimization
    const [colleges, totalCount] = await Promise.all([
      prisma.college.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: {
          rating: 'desc', // Prioritize top-rated colleges first
        },
      }),
      prisma.college.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      colleges,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Database error in GET /api/colleges:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred while retrieving colleges.' },
      { status: 500 }
    );
  }
}