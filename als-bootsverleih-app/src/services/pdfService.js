import { jsPDF } from "jspdf";

function addSectionTitle(doc, title, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(title, 15, y);
  return y + 8;
}

function addLine(doc, label, value, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(`${label}:`, 15, y);

  doc.setFont("helvetica", "normal");
  doc.text(String(value ?? "-"), 65, y);

  return y + 7;
}

function addChecklistBlock(doc, title, data, labels, y) {
  y = addSectionTitle(doc, title, y);

  Object.entries(labels).forEach(([key, label]) => {
    const value = data?.[key];
    const text =
      typeof value === "boolean" ? (value ? "Ja" : "Nein") : value || "-";

    y = addLine(doc, label, text, y);
  });

  return y + 3;
}

function ensurePageSpace(doc, y, needed = 20) {
  const pageHeight = doc.internal.pageSize.getHeight();

  if (y + needed > pageHeight - 15) {
    doc.addPage();
    return 20;
  }

  return y;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function addImagesToPdf(doc, images, startY) {
  let y = startY;

  if (!images || images.length === 0) {
    y = addSectionTitle(doc, "Bilder", y);
    y = addLine(doc, "Hinweis", "Keine Bilder vorhanden", y);
    return y;
  }

  y = addSectionTitle(doc, "Bilder", y);

  for (let i = 0; i < images.length; i += 1) {
    y = ensurePageSpace(doc, y, 80);

    const imageItem = images[i];
    const dataUrl = await fileToDataUrl(imageItem.file);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`Bild ${i + 1}`, 15, y);
    y += 4;

    doc.addImage(dataUrl, "JPEG", 15, y, 80, 60);
    y += 68;
  }

  return y;
}

function addSignatureImage(doc, label, dataUrl, x, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(label, x, y);

  if (dataUrl) {
    doc.addImage(dataUrl, "PNG", x, y + 4, 70, 25);
    doc.setDrawColor(180);
    doc.line(x, y + 31, x + 70, y + 31);
  } else {
    doc.setFont("helvetica", "normal");
    doc.text("Keine Unterschrift", x, y + 12);
    doc.setDrawColor(180);
    doc.line(x, y + 20, x + 70, y + 20);
  }
}

export async function generatePdf(formData) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Miet- und Übergabeprotokoll", 15, y);
  y += 12;

  y = addSectionTitle(doc, "Metadaten", y);
  y = addLine(doc, "Objekttyp", formData.meta.objektTyp === "boot" ? "Boot" : "Floß", y);
  y = addLine(doc, "Objektnummer", formData.meta.objektNummer || "-", y);
  y = addLine(doc, "Datum", formData.meta.datum || "-", y);
  y = addLine(doc, "Buchungszeit", formData.meta.buchungszeit || "-", y);
  y += 3;

  y = ensurePageSpace(doc, y, 60);
  y = addChecklistBlock(doc, "Allgemeines", formData.allgemeines, {
    bootsmappe: "Bootsmappe",
    bootsrumpf: "Bootsrumpf",
    sonnensegel: "Sonnensegel",
    seitenabdeckung: "Seitenabdeckung",
    fenderAnzahl: "Fender Stück",
    wc: "WC",
    toilettenpapier: "Toilettenpapier",
    armaturen: "Armaturen",
    radio: "Radio / Musikanlage",
    beleuchtung: "Beleuchtung",
    kuehlbox: "Kühlbox",
    strahler: "Strahler",
  }, y);

  y = ensurePageSpace(doc, y, 60);
  y = addChecklistBlock(doc, "Ausstattung", formData.ausstattung, {
    verbandskasten: "Verbandskasten",
    schwimmwesten: "Schwimmwesten",
    bootshaken: "Bootshaken",
    paddel: "Paddel",
    polster: "Polster / Kissen",
    badeleiter: "Badeleiter",
    leinen: "Leinen",
    anker: "Anker",
    ankerleuchte: "Ankerleuchte",
    usb: "USB-Ladekabel",
    gasgrill: "Gasgrill / -flasche",
  }, y);

  y = ensurePageSpace(doc, y, 50);
  y = addChecklistBlock(doc, "Belehrung", formData.belehrung, {
    steuerungseinheit: "Steuerungseinheit",
    fahreigenschaften: "Fahreigenschaften",
    vorfahrtsrecht: "Vorfahrtsrecht",
    verkehrszeichen: "Schiffsverkehrszeichen",
    beleuchtung: "Beleuchtung",
  }, y);

  y = ensurePageSpace(doc, y, 50);
  y = addChecklistBlock(doc, "Motor", formData.motor, {
    lenkung: "Lenkung",
    trimmung: "Trimmung",
    schraube: "Schraube",
    motorhaube: "Motor / Haube",
    tank: "Tank",
    ersatzkanister: "Ersatzkanister",
  }, y);

  y = ensurePageSpace(doc, y, 30);
  y = addSectionTitle(doc, "Anmerkungen", y);
  y = addLine(doc, "Bemerkungen", formData.anmerkungen.text || "-", y);
  y = addLine(doc, "Mülltüte", formData.anmerkungen.muelltuete || "-", y);
  y += 3;

  y = ensurePageSpace(doc, y, 90);
  y = await addImagesToPdf(doc, formData.images, y);

  y = ensurePageSpace(doc, y, 50);
  y = addSectionTitle(doc, "Unterschriften", y);

  addSignatureImage(
    doc,
    "Unterschrift Angestellter",
    formData.unterschriften.angestellter,
    15,
    y
  );

  addSignatureImage(
    doc,
    "Unterschrift Mieter",
    formData.unterschriften.mieter,
    110,
    y
  );

  const blob = doc.output("blob");
  const fileName = `uebergabeprotokoll-${formData.meta.objektTyp}-${formData.meta.objektNummer || "ohne-nummer"}.pdf`;

  return { blob, fileName };
}