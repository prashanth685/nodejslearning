import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

function Checkout() {
  const pdfRef = useRef();

  const downloadPDF = async () => {
    const element = pdfRef.current;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("checkout.pdf");
  };

  return (
    <div>
      <div ref={pdfRef}>
        <h2>Checkout Summary</h2>
        <p>Order ID: #12345</p>
        <p>Customer: John Doe</p>
        <p>Total Amount: ₹1,500</p>
      </div>

      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
}

export default Checkout;
