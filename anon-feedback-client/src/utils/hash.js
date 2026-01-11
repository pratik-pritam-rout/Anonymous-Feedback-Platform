// Uses browser crypto API 
export async function generateAnonId(orgSalt) {
  const fingerprint =
    navigator.userAgent +
    navigator.language +
    screen.width +
    screen.height;

  const data = new TextEncoder().encode(fingerprint + orgSalt);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}
