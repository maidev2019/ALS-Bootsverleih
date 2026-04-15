import { useState } from "react";
import { generatePdf } from "../services/pdfService";

export default function ActionBar({ formData }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadBlob = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async () => {
    try {
      setIsGenerating(true);
      
      console.log("Angestellter:", formData.unterschriften.angestellter);
      console.log("Mieter:", formData.unterschriften.mieter);
      
      const { blob, fileName } = await generatePdf(formData);
      downloadBlob(blob, fileName);
    } catch (error) {
      console.error(error);
      alert("Die PDF konnte nicht erstellt werden.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSharePdf = async () => {
    try {
      setIsGenerating(true);

      console.log("Angestellter:", formData.unterschriften.angestellter);

      console.log("Mieter:", formData.unterschriften.mieter);

      const { blob, fileName } = await generatePdf(formData);
      const pdfFile = new File([blob], fileName, {
        type: "application/pdf",
      });

      const canUseWebShare =
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function";

      const canShareFile =
        typeof navigator !== "undefined" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [pdfFile] });

      if (canUseWebShare && canShareFile) {
        await navigator.share({
          title: "Übergabeprotokoll",
          text: "Hier ist das erzeugte Übergabeprotokoll als PDF.",
          files: [pdfFile],
        });
        return;
      }

      downloadBlob(blob, fileName);
      alert(
        "Teilen wird auf diesem Gerät oder Browser nicht unterstützt. Die PDF wurde stattdessen heruntergeladen."
      );
    } catch (error) {
      if (error?.name === "AbortError") return;
      console.error(error);
      alert("Die PDF konnte nicht geteilt werden.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="action-bar">
      <button
        type="button"
        className="secondary-button"
        onClick={handleDownloadPdf}
        disabled={isGenerating}
      >
        PDF herunterladen
      </button>

      <button
        type="button"
        className="primary-button"
        onClick={handleSharePdf}
        disabled={isGenerating}
      >
        {isGenerating ? "PDF wird erstellt ..." : "PDF teilen"}
      </button>
    </div>
  );
}