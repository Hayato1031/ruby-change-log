import React from "react";

const footerStyle: React.CSSProperties = {
  background: "#1f2937",
  color: "#fff",
  padding: "24px 0",
  textAlign: "center",
  boxShadow: "inset 0 2px 8px rgba(0,0,0,0.08)",
  marginTop: 32,
};
const containerStyle: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
};
const copyrightStyle: React.CSSProperties = {
  margin: 0,
  overflowWrap: "break-word", // Added for text overflow
};
const descStyle: React.CSSProperties = {
  fontSize: 14,
  marginTop: 8,
  opacity: 0.8,
  overflowWrap: "break-word", // Added for text overflow
};

const Footer: React.FC = () => (
  <footer style={footerStyle}>
    <div style={containerStyle}>
      <p style={copyrightStyle}>&copy; 2025 Rubyの歴史と進化. All rights reserved.</p>
      <p style={descStyle}>このサイトはRubyの主要なバージョンアップを初心者向けにまとめたものです。</p>
    </div>
  </footer>
);

export default Footer; 