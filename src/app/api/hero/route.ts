import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const power = await prisma.hero.create({
            data: {
                name: data.name,
                city: data.city,
                powers: {
                    connect: data.powers.map((powerData: any) => ({
                        id: powerData.power.id,
                    })),
                },
            },
            include: { powers: true }
        });
        return NextResponse.json({ success: true, data: power });
    } catch (err) {
        return NextResponse.json({ success: false, message: err }, { status: 500 });
    }
}
