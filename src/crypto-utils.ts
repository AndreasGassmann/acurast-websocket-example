export const generateKey = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    true,
    ["sign"]
  );

  const [privateKeyRaw, publicKeyRaw] = await Promise.all([
    window.crypto.subtle
      .exportKey("jwk", keyPair.privateKey)
      .then((jwk) => new Uint8Array(Buffer.from(jwk.d!, "base64"))),
    window.crypto.subtle
      .exportKey("raw", keyPair.publicKey)
      .then((arrayBuffer) => new Uint8Array(arrayBuffer)),
  ]);

  return { privateKeyRaw, publicKeyRaw };
};

export const getSenderId = async (publicKey: string) => {
  const publicKeyRaw = new Uint8Array(
    Buffer.from(publicKey.substring(2), "hex")
  );
  const publicKeyHash = await window.crypto.subtle.digest(
    "SHA-256",
    publicKeyRaw
  );
  const senderId = Buffer.from(publicKeyHash.slice(0, 16)).toString("hex");
  return senderId;
};
