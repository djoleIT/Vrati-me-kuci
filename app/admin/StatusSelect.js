"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["Nova", "Odštampano", "Poslato", "Naplaćeno"];

export default function StatusSelect({ orderId, current }) {
  const [status, setStatus] = useState(current);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function change(e) {
    const value = e.target.value;
    setStatus(value);
    await fetch(`/api/orders/${orderId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: value }),
    });
    startTransition(() => router.refresh());
  }

  return (
    <select value={status} onChange={change} style={{ width: "auto", opacity: pending ? 0.5 : 1 }}>
      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}
