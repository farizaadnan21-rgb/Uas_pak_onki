export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({error: 'Method Not Allowed'});
    
    try {
        const { filename, base64 } = req.body;
        if (!filename || !base64) return res.status(400).json({error: 'Missing file data'});

        // Extract raw base64 if it has data URL prefix
        const base64Data = base64.replace(/^data:.*?;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        const blob = new Blob([buffer]);
        
        const formData = new FormData();
        formData.append('reqtype', 'fileupload');
        formData.append('fileToUpload', blob, filename);

        const response = await fetch('https://catbox.moe/user/api.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Upload failed with status ' + response.status);
        
        const url = await response.text();
        res.status(200).json({ url: url.trim() });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
