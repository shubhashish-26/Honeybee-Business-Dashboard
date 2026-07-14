import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";

function ExportPDF() {

    async function exportPDF() {

        const dashboard =
            document.getElementById("dashboard");

        const canvas =
            await html2canvas(dashboard);

        const image =
            canvas.toDataURL("image/png");

        const pdf =
            new jsPDF("p", "mm", "a4");

        const width =
            pdf.internal.pageSize.getWidth();

        const height =
            (canvas.height * width) /
            canvas.width;

        pdf.addImage(
            image,
            "PNG",
            0,
            0,
            width,
            height
        );

        pdf.save("HoneybeeDashboard.pdf");

        toast.success("PDF exported successfully!");

    }

    return (

        <button
            onClick={exportPDF}
            style={{
                background: "#E53935",
                color: "white",
                padding: "12px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginLeft: "10px"
            }}
        >

            📄 Export PDF

        </button>

    );

}

export default ExportPDF;