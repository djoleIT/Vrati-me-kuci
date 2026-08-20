"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { Package, MapPin, Phone, Clock } from "lucide-react";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      // Povlacimo sve porudzbine sortirane od najnovije
      const { data, error } = await supabaseBrowser
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setOrders(data);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  if (loading) return <div className="p-10 text-center text-lg">Učitavanje porudžbina...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Package className="text-amber-600 w-8 h-8" />
            Kontrolna Tabla Porudžbina
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4 font-semibold">Datum / ID</th>
                <th className="p-4 font-semibold">Vlasnik i Ljubimac</th>
                <th className="p-4 font-semibold">Adresa Isporuke</th>
                <th className="p-4 font-semibold">Kontakt Telefon</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500">Trenutno nema porudžbina.</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Clock className="w-4 h-4" />
                        {new Date(order.created_at).toLocaleDateString("sr-RS")}
                      </div>
                      <span className="text-xs text-gray-400 uppercase">#{order.id.split("-")[0]}</span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{order.ime_vlasnika}</div>
                      <div className="text-sm text-amber-600">Ljubimac: {order.ime_ljubimca}</div>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        <div>
                          <div>{order.adresa}</div>
                          <div className="text-gray-500">{order.grad}, {order.postanski_broj}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {order.telefon}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                        {order.status || "NOVO"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
