'use client'
import React from "react";

export type Feature = {
  icon: string; // FontAwesomeクラス
  title: string;
  description: string;
};

export type VersionCardProps = {
  id: string;
  version: string;
  title: string;
  summary: string;
  features: Feature[];
  position: string;
  performance: string;
};

const cardBaseStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 24,
  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
  border: "1px solid #e2e8f0",
  width: "100%",
  maxWidth: 900,
  margin: "32px auto",
  padding: 32,
  boxSizing: "border-box",
  transition: "box-shadow 0.3s, transform 0.3s",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginBottom: 24,
  flexWrap: "wrap",
};
const versionNumberStyle: React.CSSProperties = {
  fontSize: 48,
  fontWeight: 700,
  color: "#dc2626",
  marginRight: 24,
  flexShrink: 0,
};
const versionTitleStyle: React.CSSProperties = {
  fontSize: 30,
  fontWeight: 600,
  color: "#1e293b",
  lineHeight: 1.3,
  flexGrow: 1,
  minWidth: 0,
};
const summaryStyle: React.CSSProperties = {
  fontStyle: "italic",
  color: "#475569",
  marginTop: 16,
  marginBottom: 32,
  fontSize: 18,
};
const sectionHeadingStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 600,
  color: "#1e293b",
  marginTop: 32,
  marginBottom: 16,
  borderBottom: "2px solid #cbd5e1",
  paddingBottom: 8,
};
const featureListStyle: React.CSSProperties = {
  listStyle: "none",
  paddingLeft: 0,
  marginTop: 24,
};
const featureItemStyle: React.CSSProperties = {
  background: "#fef2f2",
  borderLeft: "4px solid #dc2626",
  padding: "16px 24px",
  marginBottom: 12,
  borderRadius: 12,
  display: "block",
  fontSize: 16,
};
const featureTitleWrapperStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  marginBottom: 8,
};
const iconStyle: React.CSSProperties = {
  marginRight: 12,
  fontSize: 24,
  color: "#dc2626",
  flexShrink: 0,
};
const strongStyle: React.CSSProperties = {
  color: "#991b1b",
  marginRight: 8,
  flexShrink: 0,
};
const paragraphStyle: React.CSSProperties = {
  wordBreak: "break-word",
};

function useResponsiveCardStyle() {
  const [style, setStyle] = React.useState(cardBaseStyle);
  const [titleStyle, setTitleStyle] = React.useState(versionTitleStyle);
  const [numberStyle, setNumberStyle] = React.useState(versionNumberStyle);
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setStyle({ ...cardBaseStyle, width: 'calc(100% - 32px)', padding: 12, margin: '16px auto' });
        setTitleStyle({ ...versionTitleStyle, fontSize: 18 });
        setNumberStyle({ ...versionNumberStyle, fontSize: 36 });
      } else {
        setStyle(cardBaseStyle);
        setTitleStyle(versionTitleStyle);
        setNumberStyle(versionNumberStyle);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return { style, titleStyle, numberStyle };
}

const VersionCard: React.FC<VersionCardProps> = ({
  id,
  version,
  title,
  summary,
  features,
  position,
  performance,
}) => {
  const { style: cardStyle, titleStyle, numberStyle } = useResponsiveCardStyle();
  return (
    <section id={id} style={cardStyle}>
      <div style={headerStyle}>
        <div style={numberStyle}>{version}</div>
        <h2 style={titleStyle}>{title}</h2>
      </div>
      <p style={summaryStyle}>{summary}</p>
      <h3 style={sectionHeadingStyle}>主な機能追加と変更点</h3>
      <ul style={featureListStyle}>
        {features.map((f, i) => (
          <li key={i} style={featureItemStyle}>
            <div style={featureTitleWrapperStyle}>
              <span style={iconStyle}><i className={f.icon} /></span>
              <strong style={strongStyle}>{f.title}</strong>
            </div>
            <p style={paragraphStyle}>{f.description}</p>
          </li>
        ))}
      </ul>
      <h3 style={sectionHeadingStyle}>Rubyの立ち位置と変化</h3>
      <p style={paragraphStyle}>{position}</p>
      <h3 style={sectionHeadingStyle}>パフォーマンス</h3>
      <p style={paragraphStyle}>{performance}</p>
    </section>
  );
};

export default VersionCard; 