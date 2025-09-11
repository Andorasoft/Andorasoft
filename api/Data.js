
// ==============================
// API Route en Vercel (Data.js) con Nodemailer
// ==============================
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { name, email, company, project } = req.body;

  // Validación básica
  if (!name || !email || !project) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  // Configuración del transportador SMTP con Gmail y App Password
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true para 465
    auth: {
      user: process.env.GMAIL_USER, // tu correo
      pass: process.env.GMAIL_PASS, // tu App Password de 16 dígitos
    },
  });

  try {
    // Enviar el correo
    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`, // remitente
      replyTo: email, // para responder al remitente
      to: process.env.GMAIL_USER, // receptor (tú mismo)
      subject: `Nuevo mensaje de ${name}`,
      text: `
📌 Nombre: ${name}
📧 Email: ${email}
🏢 Empresa: ${company || "No especificada"}
💡 Proyecto: ${project}
      `,
    });

    return res.status(200).json({ message: "✅ Mensaje enviado correctamente" });
  } catch (error) {
    console.error("❌ Error enviando correo:", error);
    return res.status(500).json({ error: "Error al enviar el mensaje" });
  }
}
