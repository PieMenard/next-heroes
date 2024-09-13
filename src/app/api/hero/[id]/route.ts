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

export async function PUT(req: NextRequest) {
  try {
    const id = parseInt(req.url.split('/hero/')[1]);
    const data = await req.json();

    // Fetch existing hero with powers to determine what to connect/disconnect
    const existingHero = await prisma.hero.findUnique({
      where: { id },
      include: { powers: true },
    });

    if (!existingHero) {
      return NextResponse.json(
        { success: false, message: 'hero not found' },
        { status: 404 }
      );
    }

    // Extract power IDs from the request body (mapping your structure)
    const updatedPowerIds = data.powers.map(
      (powerObj: any) => powerObj.power.id
    );

    // Get existing power IDs from the database
    const existingPowerIds = existingHero.powers.map((power) => power.id);

    // Powers to connect (new powers to add)
    const powersToConnect = updatedPowerIds
      .filter((id: number) => !existingPowerIds.includes(id))
      .map((id: number) => ({ id }));

    // Powers to disconnect (powers to remove)
    const powersToDisconnect = existingPowerIds
      .filter((id: number) => !updatedPowerIds.includes(id))
      .map((id: number) => ({ id }));

    // Update the hero, connecting and disconnecting powers
    const updatedHero = await prisma.hero.update({
      where: { id },
      data: {
        name: data.name,
        city: data.city,
        powers: {
          connect: powersToConnect,
          disconnect: powersToDisconnect,
        },
      },
      include: { powers: true }, // Return updated hero with powers
    });

    return NextResponse.json({ success: true, data: updatedHero });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
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

    const deleteHero = await prisma.hero.delete({ where: { id: hero.id } });

    return NextResponse.json({
      success: true,
      message: `${hero.name} deleted`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
