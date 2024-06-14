const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/metadata', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'Se requiere una URL como parámetro.' });
    }

    try {
        // Fetch al contenido de la página
        const { data } = await axios.get(url);

        // Cargar el HTML a cheerio
        const $ = cheerio.load(data);

        // Extraer metadata
        const title = $('title').text();
        const description = $('meta[name="description"]').attr('content');
        const finalUrl = url;

        // Enviar la respuesta
        res.json({ title, description, url: finalUrl });
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el sitio web.' }); // Respuesta en caso de error.
    }
});

app.listen(port, () => {
    console.log(`El servidor está corriendo en: http://localhost:${port}`);
});