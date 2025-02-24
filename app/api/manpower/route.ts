import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function GET(req: Request) {
  const url = new URL(req.url);
  const dateParam = url.searchParams.get('date');

  try {
    if (!dateParam) {
      return NextResponse.json(
        { success: false, message: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Parse the date parameter
    const date = new Date(dateParam);

    // Find manpower data for the specific date
    const manpower = await prisma.manpower.findMany({
      where: {
        date: date,
      },
    });

    return NextResponse.json({ success: true, data: manpower });
  } catch (error) {
    console.error('Error fetching manpower data by date:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch manpower data' },
      { status: 500 }
    );
  }
}


// Helper function to calculate total
const calculateTotal = (data: {
    operator?: number;
    helper?: number;
    ironInput?: number;
    cutting?: number;
    finishing?: number;
    quality?: number;
    staff?: number;
    cleaner?: number;
    loader?: number;
  }): number => {
    return (
      (data.operator || 0) +
      (data.helper || 0) +
      (data.ironInput || 0) +
      (data.cutting || 0) +
      (data.finishing || 0) +
      (data.quality || 0) +
      (data.staff || 0) +
      (data.cleaner || 0) +
      (data.loader || 0)
    );
  };

// POST API: Create a new manpower entry
export async function POST(req: Request) {
    try {
      const body = await req.json();
  
      // Calculate the total
      const total = calculateTotal(body);
  
      // Create a new manpower entry
      const newManpower = await prisma.manpower.create({
        data: {
          date: body.date || new Date(),
          operator: body.operator || 0,
          helper: body.helper || 0,
          ironInput: body.ironInput || 0,
          cutting: body.cutting || 0,
          finishing: body.finishing || 0,
          quality: body.quality || 0,
          staff: body.staff || 0,
          cleaner: body.cleaner || 0,
          loader: body.loader || 0,
          total, // Use the calculated total
        },
      });
  
      return NextResponse.json({ success: true, data: newManpower });
    } catch (error) {
      console.error('Error creating manpower entry:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to create manpower entry' },
        { status: 500 }
      );
    }
  }
