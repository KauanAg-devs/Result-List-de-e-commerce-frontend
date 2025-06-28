export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  try {
    const uint8Array = new Uint8Array(buffer);
    const chunks: string[] = [];
    const chunkSize = 8192;

    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, i + chunkSize);
      chunks.push(String.fromCharCode(...chunk));
    }

    return btoa(chunks.join(""));
  } catch (error) {
    console.error("Failed to convert ArrayBuffer to base64:", error);
    return "";
  }
};