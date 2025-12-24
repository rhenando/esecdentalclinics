import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  message: string;
};

function validate(payload: ContactPayload) {
  if (!payload.name || payload.name.length < 2) return "Name is required.";
  if (!payload.phone || payload.phone.length < 7) return "Phone is required.";
  if (!payload.message || payload.message.length < 5) return "Message is required.";
  return null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>;

    const payload: ContactPayload = {
      name: String(body.name || "").trim(),
      phone: String(body.phone || "").trim(),
      email: body.email ? String(body.email).trim() : undefined,
      message: String(body.message || "").trim(),
    };

    const err = validate(payload);
    if (err) {
      return NextResponse.json({ ok: false, error: err }, { status: 400 });
    }

    // Starter behavior: logs to server console
    // Later: integrate Resend/Nodemailer/SMTP here.
    console.log("[CONTACT_FORM]", payload);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
