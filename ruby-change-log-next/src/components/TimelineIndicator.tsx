import React from "react";

const indicatorStyle: React.CSSProperties = {
  position: "relative",
  height: 40,
  width: 2,
  background: "#ef4444",
  margin: "0 auto 48px auto",
};
const dotStyle: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  width: 12,
  height: 12,
  background: "#ef4444",
  borderRadius: "50%",
};

const TimelineIndicator: React.FC = () => (
  <div style={indicatorStyle}>
    <div style={{ ...dotStyle, top: 0 }} />
    <div style={{ ...dotStyle, bottom: 0 }} />
  </div>
);

export default TimelineIndicator; 