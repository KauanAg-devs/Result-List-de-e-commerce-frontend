'use client'

import { useEffect, useState } from "react";
import {payload} from "pix-payload";
import {QRCodeSVG}  from "qrcode.react";
import { Copy } from "lucide-react";

type PixPaymentProps = {
  total: number;
  onPixConfirm?: () => void;
};

export default function PixPayment({ total, onPixConfirm }: PixPaymentProps) {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(600);

  const qrCode = payload({
    version: '01',
    key: 'chave pix do vendedor',
    name: 'nome do vendedor',
    city: 'cidade do vendedor em maiusculo',
    value: total,
    transactionId: "transação (pode ser aleatório)",
    message: `Pagamento R$ ${total.toFixed(2)}`,
  });
  
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-6 p-6 bg-white border rounded-lg text-center space-y-4">
      <h3 className="text-lg font-semibold text-zinc-700">Pagamento via PIX</h3>
      <QRCodeSVG className="mx-auto" value={qrCode} size={200} />

      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(qrCode);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="flex items-center justify-center w-full bg-green-600 text-white py-2 rounded-lg"
      >
        <Copy className="w-4 h-4 mr-2" />
        {copied ? "Código copiado!" : "Copiar código PIX"}
      </button>

      <p className="text-sm text-gray-500">
        Tempo restante: {Math.floor(countdown / 60)}:
        {(countdown % 60).toString().padStart(2, "0")}
      </p>
      <p className="text-lg font-bold">Total: R$ {total.toFixed(2)}</p>

      <button
        type="button"
        onClick={onPixConfirm}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Já paguei
      </button>
    </div>
  );
}
