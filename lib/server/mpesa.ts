// M-Pesa Daraja STK Push (deposit collection) helper.
// Requires MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE,
// MPESA_PASSKEY and MPESA_CALLBACK_URL. Without them, returns a simulated
// "pending" response so the booking flow can still be demonstrated end to end.
interface StkPushParams {
  phone: string;
  amountKES: number;
  accountReference: string;
  description: string;
}

const DARAJA_BASE = process.env.MPESA_ENV === "production"
  ? "https://api.safaricom.co.ke"
  : "https://sandbox.safaricom.co.ke";

async function getAccessToken(): Promise<string | null> {
  const key = process.env.MPESA_CONSUMER_KEY;
  const secret = process.env.MPESA_CONSUMER_SECRET;
  if (!key || !secret) return null;

  const credentials = Buffer.from(`${key}:${secret}`).toString("base64");
  const res = await fetch(`${DARAJA_BASE}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token as string;
}

export async function initiateMpesaDeposit(params: StkPushParams) {
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;

  if (!shortcode || !passkey || !callbackUrl) {
    console.log("[mpesa:dev-fallback] simulated STK push", params);
    return {
      simulated: true,
      status: "pending",
      message: "M-Pesa is not configured in this environment — deposit marked pending for demo purposes.",
    };
  }

  const token = await getAccessToken();
  if (!token) {
    return { simulated: true, status: "error", message: "Could not authenticate with Daraja." };
  }

  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

  const res = await fetch(`${DARAJA_BASE}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: params.amountKES,
      PartyA: params.phone,
      PartyB: shortcode,
      PhoneNumber: params.phone,
      CallBackURL: callbackUrl,
      AccountReference: params.accountReference,
      TransactionDesc: params.description,
    }),
  });

  const data = await res.json();
  return { simulated: false, status: res.ok ? "initiated" : "error", data };
}
