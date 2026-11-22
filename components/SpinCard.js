"use client";
import React, { useState, useRef } from "react";

export default function SpinCard({ src, caption }) {
  const ref = useRef(null);
  const REST = { x: -4, y: 6 };
  const [tilt, setTilt] = useState(REST);
  const dragging = useRef(false);
  const lastX = useRef(0);

  function fromPointer(clientX, clientY) {
    const rect = ref.current.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width - 0.5;
    const py = (clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -22, y: px * 30 });
  }

  function onMouseMove(e) {
    fromPointer(e.clientX, e.clientY);
  }
  function onMouseLeave() {
    setTilt(REST);
  }

  function onTouchStart(e) {
    dragging.current = true;
    lastX.current = e.touches[0].clientX;
  }
  function onTouchMove(e) {
    if (!dragging.current) return;
    const dx = e.touches[0].clientX - lastX.current;
    setTilt((t) => ({ x: t.x, y: Math.max(-35, Math.min(35, t.y + dx * 0.4)) }));
    lastX.current = e.touches[0].clientX;
  }
  function onTouchEnd() {
    dragging.current = false;
  }

  return (
    <div className="spinStage">
      <div
        ref={ref}
        className="spinCard"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={src}
          alt={caption}
          className="spinCardImg"
          style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          draggable={false}
        />
      </div>
      <p className="spinCardHint">↔ prevuci ili pređi mišem da okreneš</p>
      <p className="spinCardCaption">{caption}</p>
    </div>
  );
}
