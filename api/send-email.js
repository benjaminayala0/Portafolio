export default async function handler(req, res) {
    // Enable CORS for localhost testing (Vercel automatically handles this in production for same domain)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Todos los campos son requeridos.' });
        }

        const BREVO_API_KEY = process.env.BREVO_API_KEY;
        const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

        if (!BREVO_API_KEY || !CONTACT_EMAIL) {
            console.error("Faltan variables de entorno BREVO_API_KEY o CONTACT_EMAIL");
            return res.status(500).json({ error: 'Error del servidor: Configuración faltante.' });
        }

        // Brevo requires the sender to be an email authenticated on your Brevo account
        // Assuming your Brevo account uses the same CONNECT_EMAIL you provide.
        const payload = {
            sender: {
                name: "Portafolio Web (No-Reply)",
                email: CONTACT_EMAIL
            },
            to: [
                {
                    name: "Benjamín Ayala",
                    email: CONTACT_EMAIL
                }
            ],
            replyTo: {
                name: name,
                email: email
            },
            subject: `💡 Nuevo contacto de: ${name} (Portafolio)`,
            htmlContent: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #6366f1;">Has recibido un nuevo mensaje</h2>
                    <p>Alguien se contactó mediante el formulario de tu portafolio web.</p>
                    <hr style="border: none; border-top: 1px solid #eee; my: 20px;" />
                    <p><strong>De:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email} (Puedes responder a este correo directamente)</p>
                    <p><strong>Mensaje:</strong></p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #6366f1; border-radius: 4px; white-space: pre-wrap;">${message}</div>
                </div>
            `
        };

        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error de Brevo:", errorData);
            return res.status(500).json({ error: 'Fallo al enviar correo mediante Brevo.' });
        }

        return res.status(200).json({ success: true, message: 'Correo enviado correctamente' });

    } catch (error) {
        console.error("Excepción backend:", error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
}
