import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignatureField({
  label,
  value,
  onChange,
  canvasId,
}) {
  const sigPadRef = useRef(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  const saveSignature = () => {
    if (!sigPadRef.current) return;

    const canvas = sigPadRef.current.getCanvas();

    if (!canvas) {
      onChange(null);
      return;
    }

    const dataUrl = canvas.toDataURL("image/png");

    if (!dataUrl || dataUrl === "data:,") {
      onChange(null);
      return;
    }

    onChange(dataUrl);
  };

  const clearSignature = () => {
    if (!sigPadRef.current) return;

    sigPadRef.current.clear();
    setHasDrawn(false);
    onChange(null);
  };

  return (
    <div className="signature-field">
      <label className="signature-label" htmlFor={canvasId}>
        {label}
      </label>

      <div className="signature-box">
        <SignatureCanvas
          ref={sigPadRef}
          penColor="black"
          backgroundColor="white"
          canvasProps={{
            id: canvasId,
            width: 700,
            height: 220,
            className: "signature-canvas",
          }}
          onBegin={() => setHasDrawn(true)}
        />
      </div>

      <div className="signature-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={saveSignature}
        >
          Unterschrift übernehmen
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={clearSignature}
        >
          Unterschrift leeren
        </button>
      </div>

      <div className="signature-status">
        {value
          ? "Unterschrift vorhanden"
          : hasDrawn
          ? "Bitte auf „Unterschrift übernehmen“ klicken"
          : "Noch nicht übernommen"}
      </div>
    </div>
  );
}