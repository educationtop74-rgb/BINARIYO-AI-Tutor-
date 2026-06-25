export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { message } = JSON.parse(req.body);
  const API_KEY = process.env.GEMINI_API_KEY; // በ Vercel የሰጠነው ስም

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;
    
    res.status(200).json({ reply: reply });
  } catch (error) {
    res.status(500).json({ reply: "ይቅርታ፣ በ AI መገናኘት ላይ ስህተት ተፈጥሯል።" });
  }
}

