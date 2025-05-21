'use client'
import React from "react";

const headerStyle: React.CSSProperties = {
  background: "linear-gradient(to right, #dc2626, #f43f5e)",
  color: "#fff",
  padding: "32px 0 24px 0",
  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
};
const containerStyle: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  textAlign: "center",
  padding: "0 16px",
};
const titleStyle: React.CSSProperties = {
  fontSize: 38,
  fontWeight: 800,
  marginBottom: 10,
  letterSpacing: "-0.01em",
  lineHeight: 1.1,
};
const subTitleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 400,
  fontStyle: "italic",
  marginTop: 0,
  marginBottom: 18,
  opacity: 0.92,
};
const descStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 300,
  opacity: 0.95,
  lineHeight: 1.7,
  margin: 0,
};

// レスポンシブ対応
function useResponsiveHeaderStyle() {
  const [tStyle, setTStyle] = React.useState(titleStyle);
  const [sStyle, setSStyle] = React.useState(subTitleStyle);
  const [dStyle, setDStyle] = React.useState(descStyle);
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setTStyle({ ...titleStyle, fontSize: 22 });
        setSStyle({ ...subTitleStyle, fontSize: 14 });
        setDStyle({ ...descStyle, fontSize: 13 });
      } else {
        setTStyle(titleStyle);
        setSStyle(subTitleStyle);
        setDStyle(descStyle);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return { tStyle, sStyle, dStyle };
}

const Header: React.FC = () => {
  const { tStyle, sStyle, dStyle } = useResponsiveHeaderStyle();
  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <h1 style={tStyle}>Ruby進化の物語</h1>
        <div style={sStyle}>〜バージョンごとに読み解く、技術と思想の歩み〜</div>
        <p style={dStyle}>
          Rubyはなぜ多くの開発者に愛され続けてきたのか？<br />
          その歴史と進化を、初心者にもやさしく・わかりやすく解説します。
        </p>
      </div>
    </header>
  );
};

export default Header; 