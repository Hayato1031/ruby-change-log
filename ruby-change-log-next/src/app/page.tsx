import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VersionCard from "@/components/VersionCard";
import TimelineIndicator from "@/components/TimelineIndicator";
import rubyVersions from "@/data/rubyVersions";
import RubyAssistant from "@/components/assistant/RubyAssistant";

const mainLayoutStyle: React.CSSProperties = {
  display: "flex",
  minHeight: "100vh",
  width: "100vw",
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  background: "#f0f4f8",
};
const contentAreaStyle: React.CSSProperties = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
};
const mainContainerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 1200,
  margin: "0 auto",
  padding: "16px 0",
  flex: 1,
  boxSizing: "border-box",
};

export default function Home() {
  return (
    <div style={mainLayoutStyle}>
      <Sidebar />
      <div style={contentAreaStyle}>
        <Header />
        <main style={mainContainerStyle}>
          {rubyVersions.map((ver, i) => (
            <div key={ver.id + "-wrap"}>
              <VersionCard key={ver.id} {...ver} />
              {i < rubyVersions.length - 1 && <TimelineIndicator />}
            </div>
          ))}
        </main>
        <Footer />
        <RubyAssistant />
      </div>
    </div>
  );
}
