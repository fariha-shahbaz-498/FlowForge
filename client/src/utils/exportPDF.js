import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPDF(data) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("FlowForge Reports", 14, 18);

  autoTable(doc, {
    startY: 30,
    head: [["Report", "Date", "Status", "Progress"]],
    body: data.map((r) => [
      r.title,
      r.date,
      r.status,
      `${r.progress}%`,
    ]),
  });

  doc.save("FlowForge_Report.pdf");
}