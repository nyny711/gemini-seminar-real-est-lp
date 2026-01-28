/**
 * SendGridメール送信ヘルパー
 */

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "noreply@anyenv-inc.com";
const ADMIN_EMAIL = "info@anyenv-inc.com";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

/**
 * SendGrid APIを使用してメールを送信
 */
export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.warn("[SendGrid] API key not configured, skipping email send");
    return false;
  }

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: SENDGRID_FROM_EMAIL },
        subject,
        content: [{ type: "text/html", value: html }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[SendGrid] Failed to send email:", response.status, errorText);
      return false;
    }

    console.log(`[SendGrid] Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error("[SendGrid] Error sending email:", error);
    return false;
  }
}

/**
 * 管理者への通知メール（HTML形式）
 */
export async function sendAdminNotification(registration: {
  companyName: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  challenge?: string | null;
  createdAt: Date;
}): Promise<boolean> {
  const subject = `【新規申込】不動産営業向けGemini活用セミナー - ${registration.name}様`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Noto Sans JP', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #1f2937; margin-bottom: 5px; }
    .value { background: white; padding: 12px; border-radius: 4px; border-left: 4px solid #06b6d4; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 新規セミナー申込</h1>
      <p>不動産営業向けGemini活用セミナーに新しい申込がありました</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">会社名</div>
        <div class="value">${registration.companyName}</div>
      </div>
      <div class="field">
        <div class="label">氏名</div>
        <div class="value">${registration.name}</div>
      </div>
      <div class="field">
        <div class="label">役職</div>
        <div class="value">${registration.position}</div>
      </div>
      <div class="field">
        <div class="label">メールアドレス</div>
        <div class="value">${registration.email}</div>
      </div>
      <div class="field">
        <div class="label">電話番号</div>
        <div class="value">${registration.phone}</div>
      </div>
      ${
        registration.challenge
          ? `
      <div class="field">
        <div class="label">現在の課題</div>
        <div class="value">${registration.challenge}</div>
      </div>
      `
          : ""
      }
      <div class="field">
        <div class="label">申込日時</div>
        <div class="value">${registration.createdAt.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}</div>
      </div>
    </div>
    <div class="footer">
      <p>anyenv株式会社 セミナー管理システム</p>
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({
    to: ADMIN_EMAIL,
    subject,
    html,
  });
}

/**
 * 申込者への自動返信メール（HTML形式）
 */
export async function sendApplicantConfirmation(registration: {
  companyName: string;
  name: string;
  position: string;
  email: string;
}): Promise<boolean> {
  const subject = "【申込完了】不動産営業向けGemini活用セミナー";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Noto Sans JP', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #06b6d4; }
    .info-box h3 { margin-top: 0; color: #1f2937; }
    .button { display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ セミナー申込完了</h1>
      <p>ご登録ありがとうございます</p>
    </div>
    <div class="content">
      <p>${registration.name} 様</p>
      <p>この度は「不動産営業向けGemini活用セミナー」にお申込みいただき、誠にありがとうございます。</p>
      
      <div class="info-box">
        <h3>📅 セミナー概要</h3>
        <p><strong>タイトル：</strong>商談時間を最大化する ～非コア業務をAIで自動化し、顧客に向き合う～</p>
        <p><strong>日時：</strong>2026年2月3日（月） 14:00～15:00</p>
        <p><strong>開催形式：</strong>オンライン（Google Meet）</p>
        <p><strong>参加費：</strong>無料</p>
      </div>

      <div class="info-box">
        <h3>📝 ご登録内容</h3>
        <p><strong>会社名：</strong>${registration.companyName}</p>
        <p><strong>氏名：</strong>${registration.name}</p>
        <p><strong>役職：</strong>${registration.position}</p>
        <p><strong>メールアドレス：</strong>${registration.email}</p>
      </div>

      <p>セミナー開催日の前日に、Google MeetのURLをメールにてお送りいたします。</p>
      
      <p><strong>【重要なお知らせ】</strong></p>
      <ul>
        <li>研修に関して、事前にご連絡させていただく場合がございます</li>
        <li>同業他社様のご参加はお断りする場合がございます</li>
      </ul>

      <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>
    </div>
    <div class="footer">
      <p><strong>anyenv株式会社</strong></p>
      <p>代表取締役：四宮 浩二</p>
      <p>〒150-0043 東京都渋谷区道玄坂2-25-12 道玄坂通5F</p>
      <p>お問い合わせ：<a href="mailto:info@anyenv-inc.com">info@anyenv-inc.com</a></p>
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({
    to: registration.email,
    subject,
    html,
  });
}
