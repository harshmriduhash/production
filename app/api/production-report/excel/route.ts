import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const reports = await prisma.productionReport.findMany();

    // Create a workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Production Report");

    // Add headers
    worksheet.columns = [
      { header: "Date", key: "date", width: 15 },
      { header: "Worker ID", key: "workerId", width: 20 },
      { header: "Product Name", key: "productName", width: 25 },
      { header: "Quantity", key: "quantity", width: 10 },
    ];

    // Add data
    reports.forEach((report: any) => {
      worksheet.addRow({
        date: report.date.toISOString().split("T")[0],
        workerId: report.workerId,
        productName: report.productName,
        quantity: report.quantity,
      });
    });

    // Generate a buffer
    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="production-report.xlsx"',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to generate Excel report" },
      { status: 500 }
    );
  }
}
