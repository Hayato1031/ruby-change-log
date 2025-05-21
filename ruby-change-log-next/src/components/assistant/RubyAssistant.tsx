'use client'
import React, { useState } from 'react';

const fabStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 32,
  right: 32,
  background: '#dc2626',
  color: '#fff',
  borderRadius: '50%',
  width: 60,
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
  cursor: 'pointer',
  zIndex: 1050,
  border: 'none',
  outline: 'none',
  transition: 'background 0.3s, transform 0.2s',
};
const fabHoverStyle: React.CSSProperties = {
  background: '#b91c1c',
  transform: 'translateY(-2px)',
};
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1100,
};
const modalStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 24,
  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
  padding: 40,
  maxWidth: 500,
  width: '90%',
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
};
const closeBtnStyle: React.CSSProperties = {
  position: 'absolute',
  top: 16,
  right: 16,
  background: 'none',
  border: 'none',
  fontSize: 24,
  color: '#666',
  cursor: 'pointer',
  borderRadius: '50%',
  padding: 8,
  transition: 'background 0.2s',
};
const inputStyle: React.CSSProperties = {
  flexGrow: 1,
  padding: 12,
  border: '1px solid #ccc',
  borderRadius: 8,
  fontSize: 16,
  marginRight: 8,
};
const buttonStyle: React.CSSProperties = {
  background: '#dc2626',
  color: '#fff',
  fontWeight: 700,
  padding: '12px 24px',
  borderRadius: 8,
  border: 'none',
  fontSize: 16,
  cursor: 'pointer',
  transition: 'background 0.3s, transform 0.2s',
};
const outputBoxStyle: React.CSSProperties = {
  background: '#fef2f2',
  border: '1px solid #fca5a5',
  color: '#991b1b',
  padding: 24,
  borderRadius: 16,
  minHeight: 80,
  marginTop: 24,
  fontSize: 17,
  wordBreak: 'break-word',
  textAlign: 'left',
};
const loadingStyle: React.CSSProperties = {
  margin: '16px auto',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #dc2626',
  borderRadius: '50%',
  width: 24,
  height: 24,
  animation: 'spin 1s linear infinite',
};

const RubyAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [term, setTerm] = useState('');
  const [output, setOutput] = useState('ここに解説が表示されます。');
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!term.trim()) {
      setOutput('解説してほしい用語を入力してください。');
      return;
    }
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term }),
      });
      const data = await res.json();
      if (data.text) {
        // コードブロックや太字をHTMLに変換
        const formatted = data.text
          .replace(/```ruby\n([\s\S]*?)\n```/g, (m: string, code: string) => `<pre style='background:#f3f3f3;padding:12px;border-radius:8px;overflow-x:auto;margin:8px 0;'>${code.trim()}</pre>`)
          .replace(/```([\s\S]*?)\n```/g, (m: string, code: string) => `<pre style='background:#f3f3f3;padding:12px;border-radius:8px;overflow-x:auto;margin:8px 0;'>${code.trim()}</pre>`)
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n/g, '<br>');
        setOutput(formatted);
      } else {
        setOutput(data.error || '用語の解説を取得できませんでした。');
      }
    } catch {
      setOutput('エラーが発生しました。インターネット接続を確認し、再度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        style={hover ? { ...fabStyle, ...fabHoverStyle } : fabStyle}
        onClick={() => setOpen(true)}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        aria-label="Ruby用語解説アシスタントを開く"
      >
        <i className="fas fa-lightbulb" />
      </button>
      {open && (
        <div style={overlayStyle} onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div style={modalStyle}>
            <button style={closeBtnStyle} onClick={() => setOpen(false)} aria-label="閉じる">
              <i className="fas fa-times" />
            </button>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#b91c1c', textAlign: 'center', marginBottom: 24 }}>
              <i className="fas fa-question-circle" style={{ marginRight: 8 }} />Ruby用語解説アシスタント
            </h2>
            <p style={{ textAlign: 'center', fontSize: 18, color: '#666', marginBottom: 24 }}>
              知りたいRubyの用語を入力してください。AIが初心者にも分かりやすく解説します！
            </p>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
              <input
                type="text"
                value={term}
                onChange={e => setTerm(e.target.value)}
                placeholder="例: オブジェクト指向、ブロック、Ractor"
                style={inputStyle}
                onKeyDown={e => { if (e.key === 'Enter') handleExplain(); }}
              />
              <button style={buttonStyle} onClick={handleExplain}>
                <span style={{ marginRight: 8 }}><i className="fas fa-comment-dots" /></span>解説！
              </button>
            </div>
            {loading && <div style={loadingStyle} />}
            <div style={outputBoxStyle} dangerouslySetInnerHTML={{ __html: output }} />
          </div>
        </div>
      )}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </>
  );
};

export default RubyAssistant; 