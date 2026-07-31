import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, company, subject } = body;

    const emailSubject = subject || `Quick Contact: ${name} - ${email}`;
    const mailtoLink = `mailto:support@zentryo.in?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCompany: ${company || 'N/A'}\n\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`
    )}`;

    return NextResponse.json({ success: true, mailto: mailtoLink });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
