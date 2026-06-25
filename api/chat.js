
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ reply: "Method not allowed" });

  const { message } = JSON.parse(req.body);
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ reply: "API key ኣልተገኘም። Vercel Environment Variables ይመልከቱ።" });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      return res.status(500).json({ reply: "API ምላሽ ስህተት ኣጋጥሞታል፣ ቆይተህ ሞክር።" });
    }

    if (!data.candidates || !data.candidates[0]) {
      console.error('No candidates in response:', data);
      return res.status(500).json({ reply: "ምላሽ ኣልተመለሰም፣ ድጋሚ ሞክር።" });
    }

    const reply = data.candidates[0].content.parts[0].text;
    res.status(200).json({ reply: reply });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ reply: "ስህተት ተፈጥሯል፣ ቆይተህ ሞክር።" });
  }
}
