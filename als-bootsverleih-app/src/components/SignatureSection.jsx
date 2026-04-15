import SignatureField from "./SignatureField";

export default function SignatureSection({ formData, setFormData }) {
  const updateSignature = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      unterschriften: {
        ...prev.unterschriften,
        [field]: value,
      },
    }));
  };

  return (
    <section className="form-section">
      <h2>Unterschriften</h2>

      <div className="section-content">
        <SignatureField
          label="Unterschrift Angestellter"
          canvasId="signature-angestellter"
          value={formData.unterschriften.angestellter}
          onChange={(value) => updateSignature("angestellter", value)}
        />

        <SignatureField
          label="Unterschrift Mieter"
          canvasId="signature-mieter"
          value={formData.unterschriften.mieter}
          onChange={(value) => updateSignature("mieter", value)}
        />
      </div>
    </section>
  );
}