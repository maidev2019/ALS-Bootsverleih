import ImageUploader from "./ImageUploader";
import SignatureSection from "./SignatureSection";

function CheckboxField({ label, checked, onChange }) {
  return (
    <label className="checkbox-field">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}

function Section({ title, children }) {
  return (
    <section className="form-section">
      <h2>{title}</h2>
      <div className="section-content">{children}</div>
    </section>
  );
}

export default function RentalForm({ formData, setFormData }) {
  const isBoot = formData.meta.objektTyp === "boot";
  const isFloss = formData.meta.objektTyp === "floss";

  const updateMeta = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        [field]: value,
      },
    }));
  };

  const updateGroupField = (group, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [field]: value,
      },
    }));
  };

  return (
    <form className="rental-form">
      <Section title="Metadaten">
        <div className="grid grid-2">
          <div className="field">
            <label>Objekttyp</label>
            <select
              value={formData.meta.objektTyp}
              onChange={(e) => updateMeta("objektTyp", e.target.value)}
            >
              <option value="boot">Boot</option>
              <option value="floss">Floß</option>
            </select>
          </div>

          <div className="field">
            <label>{isBoot ? "Boot No." : "Floß No."}</label>
            <input
              type="text"
              value={formData.meta.objektNummer}
              onChange={(e) => updateMeta("objektNummer", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Datum</label>
            <input
              type="date"
              value={formData.meta.datum}
              onChange={(e) => updateMeta("datum", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Buchungszeit</label>
            <input
              type="time"
              value={formData.meta.buchungszeit}
              onChange={(e) => updateMeta("buchungszeit", e.target.value)}
            />
          </div>
        </div>
      </Section>

      <Section title="Allgemeines">
        <div className="grid grid-2">
          <CheckboxField
            label="Bootsmappe"
            checked={formData.allgemeines.bootsmappe}
            onChange={(e) =>
              updateGroupField("allgemeines", "bootsmappe", e.target.checked)
            }
          />

          <CheckboxField
            label="Bootsrumpf"
            checked={formData.allgemeines.bootsrumpf}
            onChange={(e) =>
              updateGroupField("allgemeines", "bootsrumpf", e.target.checked)
            }
          />

          {isBoot && (
            <CheckboxField
              label="Sonnensegel"
              checked={formData.allgemeines.sonnensegel}
              onChange={(e) =>
                updateGroupField("allgemeines", "sonnensegel", e.target.checked)
              }
            />
          )}

          {isFloss && (
            <CheckboxField
              label="Seitenabdeckung"
              checked={formData.allgemeines.seitenabdeckung}
              onChange={(e) =>
                updateGroupField(
                  "allgemeines",
                  "seitenabdeckung",
                  e.target.checked
                )
              }
            />
          )}

          <div className="field">
            <label>Fender Stück</label>
            <input
              type="number"
              min="0"
              value={formData.allgemeines.fenderAnzahl}
              onChange={(e) =>
                updateGroupField("allgemeines", "fenderAnzahl", e.target.value)
              }
            />
          </div>

          <CheckboxField
            label="WC"
            checked={formData.allgemeines.wc}
            onChange={(e) =>
              updateGroupField("allgemeines", "wc", e.target.checked)
            }
          />

          {isFloss && (
            <CheckboxField
              label="Toilettenpapier"
              checked={formData.allgemeines.toilettenpapier}
              onChange={(e) =>
                updateGroupField(
                  "allgemeines",
                  "toilettenpapier",
                  e.target.checked
                )
              }
            />
          )}

          <CheckboxField
            label="Armaturen"
            checked={formData.allgemeines.armaturen}
            onChange={(e) =>
              updateGroupField("allgemeines", "armaturen", e.target.checked)
            }
          />

          <CheckboxField
            label="Radio / Musikanlage"
            checked={formData.allgemeines.radio}
            onChange={(e) =>
              updateGroupField("allgemeines", "radio", e.target.checked)
            }
          />

          <CheckboxField
            label="Beleuchtung"
            checked={formData.allgemeines.beleuchtung}
            onChange={(e) =>
              updateGroupField("allgemeines", "beleuchtung", e.target.checked)
            }
          />

          {isFloss && (
            <>
              <CheckboxField
                label="Kühlbox"
                checked={formData.allgemeines.kuehlbox}
                onChange={(e) =>
                  updateGroupField("allgemeines", "kuehlbox", e.target.checked)
                }
              />

              <CheckboxField
                label="Strahler"
                checked={formData.allgemeines.strahler}
                onChange={(e) =>
                  updateGroupField("allgemeines", "strahler", e.target.checked)
                }
              />
            </>
          )}
        </div>
      </Section>

      <Section title="Ausstattung">
        <div className="grid grid-2">
          <CheckboxField
            label="Verbandskasten"
            checked={formData.ausstattung.verbandskasten}
            onChange={(e) =>
              updateGroupField("ausstattung", "verbandskasten", e.target.checked)
            }
          />
          <CheckboxField
            label="Schwimmwesten"
            checked={formData.ausstattung.schwimmwesten}
            onChange={(e) =>
              updateGroupField("ausstattung", "schwimmwesten", e.target.checked)
            }
          />
          <CheckboxField
            label="Bootshaken"
            checked={formData.ausstattung.bootshaken}
            onChange={(e) =>
              updateGroupField("ausstattung", "bootshaken", e.target.checked)
            }
          />
          <CheckboxField
            label="Paddel"
            checked={formData.ausstattung.paddel}
            onChange={(e) =>
              updateGroupField("ausstattung", "paddel", e.target.checked)
            }
          />
          <CheckboxField
            label="Polster / Kissen"
            checked={formData.ausstattung.polster}
            onChange={(e) =>
              updateGroupField("ausstattung", "polster", e.target.checked)
            }
          />
          <CheckboxField
            label="Badeleiter"
            checked={formData.ausstattung.badeleiter}
            onChange={(e) =>
              updateGroupField("ausstattung", "badeleiter", e.target.checked)
            }
          />
          <CheckboxField
            label="Leinen"
            checked={formData.ausstattung.leinen}
            onChange={(e) =>
              updateGroupField("ausstattung", "leinen", e.target.checked)
            }
          />
          <CheckboxField
            label="Anker"
            checked={formData.ausstattung.anker}
            onChange={(e) =>
              updateGroupField("ausstattung", "anker", e.target.checked)
            }
          />
          <CheckboxField
            label="Ankerleuchte"
            checked={formData.ausstattung.ankerleuchte}
            onChange={(e) =>
              updateGroupField("ausstattung", "ankerleuchte", e.target.checked)
            }
          />

          {isFloss && (
            <>
              <CheckboxField
                label="USB-Ladekabel"
                checked={formData.ausstattung.usb}
                onChange={(e) =>
                  updateGroupField("ausstattung", "usb", e.target.checked)
                }
              />
              <CheckboxField
                label="Gasgrill / -flasche"
                checked={formData.ausstattung.gasgrill}
                onChange={(e) =>
                  updateGroupField("ausstattung", "gasgrill", e.target.checked)
                }
              />
            </>
          )}
        </div>
      </Section>

      <Section title="Belehrung">
        <div className="grid grid-2">
          <CheckboxField
            label="Steuerungseinheit"
            checked={formData.belehrung.steuerungseinheit}
            onChange={(e) =>
              updateGroupField("belehrung", "steuerungseinheit", e.target.checked)
            }
          />
          <CheckboxField
            label="Fahreigenschaften"
            checked={formData.belehrung.fahreigenschaften}
            onChange={(e) =>
              updateGroupField("belehrung", "fahreigenschaften", e.target.checked)
            }
          />
          <CheckboxField
            label="Vorfahrtsrecht"
            checked={formData.belehrung.vorfahrtsrecht}
            onChange={(e) =>
              updateGroupField("belehrung", "vorfahrtsrecht", e.target.checked)
            }
          />
          <CheckboxField
            label="Schiffsverkehrszeichen"
            checked={formData.belehrung.verkehrszeichen}
            onChange={(e) =>
              updateGroupField("belehrung", "verkehrszeichen", e.target.checked)
            }
          />
          <CheckboxField
            label="Beleuchtung"
            checked={formData.belehrung.beleuchtung}
            onChange={(e) =>
              updateGroupField("belehrung", "beleuchtung", e.target.checked)
            }
          />
        </div>
      </Section>

      <Section title="Motor">
        <div className="grid grid-2">
          <CheckboxField
            label="Lenkung"
            checked={formData.motor.lenkung}
            onChange={(e) =>
              updateGroupField("motor", "lenkung", e.target.checked)
            }
          />
          <CheckboxField
            label="Trimmung"
            checked={formData.motor.trimmung}
            onChange={(e) =>
              updateGroupField("motor", "trimmung", e.target.checked)
            }
          />
          <CheckboxField
            label="Schraube"
            checked={formData.motor.schraube}
            onChange={(e) =>
              updateGroupField("motor", "schraube", e.target.checked)
            }
          />
          <CheckboxField
            label={isBoot ? "Motorhaube" : "Motor / Haube"}
            checked={formData.motor.motorhaube}
            onChange={(e) =>
              updateGroupField("motor", "motorhaube", e.target.checked)
            }
          />

          <div className="field">
            <label>Tank</label>
            <input
              type="text"
              value={formData.motor.tank}
              onChange={(e) =>
                updateGroupField("motor", "tank", e.target.value)
              }
            />
          </div>

          <CheckboxField
            label="Ersatzkanister"
            checked={formData.motor.ersatzkanister}
            onChange={(e) =>
              updateGroupField("motor", "ersatzkanister", e.target.checked)
            }
          />
        </div>
      </Section>

      <Section title="Anmerkungen">
        <div className="field">
          <label>Bemerkungen</label>
          <textarea
            rows="6"
            value={formData.anmerkungen.text}
            onChange={(e) =>
              updateGroupField("anmerkungen", "text", e.target.value)
            }
          />
        </div>

        {isFloss && (
          <div className="field">
            <label>Mülltüte</label>
            <select
              value={formData.anmerkungen.muelltuete}
              onChange={(e) =>
                updateGroupField("anmerkungen", "muelltuete", e.target.value)
              }
            >
              <option value="">Bitte wählen</option>
              <option value="groß">groß</option>
              <option value="klein">klein</option>
            </select>
          </div>
        )}
      </Section>

      <ImageUploader images={formData.images} setFormData={setFormData} />
      <SignatureSection formData={formData} setFormData={setFormData} />
    </form>
  );
}