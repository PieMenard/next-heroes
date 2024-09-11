import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = parseInt(req.url.split('/hero/')[1]);
    const hero = await prisma.hero.findUnique({
      where: { id },
      include: { powers: true },
    });

    if (!hero)
      return NextResponse.json(
        { success: false, message: 'hero not found' },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data: hero });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
