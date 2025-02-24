import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const reports = await prisma.productionReport.findMany();

    const doc = new PDFDocument();
    const chunks: Buffer[] = [];
    doc.on('data', (chunk:any) => chunks.push(chunk));
    doc.on('end', () => {});

    // Add title
    doc.fontSize(20).text('Production Report', { align: 'center' });

    // Add table headers
    doc.moveDown().fontSize(12);
    doc.text('Date', { continued: true, width: 100 });
    doc.text('Worker ID', { continued: true, width: 100 });
    doc.text('Product Name', { continued: true, width: 150 });
    doc.text('Quantity');

    // Add data rows
    reports.forEach((report:any) => {
      doc.text(report.date.toISOString().split('T')[0], { continued: true, width: 100 });
      doc.text(report.workerId, { continued: true, width: 100 });
      doc.text(report.productName, { continued: true, width: 150 });
      doc.text(report.quantity.toString());
    });

    doc.end();

    return new NextResponse(Buffer.concat(chunks), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="production-report.pdf"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate PDF report' }, { status: 500 });
  }
}
