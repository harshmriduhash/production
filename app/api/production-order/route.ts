import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Fetch all production orders
export async function GET() {
  try {
    const productionOrders = await prisma.productionOrder.findMany();
    return NextResponse.json(productionOrders, { status: 200 });
  } catch (error) {
    console.error("Error fetching production orders:", error);
    return NextResponse.json({ error: "Failed to fetch production orders" }, { status: 500 });
  }
}



// POST: Create a new production order
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      programCode,
      buyer,
      item,
      styleNo,
      orderQty,
      percentage,
      unitPrice,
      status,
    } = body;

    if (
      !programCode ||
      !buyer ||
      !item ||
      !styleNo ||
      !orderQty ||
      !percentage ||
      !unitPrice ||
      !status
    ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newProductionOrder = await prisma.productionOrder.create({
      data: {
        programCode,
        buyer,
        item,
        styleNo,
        orderQty,
        percentage,
        unitPrice,
        status,
      },
    });

    return NextResponse.json(newProductionOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create production order", message: error }, { status: 500 });
  }
}


export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const {
      id, // ID of the production order to update
      programCode,
      buyer,
      item,
      styleNo,
      orderQty,
      percentage,
      unitPrice,
      status,
    } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required to update the record" }, { status: 400 });
    }

    const updatedProductionOrder = await prisma.productionOrder.update({
      where: { id },
      data: {
        programCode,
        buyer,
        item,
        styleNo,
        orderQty,
        percentage,
        unitPrice,
        status,
      },
    });

    return NextResponse.json(updatedProductionOrder, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update production order", message: error },
      { status: 500 }
    );
  }
}



export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required to delete the record" }, { status: 400 });
    }

    const deletedProductionOrder = await prisma.productionOrder.delete({
      where: { id },
    });

    return NextResponse.json(deletedProductionOrder, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete production order", message: error },
      { status: 500 }
    );
  }
}
