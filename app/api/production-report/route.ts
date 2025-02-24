import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Fetch all production reports
export async function GET() {
    try {
      const productionReports = await prisma.productionReport.findMany({
        include: { productionOrder: true },
      });
  
      // Calculate total sums
      const totals = productionReports.reduce(
        (acc, report) => {
          acc.dailyProduction += report.dailyProduction;
          acc.totalPrice += report.totalPrice;
          acc.dollar += report.dollar;
          acc.totalAmount += report.totalAmount;
          return acc;
        },
        {
          dailyProduction: 0,
          totalPrice: 0,
          dollar: 0,
          totalAmount: 0,
        }
      );
  
      // Include the totals in the response
      const response = {
        data: productionReports,
        totals,
      };
  
      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      console.error("Error fetching production reports:", error);
      return NextResponse.json({ error: "Failed to fetch production reports" }, { status: 500 });
    }
  }
  

// POST: Create a new production report
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { productionOrderId, dailyProduction , lineNo} = body;

    if (!productionOrderId || !dailyProduction) {
      return NextResponse.json({ error: "ProductionOrderId and dailyProduction are required" }, { status: 400 });
    }

    // Fetch related ProductionOrder to access unitPrice and percentage
    const productionOrder = await prisma.productionOrder.findUnique({
      where: { id: productionOrderId },
    });

    if (!productionOrder) {
      return NextResponse.json({ error: "ProductionOrder not found" }, { status: 404 });
    }

    // Calculate values
    const totalPrice = dailyProduction * productionOrder.unitPrice;
    const dollar = totalPrice * (productionOrder.percentage / 100);
    const totalAmount = dollar * 115;

    // Create ProductionReport
    const newProductionReport = await prisma.productionReport.create({
      data: {
        lineNo,
        productionOrderId,
        dailyProduction,
        totalPrice,
        dollar,
        totalAmount,
      },
    });

    return NextResponse.json(newProductionReport, { status: 201 });
  } catch (error) {
    console.error("Error creating production report:", error);
    return NextResponse.json({ error: "Failed to create production report" }, { status: 500 });
  }
}

