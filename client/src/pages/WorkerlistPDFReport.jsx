import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import WorkersAssignList from './WorkersAssignList';

export default function WorkerlistPDFReport() {
  useEffect(() => {
    generatePDF();
  }, []);

  const generatePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add header content
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 255); // Set color to blue
    doc.text('Chaminda Stores', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Reset color to black
    doc.text('No 125, Mapatana, Horana', doc.internal.pageSize.getWidth() / 2, 27, { align: 'center' });
    doc.text('TP : 075 - 6175658', doc.internal.pageSize.getWidth() / 2, 34, { align: 'center' });

    // Add current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { timeZone: 'UTC' });
    const formattedTime = currentDate.toLocaleTimeString('en-US', { timeZone: 'UTC' });
    const dateTimeText = 'Date: ' + formattedDate + ' Time: ' + formattedTime;
    doc.setFontSize(10);
    doc.text(dateTimeText, 10, 50);

    // Add title with underline
    doc.setFontSize(16);
    doc.textWithLink('Workers Shift Schedules Report', doc.internal.pageSize.getWidth() / 2, 60, { align: 'center', url: 'javascript:void(0)', underline: true });

    // Add WorkersAssignList component
    const tableYPos = 70;
    const tableData = [];
    const workersShiftSchedules = [
      { shiftname: 'Morning', id: [1, 2], username: ['John', 'Jane'], type: ['Regular', 'Part-time'] },
      { shiftname: 'Evening', id: [3, 4], username: ['Alice', 'Bob'], type: ['Regular', 'Full-time'] },
    ];
    workersShiftSchedules.forEach(schedule => {
      tableData.push([schedule.shiftname, schedule.id.join(', '), schedule.username.join(', '), schedule.type.join(', ')]);
    });
    doc.autoTable({
      startY: tableYPos,
      head: [['Shift Name', 'Worker IDs', 'Worker Names', 'Worker Type']],
      body: tableData,
      theme: 'grid',
      styles: { cellPadding: 5, fontSize: 10 },
    });

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(255, 0, 0); // Set color to red
    doc.text('Keep this report Confidential', doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 15, { align: 'center' });

    // Save the PDF
    doc.save('Workers_Shift_Schedules_Report.pdf');
  };

  return <div>PDF Report Generated</div>; // This can be customized as per your requirement
}
