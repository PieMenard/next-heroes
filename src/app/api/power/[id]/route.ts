import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = parseInt(req.url.split('/power/')[1]);
    const power = await prisma.power.findUnique({
      where: { id },
    });

    if (!power)
      return NextResponse.json(
        { success: false, message: 'power not found' },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data: power });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    if (data.id)
      return NextResponse.json(
        { success: false, message: 'Cannot modify id' },
        { status: 500 }
      );
    const id = parseInt(req.url.split('/power/')[1]);
    const power = await prisma.power.update({
      where: { id },
      data: {
        name: data.name,
        dangerous: data.dangerous,
      },
    });
    if (!power)
      return NextResponse.json(
        { success: false, message: 'power not found' },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data: power });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error updating power',
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = parseInt(req.url.split('/power/')[1]);
    const power = await prisma.power.findUnique({
      where: { id },
    });

    if (!power)
      return NextResponse.json(
        { success: false, message: 'power not found' },
        { status: 404 }
      );

    const deletePower = await prisma.power.delete({
      where: { id: power.id },
    });

    return NextResponse.json({ success: true, message: 'power deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
