import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportButton({ hospitals }) {

    function exportExcel() {

        const worksheet = XLSX.utils.json_to_sheet(hospitals);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Hospitals"
        );
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });
        
         const blob = new Blob([excelBuffer], {
           type: "application/octet-stream",
        });

        saveAs(blob, "Hospitals.xlsx");

        toast.success("Excel exported successfully!");
         

    }

    return (

        <button
            onClick={exportExcel}
            style={{
                background: "#4CAF50",
                color: "white",
                padding: "12px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "20px"
            }}
        >

            📥 Export to Excel

        </button>

    );

}

export default ExportButton;