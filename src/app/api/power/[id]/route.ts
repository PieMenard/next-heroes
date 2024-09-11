import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const id = parseInt(req.url.split('/power/')[1])
        const power = await prisma.power.findUnique({
            where: { id }
        });
        return NextResponse.json({ success: true, data: power });
    } catch (error) {
        return NextResponse.json({ success: false, message: error });
    }
}