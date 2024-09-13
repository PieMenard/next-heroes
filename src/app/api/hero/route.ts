import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Extract query parameters from the URL
    const { searchParams } = new URL(req.url);
    const offset = parseInt(searchParams.get('offset') || '0');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Fetch heroes with pagination
    const heroes = await prisma.hero.findMany({
      select: { name: true, id: true },
      skip: offset,
      take: limit,
    });

    const results = {
      offset: offset,
      limit: limit,
      results: heroes,
    };

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const hero = await prisma.hero.create({
      data: {
        name: data.name,
        city: data.city,
        powers: {
          connect: data.powers.map((powerData: any) => ({
            id: powerData.power.id,
          })),
        },
      },
      include: { powers: true },
    });
    return NextResponse.json({ success: true, data: hero });
  } catch (err) {
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
}
