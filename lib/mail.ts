import nodemailer from "nodemailer";

// Função auxiliar para converter string "true"/"false" do .env em booleano real
const toBool = (value: string | undefined) => value === "true";

// Configuração do Transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: toBool(process.env.EMAIL_SERVER_SECURE),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

// Template HTML Atualizado com Data e Hora
const getTemplate = (patientName: string, dateStr: string, timeStr: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica', 'Arial', sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background-color: #062214; padding: 40px 20px; text-align: center; }
    .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
    .appointment-card { background-color: #f0fdf4; border: 1px solid #76A771; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
    .button { display: inline-block; background-color: #76A771; color: #062214; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; margin: 20px 0; }
    .footer { background-color: #0A311D; padding: 20px; text-align: center; color: #76A771; font-size: 12px; }
    h1 { color: #062214; font-size: 24px; margin-bottom: 20px; }
    h2 { color: #0A311D; font-size: 18px; margin: 0 0 10px 0; }
    p { margin-bottom: 15px; font-size: 16px; color: #4a5568; }
    .highlight { color: #062214; font-weight: bold; font-size: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="cid:logo_fitoclin" alt="Fitoclin Logo" width="120" style="display: block; margin: 0 auto;" />
    </div>
    
    <div class="content">
      <h1>Olá, ${patientName.split(' ')[0]}! 🌿</h1>
      
      <p>Seja muito bem-vindo(a) à sua pré-consulta rumo a uma saúde <strong>FITOPLENA</strong>.</p>
      
      <div class="appointment-card">
        <h2>🗓️ Agendamento Confirmado</h2>
        <p style="margin: 5px 0;">Sua consulta foi agendada para:</p>
        <div class="highlight">${dateStr} às ${timeStr}</div>
      </div>

      <p>Obrigada por confiar no meu trabalho! Este formulário rápido (3 a 5 min) é o primeiro passo da sua jornada. Através dele, vou entender como está sua saúde física, emocional e espiritual, para preparar um plano com plantas medicinais personalizadas e orientações naturais, específicas para o seu momento.</p>
      
      <p>Preencher o formulário é abrir a porta para um cuidado verdadeiro e transformador. A sua cura começa aqui.</p>

      <div style="text-align: center;">
        <a href="https://forms.gle/4qXWCgGrwURyzLcn7" class="button">
          Preencher Formulário de Pré-Consulta
        </a>
      </div>
      
      <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #718096;">
        Nos vemos em breve!<br>
        Com carinho, <strong>Dra. Isa</strong>
      </p>
    </div>

    <div class="footer">
      <p style="margin: 0;">Dra. Isa - Farmacêutica | Fitoterapeuta Clínica</p>
      <p style="margin: 5px 0 0;"><a href="https://instagram.com/clinicafitoclin.draisafito" style="color: #76A771; text-decoration: none;">@clinicafitoclin.draisafito</a></p>
    </div>
  </div>
</body>
</html>
`;

// Agora a função aceita o objeto Date
export async function sendPreConsultationEmail(email: string, name: string, appointmentDate: Date) {
  const logoBase64 = `data:image/png;base64,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`; 
  
  // Formatação pt-BR bonita (ex: "25 de Outubro" e "14:30")
  const dateStr = appointmentDate.toLocaleDateString("pt-BR", { day: 'numeric', month: 'long' });
  const timeStr = appointmentDate.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });

  const htmlContent = getTemplate(name, dateStr, timeStr);

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Agendamento Confirmado: ${dateStr} às ${timeStr} 🌿`, // Assunto mais informativo
      html: htmlContent,
      attachments: logoBase64 ? [
        {
          filename: 'logo.png',
          path: logoBase64,
          cid: 'logo_fitoclin'
        }
      ] : []
    });

    console.log("Email enviado: %s", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return { success: false, error };
  }
}

