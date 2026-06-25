export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { message } = JSON.parse(req.body);

    try {
        // እዚህ ጋር OpenAI ወይም Gemini API ጥሪ ይደረጋል
        // ለሙከራ እንዲህ እናድርገው፡
        res.status(200).json({ reply: "BINARIYO AI አሁን ከ Backend ጋር ተገናኝቷል! የጠየቅከውም ይህ ነው፡ " + message });
    } catch (error) {
        res.status(500).json({ reply: "ስህተት ተፈጥሯል፣ እባክዎ እንደገና ይሞክሩ።" });
    }
}
