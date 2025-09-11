
// ==============================
// API Route en Vercel (Data.js) con Nodemailer
// ==============================
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { name, email, company, project } = req.body;

  if (!name || !email || !project) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
  user: process.env.GMAIL_USER,
  pass: process.env.GMAIL_PASS,
}

  });

  try {
    await transporter.sendMail({
      from: "ec.andorasoft@gmail.com",
      replyTo: email,
      to: "ec.andorasoft@gmail.com",
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
