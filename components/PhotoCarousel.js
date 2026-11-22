"use client";
import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function PawPlaceholder() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ display: "block" }}>
      <rect width="100" height="100" fill="#1e2624" />
      <circle cx="50" cy="60" r="16" fill="#2a332f" />
      <circle cx="34" cy="38" r="8" fill="#2a332f" />
      <circle cx="50" cy="30" r="8" fill="#2a332f" />
      <circle cx="66" cy="38" r="8" fill="#2a332f" />
    </svg>
  );
}

export default function PhotoCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState({});
  const touchStartX = useRef(null);

  function go(delta) {
    setIndex((i) => (i + delta + items.length) % items.length);
  }

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 40) go(-1);
    else if (dx < -40) go(1);
    touchStartX.current = null;
  }

  const current = items[index];

  return (
    <div className="carousel">
      <div
        className="carouselStage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {failed[index] ? (
          <PawPlaceholder />
        ) : (
          <img
            key={index}
            src={current.src}
            alt={current.caption}
            className="carouselImg"
            onError={() => setFailed((f) => ({ ...f, [index]: true }))}
          />
        )}
        {items.length > 1 && (
          <>
            <button className="carouselArrow carouselArrowLeft" onClick={() => go(-1)} aria-label="Prethodna">
              <ChevronLeft size={20} />
            </button>
            <button className="carouselArrow carouselArrowRight" onClick={() => go(1)} aria-label="Sledeća">
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <p className="carouselCaption">{current.caption}</p>

      {items.length > 1 && (
        <div className="carouselDots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`carouselDot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Slika ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
