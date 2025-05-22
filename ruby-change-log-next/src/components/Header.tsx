'use client'
import React from "react";

const heroBase: React.CSSProperties = {
  minHeight: '100vh',
  width: '100%',
  background: 'linear-gradient(120deg, #dc2626 0%, #f43f5e 100%)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  padding: '0 16px',
  boxSizing: 'border-box',
};
const gemStyle: React.CSSProperties = {
  fontSize: 72,
  marginBottom: 24,
  filter: 'drop-shadow(0 8px 24px rgba(220,38,38,0.25))',
  color: '#fff',
  textShadow: '0 2px 8px #dc2626',
};
const titleStyle: React.CSSProperties = {
  fontSize: 48,
  fontWeight: 900,
  letterSpacing: '-0.04em',
  background: 'linear-gradient(90deg, #fff 30%, #fca5a5 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: 16,
  lineHeight: 1.1,
  textShadow: '0 4px 24px rgba(220,38,38,0.10)',
};
const waveStyle: React.CSSProperties = {
  width: 120,
  height: 18,
  margin: '0 auto 24px',
  display: 'block',
};
const subtitleStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 500,
  color: '#fca5a5',
  textAlign: 'center',
  marginBottom: 28,
  letterSpacing: '0.01em',
  lineHeight: 1.3,
};
const descStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 400,
  color: '#fff',
  textAlign: 'center',
  maxWidth: 520,
  margin: '0 auto',
  opacity: 0.96,
  lineHeight: 1.7,
  textShadow: '0 2px 8px rgba(220,38,38,0.10)',
};

// スマホ対応
function useResponsiveHeroStyle() {
  const [mounted, setMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
    function handleResize() {
      setIsMobile(window.innerWidth < 600);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const hero = mounted && isMobile
    ? { ...heroBase, minHeight: '100vh', padding: '0 4px' }
    : heroBase;
  const title = mounted && isMobile
    ? { ...titleStyle, fontSize: 28 }
    : titleStyle;
  const subtitle = mounted && isMobile
    ? { ...subtitleStyle, fontSize: 15, marginBottom: 16 }
    : subtitleStyle;
  const desc = mounted && isMobile
    ? { ...descStyle, fontSize: 13, maxWidth: 320 }
    : descStyle;
  const gem = mounted && isMobile
    ? { ...gemStyle, fontSize: 40, marginBottom: 12 }
    : gemStyle;
  const wave = mounted && isMobile
    ? { ...waveStyle, width: 60, height: 10, marginBottom: 12 }
    : waveStyle;
  return { hero, title, subtitle, desc, gem, wave };
}

const Header: React.FC = () => {
  const { hero, title, subtitle, desc, gem, wave } = useResponsiveHeroStyle();
  return (
    <header style={hero}>
      <span style={gem}>
        <i className="fas fa-gem" />
      </span>
      <h1 style={title}>Rubyの歴史</h1>
      {/* 波線SVGアクセント */}
      <svg style={wave} viewBox="0 0 120 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 9 Q30 18 60 9 T120 9" stroke="#fca5a5" strokeWidth="3" fill="none" />
      </svg>
      <div style={subtitle}>歴史を知れば、未来が見える。バージョンごとに紐解くRubyの革新。</div>
      <p style={desc}>
        なぜRubyは世界中の開発者を魅了し続けるのか？<br />
        その答えを、時代ごとの進化とともに体感しよう。
      </p>
    </header>
  );
};

export default Header;