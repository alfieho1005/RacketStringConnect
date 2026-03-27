import { cookies } from "next/headers";

const SESSION_COOKIE = "rsc_admin";
const MAX_AGE_MS = 8 * 60 * 60 * 1000; // 8 hours

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return false;

    const secret = process.env.ADMIN_SESSION_SECRET ?? "rsc-admin-s3cr3t-2026";
    const decoded = Buffer.from(token, "base64").toString("utf8");
    const [, tsStr, tokenSecret] = decoded.split(":");

    if (tokenSecret !== secret) return false;
    if (Date.now() - parseInt(tsStr, 10) > MAX_AGE_MS) return false;

    return true;
  } catch {
    return false;
  }
}
