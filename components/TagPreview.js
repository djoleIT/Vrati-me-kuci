"use client";

export default function TagPreview({ petName, qrUrl, publicPath }) {
  return (
    <div className="tagcard">
      <div className="ring" />
      <div className="tag">
        <div className="name">{petName || "Ime"}</div>
        <div className="qrbox">
          <img src={qrUrl} alt="QR kod priveska" />
        </div>
        <div className="url">{publicPath}</div>
      </div>
    </div>
  );
}
