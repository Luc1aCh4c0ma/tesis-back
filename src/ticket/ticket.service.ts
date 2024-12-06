import { Injectable } from '@nestjs/common';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TicketService {
  async generarTicket(pedido: Pedido, res: Response): Promise<void> {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    // Ruta del logo (ajusta la ruta según la ubicación real del archivo)
    const logoPath = path.join(__dirname, '..', '..', 'assets', 'logososneado.png');

    // Verifica si el archivo de logo existe
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, { fit: [100, 100], align: 'center' });
    } else {
      console.warn('El archivo de logo no se encontró en la ruta:', logoPath);
    }

    // Estilos y colores personalizados
    const primaryColor = '#d6c7a9'; // Color similar al de tu interfaz
    const textColor = '#333';

    // Configurar el encabezado del ticket
    doc.fillColor(primaryColor).fontSize(24).text('Sosneado Café Bar', { align: 'center' });
    doc.moveDown(0.5);
    doc.fillColor(textColor).fontSize(18).text('Ticket No Válido como Factura', { align: 'center' });
    doc.moveDown(1);

    // Información del pedido
    doc.fontSize(12).text(`Pedido ID: ${pedido.id}`);
    doc.text(`Fecha: ${new Date(pedido.createdAt).toLocaleString()}`);
    doc.text(`Método de Pago: ${pedido.metodoPago}`);
    doc.text(`Estado: ${pedido.estado}`);
    doc.moveDown(1);

    // Listar los items
    doc.fillColor(primaryColor).fontSize(14).text('Detalles del Pedido:');
    doc.fillColor(textColor).fontSize(12);
    let totalCalculado = 0;

    pedido.items.forEach((item, index) => {
      const precio = parseFloat(item.precio as unknown as string) || 0;
      const subtotal = precio * item.cantidad;
      totalCalculado += subtotal;
      doc.text(`${index + 1}. ${item.nombre} x ${item.cantidad} - $${subtotal.toFixed(2)}`);
    });

    // Total del pedido (calculado)
    doc.moveDown(1);
    doc.fillColor(primaryColor).fontSize(16).text(`Total: $${totalCalculado.toFixed(2)}`, { align: 'right' });

    // Mensaje de agradecimiento
    doc.moveDown(2);
    doc.fillColor(textColor).fontSize(14).text('Gracias por colaborar con este proyecto. ¡Esperamos verte pronto!', { align: 'center' });

    // Redes sociales
    doc.moveDown(1);
    doc.fontSize(12).text('Síguenos en nuestras redes sociales:', { align: 'center' });
    doc.fillColor('#E1306C').text('Instagram: instagram.com/sosneadocafe', { align: 'center', link: 'https://www.instagram.com/coopdetrabajogenerandosonrisas/' });

    // Pie de página
    doc.moveDown(2);
    doc.fillColor('#888').fontSize(10).text('Este ticket no tiene validez fiscal.', { align: 'center' });

    // Finalizar y enviar el PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=ticket-${pedido.id}.pdf`);
    doc.pipe(res);
    doc.end();
  }
}
