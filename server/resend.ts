import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

export async function getUncachableResendClient() {
  const credentials = await getCredentials();
  return {
    client: new Resend(credentials.apiKey),
    fromEmail: connectionSettings.settings.from_email
  };
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  state?: string;
  message?: string;
  requestType?: string;
}

async function getNotificationRecipients(): Promise<string[]> {
  try {
    const { storage } = await import("./storage");
    const dbEmails = await storage.getNotificationEmails();
    if (dbEmails.length > 0) {
      return dbEmails.map(e => e.email);
    }
  } catch (err) {
    console.error("Error fetching notification emails from DB:", err);
  }
  const envRecipients = process.env.NOTIFICATION_EMAIL;
  if (envRecipients) {
    return envRecipients.split(',').map(e => e.trim()).filter(Boolean);
  }
  return ['awachspress@mdcharts.net'];
}

export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    const { client, fromEmail } = await getUncachableResendClient();
    const recipients = await getNotificationRecipients();
    console.log("[Email] Sending contact notification to:", recipients, "from:", fromEmail);
    
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Request Type:</strong> ${data.requestType || 'General Inquiry'}</p>
      <hr/>
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Practice/Company:</strong> ${data.company || 'Not provided'}</p>
      <p><strong>State:</strong> ${data.state || 'Not provided'}</p>
      <hr/>
      <h3>Message</h3>
      <p>${data.message || 'No message provided'}</p>
      <hr/>
      <p style="color: #666; font-size: 12px;">This email was sent from the MDcharts EHR website contact form.</p>
    `;

    let senderEmail = fromEmail || 'MDcharts EHR <noreply@mdchartsehr.com>';
    
    let result = await client.emails.send({
      from: senderEmail,
      to: recipients,
      subject: `MDcharts Contact: ${data.requestType || 'General Inquiry'} from ${data.firstName} ${data.lastName}`,
      html: htmlContent,
      replyTo: data.email,
    });

    if (result.error && result.error.message?.includes('not verified')) {
      console.log("[Email] Domain not verified, falling back to onboarding@resend.dev");
      result = await client.emails.send({
        from: 'MDcharts EHR <onboarding@resend.dev>',
        to: recipients,
        subject: `MDcharts Contact: ${data.requestType || 'General Inquiry'} from ${data.firstName} ${data.lastName}`,
        html: htmlContent,
        replyTo: data.email,
      });
    }

    console.log("[Email] Resend response:", JSON.stringify(result));

    if (result.error) {
      console.error('[Email] Resend error:', result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('[Email] Sending error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to send email' };
  }
}

const whitePaperTitles: Record<string, string> = {
  "ehr-selection": "The Modern Medical Practice Guide to EHR Selection",
  "rcm-optimization": "Optimizing Revenue Cycle Management in Healthcare",
  "patient-engagement": "Patient Engagement in the Digital Age",
  "telehealth": "Telehealth Implementation Best Practices",
  "hipaa-compliance": "HIPAA Compliance in the Cloud Era",
  "specialty-ehr": "Specialty EHR: Why One Size Doesn't Fit All"
};

export interface WhitePaperDownloadData {
  whitePaperId: string;
  firstName: string;
  lastName: string;
  email: string;
  practiceAddress: string;
  downloadReason: string;
}

export async function sendWhitePaperDownloadEmail(data: WhitePaperDownloadData): Promise<{ success: boolean; error?: string }> {
  try {
    const { client, fromEmail } = await getUncachableResendClient();
    const recipients = await getNotificationRecipients();
    console.log("[Email] Sending white paper notification to:", recipients, "from:", fromEmail);
    
    const whitePaperTitle = whitePaperTitles[data.whitePaperId] || data.whitePaperId;
    
    const htmlContent = `
      <h2>New White Paper Download</h2>
      <p><strong>White Paper:</strong> ${whitePaperTitle}</p>
      <hr/>
      <h3>Lead Information</h3>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Practice Address:</strong> ${data.practiceAddress}</p>
      <hr/>
      <h3>Reason for Interest</h3>
      <p>${data.downloadReason}</p>
      <hr/>
      <p style="color: #666; font-size: 12px;">This lead was captured from the MDcharts EHR white paper download form.</p>
      <p style="color: #666; font-size: 12px;">You can view all leads at: <a href="https://mdchartsehr.com/admin/leads">Lead Management Dashboard</a></p>
    `;

    let senderEmail = fromEmail || 'MDcharts EHR <noreply@mdchartsehr.com>';

    let result = await client.emails.send({
      from: senderEmail,
      to: recipients,
      subject: `New Lead: ${data.firstName} ${data.lastName} downloaded "${whitePaperTitle}"`,
      html: htmlContent,
      replyTo: data.email,
    });

    if (result.error && result.error.message?.includes('not verified')) {
      console.log("[Email] Domain not verified, falling back to onboarding@resend.dev");
      result = await client.emails.send({
        from: 'MDcharts EHR <onboarding@resend.dev>',
        to: recipients,
        subject: `New Lead: ${data.firstName} ${data.lastName} downloaded "${whitePaperTitle}"`,
        html: htmlContent,
        replyTo: data.email,
      });
    }

    console.log("[Email] Resend response:", JSON.stringify(result));

    if (result.error) {
      console.error('[Email] Resend error:', result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('[Email] Sending error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to send email' };
  }
}
