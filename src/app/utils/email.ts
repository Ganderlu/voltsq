import { Resend } from 'resend';

// Initialize lazily to avoid crashing during module load if API key is missing
let resend: Resend | null = null;

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendWelcomeEmail(email: string, fullName: string) {
  try {
    const resendClient = getResend();
    
    if (!resendClient) {
      console.warn('⚠️ [Email] Resend API key missing. Skipping email.');
      return { success: false, error: 'API key missing' };
    }

    const { data, error } = await resendClient.emails.send({
      from: 'Voltsq Investments <onboarding@resend.dev>', // Replace with your verified domain
      to: [email],
      subject: 'Welcome to Voltsq Investments! 🚀',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Voltsq</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f7f9; }
              .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
              .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px 20px; text-align: center; color: #ffffff; }
              .header h1 { margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
              .content { padding: 40px 30px; }
              .content h2 { color: #1e293b; margin-top: 0; }
              .btn { display: inline-block; padding: 14px 28px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 20px; transition: background 0.3s ease; }
              .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
              .highlight { color: #3b82f6; font-weight: 600; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Voltsq Investments</h1>
              </div>
              <div class="content">
                <h2>Welcome, ${fullName}!</h2>
                <p>We're thrilled to have you join our global community of elite investors.</p>
                <p>At <span class="highlight">Voltsq</span>, we provide you with the tools, insights, and security you need to excel in the digital asset landscape.</p>
                <p>Your account is now active and you've been credited with <strong>$10,000</strong> in your demo account to start practicing your strategies immediately.</p>
                <a href="https://voltsq.com/login" class="btn">Start Trading Now</a>
                <p style="margin-top: 30px;">If you have any questions, our 24/7 support team is always here to help.</p>
                <p>Best regards,<br>The Voltsq Team</p>
              </div>
              <div class="footer">
                <p>&copy; 2026 Voltsq Investments. All rights reserved.</p>
                <p>This is an automated message, please do not reply directly to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Email Send Error:', err);
    return { success: false, error: err };
  }
}

function maskAddress(address: string) {
  const trimmed = address.trim();
  if (trimmed.length <= 12) return trimmed;
  return `${trimmed.slice(0, 6)}...${trimmed.slice(-4)}`;
}

export async function sendWithdrawalApprovedEmail(params: {
  toEmail: string;
  fullName?: string;
  withdrawalId: string;
  amount: number;
  asset?: string;
  receiveAmount?: number;
  address?: string;
  processedAtISO?: string;
}) {
  try {
    const resendClient = getResend();

    if (!resendClient) {
      console.warn("⚠️ [Email] Resend API key missing. Skipping email.");
      return { success: false, error: "API key missing" };
    }

    const displayName = params.fullName?.trim() || "Investor";
    const asset = params.asset || "USDT";
    const processedAt = params.processedAtISO
      ? new Date(params.processedAtISO)
      : new Date();
    const processedAtText = processedAt.toLocaleString();
    const addressText = params.address ? maskAddress(params.address) : "N/A";
    const receiveText =
      typeof params.receiveAmount === "number" && Number.isFinite(params.receiveAmount)
        ? `$${params.receiveAmount.toFixed(2)}`
        : "—";

    const amountText = `$${Number(params.amount).toFixed(2)}`;

    const { data, error } = await resendClient.emails.send({
      from: "Voltsq Investments <onboarding@resend.dev>",
      to: [params.toEmail],
      subject: "Your withdrawal has been approved",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Withdrawal Approved</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #0f172a; margin: 0; padding: 0; background-color: #f4f7f9; }
              .container { max-width: 640px; margin: 20px auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.06); }
              .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 34px 22px; text-align: center; color: #ffffff; }
              .brand { margin: 0; font-size: 22px; font-weight: 900; letter-spacing: -0.3px; }
              .subtitle { margin: 8px 0 0; font-size: 13px; opacity: 0.9; }
              .content { padding: 30px 24px; }
              .title { margin: 0 0 10px; font-size: 22px; font-weight: 900; }
              .text { margin: 0 0 16px; color: #334155; }
              .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; background: #f8fafc; }
              .row { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
              .row:last-child { border-bottom: none; }
              .k { width: 42%; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
              .v { width: 58%; font-weight: 700; color: #0f172a; }
              .badge { display: inline-block; margin-top: 14px; padding: 8px 12px; border-radius: 999px; background: rgba(59, 130, 246, 0.12); color: #1d4ed8; font-weight: 800; font-size: 12px; }
              .footer { background: #f8fafc; padding: 18px 22px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
              .muted { color: #64748b; font-size: 12px; margin: 16px 0 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="brand">Voltsq Investments</div>
                <div class="subtitle">Withdrawal Status Update</div>
              </div>
              <div class="content">
                <div class="title">Withdrawal Approved</div>
                <p class="text">Hello ${displayName}, your withdrawal request has been approved and is now being processed.</p>
                <div class="card">
                  <div class="row"><div class="k">Amount</div><div class="v">${amountText}</div></div>
                  <div class="row"><div class="k">Asset</div><div class="v">${asset}</div></div>
                  <div class="row"><div class="k">You will receive</div><div class="v">${receiveText}</div></div>
                  <div class="row"><div class="k">Destination</div><div class="v">${addressText}</div></div>
                  <div class="row"><div class="k">Reference</div><div class="v">${params.withdrawalId}</div></div>
                  <div class="row"><div class="k">Approved at</div><div class="v">${processedAtText}</div></div>
                </div>
                <div class="badge">Approved</div>
                <p class="muted">If you did not request this withdrawal or you notice anything unusual, contact support@voltsq.com immediately.</p>
              </div>
              <div class="footer">
                <div>&copy; 2026 Voltsq Investments. All rights reserved.</div>
                <div>This is an automated message. Please do not reply directly to this email.</div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Email Send Error:", err);
    return { success: false, error: err };
  }
}

export async function sendDepositApprovedEmail(params: {
  toEmail: string;
  fullName?: string;
  depositId: string;
  amount: number;
  asset?: string;
  network?: string;
  txHash?: string;
  approvedAtISO?: string;
}) {
  try {
    const resendClient = getResend();

    if (!resendClient) {
      console.warn("⚠️ [Email] Resend API key missing. Skipping email.");
      return { success: false, error: "API key missing" };
    }

    const displayName = params.fullName?.trim() || "Investor";
    const asset = params.asset || "USDT";
    const network = params.network ? ` (${params.network})` : "";
    const approvedAt = params.approvedAtISO ? new Date(params.approvedAtISO) : new Date();
    const approvedAtText = approvedAt.toLocaleString();
    const amountText = `$${Number(params.amount).toFixed(2)}`;
    const txText = params.txHash ? `${params.txHash.slice(0, 10)}...${params.txHash.slice(-6)}` : "N/A";

    const { data, error } = await resendClient.emails.send({
      from: "Voltsq Investments <onboarding@resend.dev>",
      to: [params.toEmail],
      subject: "Your deposit has been approved",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Deposit Approved</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #0f172a; margin: 0; padding: 0; background-color: #f4f7f9; }
              .container { max-width: 640px; margin: 20px auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.06); }
              .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 34px 22px; text-align: center; color: #ffffff; }
              .brand { margin: 0; font-size: 22px; font-weight: 900; letter-spacing: -0.3px; }
              .subtitle { margin: 8px 0 0; font-size: 13px; opacity: 0.9; }
              .content { padding: 30px 24px; }
              .title { margin: 0 0 10px; font-size: 22px; font-weight: 900; }
              .text { margin: 0 0 16px; color: #334155; }
              .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; background: #f8fafc; }
              .row { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
              .row:last-child { border-bottom: none; }
              .k { width: 42%; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
              .v { width: 58%; font-weight: 700; color: #0f172a; }
              .badge { display: inline-block; margin-top: 14px; padding: 8px 12px; border-radius: 999px; background: rgba(34, 197, 94, 0.12); color: #15803d; font-weight: 800; font-size: 12px; }
              .footer { background: #f8fafc; padding: 18px 22px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
              .muted { color: #64748b; font-size: 12px; margin: 16px 0 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="brand">Voltsq Investments</div>
                <div class="subtitle">Deposit Status Update</div>
              </div>
              <div class="content">
                <div class="title">Deposit Approved</div>
                <p class="text">Hello ${displayName}, your deposit has been approved and credited to your account balance.</p>
                <div class="card">
                  <div class="row"><div class="k">Amount</div><div class="v">${amountText}</div></div>
                  <div class="row"><div class="k">Asset</div><div class="v">${asset}${network}</div></div>
                  <div class="row"><div class="k">Transaction</div><div class="v">${txText}</div></div>
                  <div class="row"><div class="k">Reference</div><div class="v">${params.depositId}</div></div>
                  <div class="row"><div class="k">Approved at</div><div class="v">${approvedAtText}</div></div>
                </div>
                <div class="badge">Approved</div>
                <p class="muted">If you did not make this deposit or you notice anything unusual, contact support@voltsq.com immediately.</p>
              </div>
              <div class="footer">
                <div>&copy; 2026 Voltsq Investments. All rights reserved.</div>
                <div>This is an automated message. Please do not reply directly to this email.</div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Email Send Error:", err);
    return { success: false, error: err };
  }
}

export async function sendAdminDepositRequestEmail(params: {
  toEmails: string[];
  investorEmail: string;
  investorName?: string;
  depositId: string;
  amount: number;
  asset?: string;
  network?: string;
  txHash?: string;
  createdAtISO?: string;
}) {
  try {
    const resendClient = getResend();

    if (!resendClient) {
      console.warn("⚠️ [Email] Resend API key missing. Skipping email.");
      return { success: false, error: "API key missing" };
    }

    const recipients = params.toEmails.filter(Boolean);
    if (recipients.length === 0) {
      return { success: false, error: "No recipients" };
    }

    const investorName = params.investorName?.trim() || params.investorEmail.split("@")[0] || "Investor";
    const asset = params.asset || "USDT";
    const network = params.network ? ` (${params.network})` : "";
    const createdAt = params.createdAtISO ? new Date(params.createdAtISO) : new Date();
    const createdAtText = createdAt.toLocaleString();
    const amountText = `$${Number(params.amount).toFixed(2)}`;
    const txText = params.txHash ? `${params.txHash.slice(0, 10)}...${params.txHash.slice(-6)}` : "N/A";

    const { data, error } = await resendClient.emails.send({
      from: "Voltsq Investments <onboarding@resend.dev>",
      to: recipients,
      subject: "New deposit request submitted",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Deposit Request</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #0f172a; margin: 0; padding: 0; background-color: #f4f7f9; }
              .container { max-width: 680px; margin: 20px auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.06); }
              .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 22px; text-align: center; color: #ffffff; }
              .brand { margin: 0; font-size: 20px; font-weight: 900; letter-spacing: -0.3px; }
              .subtitle { margin: 8px 0 0; font-size: 13px; opacity: 0.9; }
              .content { padding: 28px 22px; }
              .title { margin: 0 0 8px; font-size: 20px; font-weight: 900; }
              .text { margin: 0 0 16px; color: #334155; }
              .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; background: #f8fafc; }
              .row { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
              .row:last-child { border-bottom: none; }
              .k { width: 42%; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
              .v { width: 58%; font-weight: 700; color: #0f172a; }
              .badge { display: inline-block; margin-top: 14px; padding: 8px 12px; border-radius: 999px; background: rgba(234, 179, 8, 0.12); color: #a16207; font-weight: 800; font-size: 12px; }
              .footer { background: #f8fafc; padding: 16px 22px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="brand">Voltsq Admin Alert</div>
                <div class="subtitle">New Deposit Request</div>
              </div>
              <div class="content">
                <div class="title">A user submitted a deposit request</div>
                <p class="text">Review and approve the deposit in your Admin Portal.</p>
                <div class="card">
                  <div class="row"><div class="k">Investor</div><div class="v">${investorName}</div></div>
                  <div class="row"><div class="k">Email</div><div class="v">${params.investorEmail}</div></div>
                  <div class="row"><div class="k">Amount</div><div class="v">${amountText}</div></div>
                  <div class="row"><div class="k">Asset</div><div class="v">${asset}${network}</div></div>
                  <div class="row"><div class="k">Transaction</div><div class="v">${txText}</div></div>
                  <div class="row"><div class="k">Reference</div><div class="v">${params.depositId}</div></div>
                  <div class="row"><div class="k">Submitted</div><div class="v">${createdAtText}</div></div>
                </div>
                <div class="badge">Pending Review</div>
              </div>
              <div class="footer">
                <div>&copy; 2026 Voltsq Investments. All rights reserved.</div>
                <div>This is an automated alert for administrators.</div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Email Send Error:", err);
    return { success: false, error: err };
  }
}

export async function sendAdminWithdrawalRequestEmail(params: {
  toEmails: string[];
  investorEmail: string;
  investorName?: string;
  withdrawalId: string;
  amount: number;
  asset?: string;
  address?: string;
  createdAtISO?: string;
}) {
  try {
    const resendClient = getResend();

    if (!resendClient) {
      console.warn("⚠️ [Email] Resend API key missing. Skipping email.");
      return { success: false, error: "API key missing" };
    }

    const recipients = params.toEmails.filter(Boolean);
    if (recipients.length === 0) {
      return { success: false, error: "No recipients" };
    }

    const investorName = params.investorName?.trim() || params.investorEmail.split("@")[0] || "Investor";
    const asset = params.asset || "USDT";
    const createdAt = params.createdAtISO ? new Date(params.createdAtISO) : new Date();
    const createdAtText = createdAt.toLocaleString();
    const amountText = `$${Number(params.amount).toFixed(2)}`;
    const addressText = params.address ? maskAddress(params.address) : "N/A";

    const { data, error } = await resendClient.emails.send({
      from: "Voltsq Investments <onboarding@resend.dev>",
      to: recipients,
      subject: "New withdrawal request submitted",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Withdrawal Request</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #0f172a; margin: 0; padding: 0; background-color: #f4f7f9; }
              .container { max-width: 680px; margin: 20px auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.06); }
              .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 22px; text-align: center; color: #ffffff; }
              .brand { margin: 0; font-size: 20px; font-weight: 900; letter-spacing: -0.3px; }
              .subtitle { margin: 8px 0 0; font-size: 13px; opacity: 0.9; }
              .content { padding: 28px 22px; }
              .title { margin: 0 0 8px; font-size: 20px; font-weight: 900; }
              .text { margin: 0 0 16px; color: #334155; }
              .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; background: #f8fafc; }
              .row { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
              .row:last-child { border-bottom: none; }
              .k { width: 42%; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
              .v { width: 58%; font-weight: 700; color: #0f172a; }
              .badge { display: inline-block; margin-top: 14px; padding: 8px 12px; border-radius: 999px; background: rgba(234, 179, 8, 0.12); color: #a16207; font-weight: 800; font-size: 12px; }
              .footer { background: #f8fafc; padding: 16px 22px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="brand">Voltsq Admin Alert</div>
                <div class="subtitle">New Withdrawal Request</div>
              </div>
              <div class="content">
                <div class="title">A user requested a withdrawal</div>
                <p class="text">Review and approve the withdrawal in your Admin Portal.</p>
                <div class="card">
                  <div class="row"><div class="k">Investor</div><div class="v">${investorName}</div></div>
                  <div class="row"><div class="k">Email</div><div class="v">${params.investorEmail}</div></div>
                  <div class="row"><div class="k">Amount</div><div class="v">${amountText}</div></div>
                  <div class="row"><div class="k">Asset</div><div class="v">${asset}</div></div>
                  <div class="row"><div class="k">Destination</div><div class="v">${addressText}</div></div>
                  <div class="row"><div class="k">Reference</div><div class="v">${params.withdrawalId}</div></div>
                  <div class="row"><div class="k">Submitted</div><div class="v">${createdAtText}</div></div>
                </div>
                <div class="badge">Pending Review</div>
              </div>
              <div class="footer">
                <div>&copy; 2026 Voltsq Investments. All rights reserved.</div>
                <div>This is an automated alert for administrators.</div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Email Send Error:", err);
    return { success: false, error: err };
  }
}
