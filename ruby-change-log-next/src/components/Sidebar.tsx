'use client'

import React, { useState, useEffect } from "react";

const versions = [
  { id: "ruby-1-0", label: "Ruby 1.0" },
  { id: "ruby-1-8", label: "Ruby 1.8" },
  { id: "ruby-1-9", label: "Ruby 1.9" },
  { id: "ruby-2-0", label: "Ruby 2.0" },
  { id: "ruby-2-1", label: "Ruby 2.1" },
  { id: "ruby-2-2", label: "Ruby 2.2" },
  { id: "ruby-2-3", label: "Ruby 2.3" },
  { id: "ruby-2-4", label: "Ruby 2.4" },
  { id: "ruby-2-5", label: "Ruby 2.5" },
  { id: "ruby-2-6", label: "Ruby 2.6" },
  { id: "ruby-2-7", label: "Ruby 2.7" },
  { id: "ruby-3-0", label: "Ruby 3.0" },
  { id: "ruby-3-1", label: "Ruby 3.1" },
  { id: "ruby-3-2", label: "Ruby 3.2" },
  { id: "ruby-3-3", label: "Ruby 3.3" },
];

const sidebarBase: React.CSSProperties = {
  width: 200,
  background: "#880808",
  color: "#e2e8f0",
  padding: 20,
  flexShrink: 0,
  position: "sticky",
  top: 0,
  height: "100vh",
  overflowY: "auto",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  transition: "none",
};
const sidebarMobile: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: 220,
  background: "#880808",
  color: "#e2e8f0",
  padding: 20,
  zIndex: 2000,
  boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
  transform: "translateX(-100%)",
  transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
};
const sidebarMobileOpen: React.CSSProperties = {
  ...sidebarMobile,
  transform: "translateX(0)",
};
const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  zIndex: 1500,
  transition: "opacity 0.3s",
};
const hamburgerStyle: React.CSSProperties = {
  position: "fixed",
  top: 18,
  left: 18,
  zIndex: 2100,
  width: 44,
  height: 44,
  background: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 26,
  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
  cursor: "pointer",
  transition: "background 0.2s",
};
const titleStyle: React.CSSProperties = {
  fontSize: 20, // Reduced from 22px
  fontWeight: 700,
  marginBottom: 20,
  textAlign: "center",
  color: "#fca5a5",
};
const navListStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};
const navItemStyle: React.CSSProperties = {
  marginBottom: 8,
};
const linkStyle: React.CSSProperties = {
  display: "block",
  padding: "8px 10px",
  borderRadius: 6,
  color: "#e2e8f0",
  textDecoration: "none",
  fontSize: 15,
  transition: "background 0.3s",
  overflowWrap: "break-word", // Added for text overflow
};

const Sidebar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640); // Updated breakpoint to 640px
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 判定が終わるまで何も描画しない（SSR/初回マウント直後のチラつき防止）
  if (isMobile === null) return null;

  // メニュークリック時に自動で閉じる
  const handleLinkClick = () => {
    if (isMobile) setOpen(false);
  };

  // PC時は常時表示、モバイル時はハンバーガー＋スライドイン
  return (
    <>
      {isMobile && (
        <button style={hamburgerStyle} onClick={() => setOpen(!open)} aria-label={open ? "メニューを閉じる" : "メニューを開く"}>
          <i className={`fas ${open ? "fa-times" : "fa-bars"}`} />
        </button>
      )}
      {isMobile ? (
        <>
          <div style={open ? sidebarMobileOpen : sidebarMobile}>
            <h2 style={titleStyle}>Ruby Versions</h2>
            <nav>
              <ul style={navListStyle}>
                {versions.map((v) => (
                  <li key={v.id} style={navItemStyle}>
                    <a
                      href={`#${v.id}`}
                      style={linkStyle}
                      onClick={handleLinkClick}
                      onMouseOver={e => (e.currentTarget.style.background = '#b91c1c')}
                      onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      {v.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {open && <div style={overlayStyle} onClick={() => setOpen(false)} />}
        </>
      ) : (
        <aside style={sidebarBase}>
          <h2 style={titleStyle}>Ruby Versions</h2>
          <nav>
            <ul style={navListStyle}>
              {versions.map((v) => (
                <li key={v.id} style={navItemStyle}>
                  <a
                    href={`#${v.id}`}
                    style={linkStyle}
                    onMouseOver={e => (e.currentTarget.style.background = '#b91c1c')}
                    onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {v.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
};

export default Sidebar; 