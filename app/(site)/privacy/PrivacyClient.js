"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/config";

export default function PrivacyClient() {
  const { t } = useI18n();
  const p = t.privacy;

  return (
    <div className="panel" style={{ marginTop: 28 }}>
      <div className="panelhead"><h2>{t.footerPrivacy}</h2></div>
      <div className="legaltext">
        <p><strong>{p.updated}:</strong> {new Date().toLocaleDateString()}</p>

        {p.sections.map((s, i) => (
          <div key={i}>
            <h3>{s.title}</h3>
            {s.body && <p>{s.body}</p>}
            {s.list && (
              <ul>
                {s.list.map((li, j) => <li key={j}>{li}</li>)}
              </ul>
            )}
          </div>
        ))}

        <h3>{p.contactTitle}</h3>
        <p>{p.contactBody}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--brass)" }}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </div>
  );
}
