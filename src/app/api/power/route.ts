import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const power = await prisma.power.create({
      data: {
        name: data.name,
        dangeorus: data.dangeorus,
        id: data.id,
      },
    });
    return NextResponse.json({ success: true, data: power });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
