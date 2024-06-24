"use client"
import React from 'react';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { ReceiptText } from 'lucide-react';

// Base64 encoded font data (This should be replaced with the actual encoded string)
const notoSansLaoRegular = "AAEAAAAPAIAAAwAwT1MvM...";
 
const generatePDF = (appointment) => {
    // Add custom font
    doc.addFileToVFS("NotoSansLao-Regular.ttf", notoSansLaoRegular);
    doc.addFont("NotoSansLao-Regular.ttf", "NotoSansLao", "normal");
    doc.setFont("NotoSansLao");

    // Print appointment details
    doc.text("Appointment Details", 20, 20);
    doc.text(`User: ${appointment.attributes.UserName}`, 20, 30);
    doc.text(`Email: ${appointment.attributes.Email}`, 20, 40);
    doc.text(`Date: ${new Date(appointment.attributes.Date).toLocaleString()}`, 20, 50);
    doc.text(`Time: ${appointment.attributes.Time}`, 20, 60);
    doc.text(`Note: ${appointment.attributes.Note}`, 20, 70);

    doc.save("appointment.pdf");
};

const GeneratePDF = ({ appointment }) => {
    return (
        <Button type="button" onClick={() => generatePDF(appointment.data[0])} className="ml-3">
            <ReceiptText /> <span>ພີມຄິວ</span>
        </Button>
    );
};

export default GeneratePDF;
