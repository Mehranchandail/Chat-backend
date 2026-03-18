const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/notification', async (req, res) => {
    const { playerId, title, message, url } = req.body;

    // Environment Variables se keys utha raha hai
    const APP_ID = process.env.ONESIGNAL_APP_ID;
    const API_KEY = process.env.ONESIGNAL_REST_API_KEY;

    try {
        const response = await fetch('https://onesignal.com/api/v1/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${API_KEY}`
            },
            body: JSON.stringify({
                app_id: APP_ID,
                include_player_ids: [playerId],
                headings: { "en": title },
                contents: { "en": message },
                url: url
            })
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running'));

module.exports = app;
