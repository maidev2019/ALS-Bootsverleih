function getTodayDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getCurrentTime() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

export const initialFormData = {
  meta: {
    datum: getTodayDate(),
    buchungszeit: getCurrentTime(),
    objektTyp: "boot",
    objektNummer: "",
  },

  allgemeines: {
    bootsmappe: false,
    bootsrumpf: false,
    sonnensegel: false,
    seitenabdeckung: false,
    fenderAnzahl: "0",
    wc: false,
    toilettenpapier: false,
    armaturen: false,
    radio: false,
    beleuchtung: false,
    kuehlbox: false,
    strahler: false,
  },

  ausstattung: {
    verbandskasten: false,
    schwimmwesten: "0",
    bootshaken: false,
    paddel: false,
    polster: false,
    badeleiter: false,
    leinen: "0",
    anker: false,
    ankerleuchte: false,
    usb: false,
    gasgrill: false,
  },

  belehrung: {
    steuerungseinheit: false,
    fahreigenschaften: false,
    vorfahrtsrecht: false,
    verkehrszeichen: false,
    beleuchtung: false,
  },

  motor: {
    lenkung: false,
    trimmung: false,
    schraube: false,
    motorhaube: false,
    tank: "",
    ersatzkanister: false,
  },

  anmerkungen: {
    text: "",
    muelltuete: "",
  },

  images: [],

  unterschriften: {
    angestellter: null,
    mieter: null,
  },
};