import { useState } from "react";
import { initialFormData } from "./data/initialFormData";
import RentalForm from "./components/RentalForm";
import ActionBar from "./components/ActionBar";

export default function App() {
  const [formData, setFormData] = useState(initialFormData);

  return (
    <main className="app-shell">
      <div className="app-container">
        <h1>Übergabeprotokoll</h1>
        <p className="subtitle">Bootsverleih – digitale Erfassung</p>

        <RentalForm formData={formData} setFormData={setFormData} />
        <ActionBar formData={formData} />
      </div>
    </main>
  );
}