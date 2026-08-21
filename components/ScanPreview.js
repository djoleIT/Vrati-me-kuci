import React from "react";

export default function ScanPreview({ mode = "contact" }) {
  return (
    <div className="scanpreview">
      <div className="phone" style={{ width: 240 }}>
        <div className="phonescreen">
          {mode === "contact" ? (
            <>
              <div className="pplabel">Ovaj ljubimac je pronađen</div>
              <div className="ppname">Luna</div>
              <div className="callbtn">📞 Pozovi Miloša</div>
              <div className="infoline">⚠ Alergična na pčele</div>
            </>
          ) : (
            <>
              <div className="pplabel">🐾</div>
              <div className="ppname">Sve je u redu</div>
              <p style={{ fontSize: 12.5, color: "#555", textAlign: "center", lineHeight: 1.5, padding: "0 6px" }}>
                Reks je slobodan i nije izgubljen. Ovo je normalno — nema potrebe za brigom.
              </p>
            </>
          )}
        </div>
      </div>
      <p className="scanpreviewcaption">
        {mode === "contact"
          ? "Ovako izgleda stranica kad neko skenira privezak i pas je izgubljen."
          : "Ovako izgleda stranica kad je izabrana opcija „nije izgubljen“."}
      </p>
    </div>
  );
}
