import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { term } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'APIキーが設定されていません' }, { status: 500 });
  }

  const prompt = `Rubyの初心者向けに、以下の用語を分かりやすく解説してください。可能であれば、簡単なコード例も添えてください。用語: ${term}`;
  const chatHistory = [
    { role: "user", parts: [{ text: prompt }] }
  ];
  const payload = { contents: chatHistory };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    const result = await response.json();
    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      const text = result.candidates[0].content.parts[0].text;
      return NextResponse.json({ text });
    } else {
      return NextResponse.json({ error: '用語の解説を取得できませんでした。' }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: 'Gemini APIリクエストでエラーが発生しました。' }, { status: 500 });
  }
} 