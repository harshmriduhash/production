import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const RATES = {
  operatorGeneral: 100, // Example rate
  operatorOvertime: 150,
  helperGeneral: 80,
  helperOvertime: 120,
  cuttingGeneral: 90,
  cuttingOvertime: 130,
  finishingGeneral: 110,
  finishingOvertime: 140,
  qualityGeneral: 95,
  qualityOvertime: 125,
  staff: 70,
};

export async function POST(request: Request) {
  const body = await request.json();
  try {
    // Calculate individual expenses
    const operatorExpense = body.operatorGeneral * RATES.operatorGeneral +
      body.operatorOvertime * RATES.operatorOvertime;

    const helperExpense = body.helperGeneral * RATES.helperGeneral +
      body.helperOvertime * RATES.helperOvertime;

    const cuttingExpense = body.cuttingGeneral * RATES.cuttingGeneral +
      body.cuttingOvertime * RATES.cuttingOvertime;

    const finishingExpense = body.finishingGeneral * RATES.finishingGeneral +
      body.finishingOvertime * RATES.finishingOvertime;

    const qualityExpense = body.qualityGeneral * RATES.qualityGeneral +
      body.qualityOvertime * RATES.qualityOvertime;

    const staffExpense = body.staff * RATES.staff;

    // Sum total expenses
    const totalExpense = operatorExpense + helperExpense + cuttingExpense +
      finishingExpense + qualityExpense + staffExpense;

    // Create the daily expense entry
    const dailyExpense = await prisma.dailyExpense.create({
      data: {
        date: new Date(body.date),
        operatorGeneral: body.operatorGeneral,
        operatorOvertime: body.operatorOvertime,
        helperGeneral: body.helperGeneral,
        helperOvertime: body.helperOvertime,
        cuttingGeneral: body.cuttingGeneral,
        cuttingOvertime: body.cuttingOvertime,
        finishingGeneral: body.finishingGeneral,
        finishingOvertime: body.finishingOvertime,
        qualityGeneral: body.qualityGeneral,
        qualityOvertime: body.qualityOvertime,
        staff: body.staff,
        totalExpense: totalExpense, // Use calculated totalExpense
      },
    });
    return NextResponse.json(dailyExpense, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create daily expense' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dailyExpenses = await prisma.dailyExpense.findMany({
      orderBy: { date: 'asc' },
    });

    return NextResponse.json(dailyExpenses, { status: 200 });
  } catch (error) {
    console.error('Error fetching daily expenses:', error);
    return NextResponse.json({ error: 'Failed to fetch daily expenses' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id } = body; // Assuming the expense ID is passed in the body
  try {
    // Update the daily expense entry
    const updatedExpense = await prisma.dailyExpense.update({
      where: { id: id },
      data: {
        date: new Date(body.date),
        operatorGeneral: body.operatorGeneral,
        operatorOvertime: body.operatorOvertime,
        helperGeneral: body.helperGeneral,
        helperOvertime: body.helperOvertime,
        cuttingGeneral: body.cuttingGeneral,
        cuttingOvertime: body.cuttingOvertime,
        finishingGeneral: body.finishingGeneral,
        finishingOvertime: body.finishingOvertime,
        qualityGeneral: body.qualityGeneral,
        qualityOvertime: body.qualityOvertime,
        staff: body.staff,
        // Recalculate totalExpense if necessary
        totalExpense: calculateTotalExpense(body),
      },
    });
    return NextResponse.json(updatedExpense, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update daily expense' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json(); // Assuming the expense ID is passed in the body
  try {
    // Delete the daily expense entry
    await prisma.dailyExpense.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: 'Daily expense deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete daily expense' }, { status: 500 });
  }
}

// Helper function to calculate total expense
function calculateTotalExpense(body: any) {
  const operatorExpense = body.operatorGeneral * RATES.operatorGeneral +
    body.operatorOvertime * RATES.operatorOvertime;

  const helperExpense = body.helperGeneral * RATES.helperGeneral +
    body.helperOvertime * RATES.helperOvertime;

  const cuttingExpense = body.cuttingGeneral * RATES.cuttingGeneral +
    body.cuttingOvertime * RATES.cuttingOvertime;

  const finishingExpense = body.finishingGeneral * RATES.finishingGeneral +
    body.finishingOvertime * RATES.finishingOvertime;

  const qualityExpense = body.qualityGeneral * RATES.qualityGeneral +
    body.qualityOvertime * RATES.qualityOvertime;

  const staffExpense = body.staff * RATES.staff;

  return operatorExpense + helperExpense + cuttingExpense +
    finishingExpense + qualityExpense + staffExpense;
}
