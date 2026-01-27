import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: true, // Use true para porta 465, false para outras
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

// Constante para facilitar a troca da logo no futuro se precisar
const LOGO_URL = "https://bzbrxkmhdxvh0b4p.public.blob.vercel-storage.com/logo2-Photoroom.png";

export const sendEmail = async (data: EmailPayload) => {
  const { to, subject, html } = data;

  try {
    await transporter.sendMail({
      from: `"FitoClin Dra. Isa" <${process.env.EMAIL_FROM}>`, 
      to,
      subject,
      html,
    });
    console.log(`✅ E-mail enviado para ${to}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    return { success: false };
  }
};

// --- TEMPLATES DE E-MAIL (HTML Simples + Logo) ---

export const getWelcomeTemplate = (name: string) => `
  <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
    
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${LOGO_URL}" alt="Logo FitoClin" style="width: 150px; height: auto;" />
    </div>

    <h2 style="color: #16a34a; text-align: center;">Olá, ${name}! 👋</h2>
    
    <p style="font-size: 16px; line-height: 1.5;">Obrigada pelo interesse na <strong>Clínica Fitoclin</strong>.</p>
    
    <p style="font-size: 16px; line-height: 1.5;">Recebemos o seu contato e a nossa equipa irá chamar no WhatsApp em breve para tirar todas as suas dúvidas e explicar como funciona o nosso método.</p>
    
    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
    
    <p style="font-size: 12px; color: #888; text-align: center;">
      Atenciosamente,<br>
      <strong>Equipa Dra. Isa</strong>
    </p>
  </div>
`;

export const getAppointmentTemplate = (name: string, date: Date, type: string) => `
  <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
    
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${LOGO_URL}" alt="Logo FitoClin" style="width: 150px; height: auto;" />
    </div>

    <h2 style="color: #2563eb; text-align: center;">Consulta Confirmada! ✅</h2>
    
    <p style="font-size: 16px; line-height: 1.5;">Olá <strong>${name}</strong>,</p>
    <p style="font-size: 16px; line-height: 1.5;">A sua consulta de <strong>${type}</strong> está agendada com sucesso.</p>
    
    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
      <p style="margin: 5px 0; font-size: 18px;">📅 <strong>Data:</strong> ${date.toLocaleDateString('pt-PT')}</p>
      <p style="margin: 5px 0; font-size: 18px;">⏰ <strong>Hora:</strong> ${date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}</p>
    </div>
    
    <p style="text-align: center; font-size: 14px; color: #666;">Por favor, tente conectar-se ou chegar 5 minutos antes do horário agendado.</p>

    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
    
    <p style="font-size: 12px; color: #888; text-align: center;">
      Atenciosamente,<br>
      <strong>Equipa Dra. Isa</strong>
    </p>
  </div>
`;

export const getCRMWelcomeTemplate = (name: string) => `
  <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
    
    <div style="text-align: center; margin-bottom: 30px; background-color: #051F12; padding: 20px; border-radius: 8px;">
      <img src="${LOGO_URL}" alt="Logo Fitoclin" style="width: 120px; height: auto;" />
    </div>

    <h2 style="color: #051F12; text-align: center; font-size: 24px;">Bem-vindo ao Fitoclin PRO! 🚀</h2>
    
    <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">Olá, <strong>${name}</strong>.</p>
    
    <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
      Sua assinatura do <strong>CRM Profissional</strong> foi confirmada. Agora você tem em mãos uma ferramenta completa para gerir sua clínica e encantar seus pacientes.
    </p>

    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin: 25px 0;">
      <p style="margin: 0 0 10px 0; font-weight: bold; color: #166534;">O que você pode fazer agora:</p>
      <ul style="margin: 0; padding-left: 20px; color: #15803d;">
        <li style="margin-bottom: 5px;">Cadastrar seus primeiros pacientes</li>
        <li style="margin-bottom: 5px;">Configurar sua agenda de atendimentos</li>
        <li style="margin-bottom: 5px;">Criar prescrições digitais personalizadas</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background-color: #D4AF37; color: #051F12; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 50px; display: inline-block;">
        Acessar Meu Dashboard CRM
      </a>
    </div>

    <p style="font-size: 14px; color: #6b7280; text-align: center;">
      Se precisar de ajuda para configurar, nossa equipe de suporte está à disposição.
    </p>
  </div>
`;
