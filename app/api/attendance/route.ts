import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST: Create Attendance
export async function POST(request: Request) {
  const body = await request.json();
  try {
    const attendance = await prisma.attendance.create({
      data: body,
    });
    return NextResponse.json(attendance, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create attendance' }, { status: 500 });
  }
}


// GET: Fetch Attendance
export async function GET() {
  try {
    const attendance = await prisma.attendance.findMany();
    return NextResponse.json(attendance, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}
