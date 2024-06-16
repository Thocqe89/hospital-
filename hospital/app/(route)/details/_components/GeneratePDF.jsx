import React from 'react';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";

// Base64 encoded font data (This should be replaced with the actual encoded string)
const notoSansLaoRegular = "AAEAAAAPAIAAAwAwT1MvM...";
 
const GeneratePDF = ({ appointment }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Add custom font
        doc.addFileToVFS("NotoSansLao-Regular.ttf", notoSansLaoRegular);
        doc.addFont("NotoSansLao-Regular.ttf", "NotoSansLao", "normal");
        doc.setFont("NotoSansLao");

        doc.text("Appointment Details", 20, 20);
        doc.text(`User: ${appointment.UserName}`, 20, 30);
        doc.text(`Email: ${appointment.Email}`, 20, 40);
        doc.text(`Date: ${new Date(appointment.Date).toLocaleString()}`, 20, 50);
        doc.text(`Time: ${appointment.Time}`, 20, 60);
        doc.text(`Note: ${appointment.Note}`, 20, 70);

        doc.save("appointment.pdf");
    };

    return (
        <Button type="button" onClick={generatePDF} className="ml-3">
            <span>Generate PDF</span>
        </Button>
    );
};

export default GeneratePDF;
