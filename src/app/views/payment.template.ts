export const generatePaymentHtml = (
  status: "success" | "failed" | "cancelled",
  transactionId?: string
) => {
  let title = "", message = "", color = "", emoji = "", shadow = "";

  switch (status) {
    case "success":
      emoji = "✅";
      title = "Payment Successful";
      message = `Your transaction${transactionId ? ` (ID: ${transactionId})` : ""} was completed successfully.`;
      color = "#22c55e"; // green-500
      shadow = "0 0 20px rgba(34, 197, 94, 0.5)";
      break;
    case "failed":
      emoji = "❌";
      title = "Payment Failed";
      message = "Unfortunately, your payment could not be processed.";
      color = "#ef4444"; // red-500
      shadow = "0 0 20px rgba(239, 68, 68, 0.5)";
      break;
    case "cancelled":
      emoji = "⚠️";
      title = "Payment Cancelled";
      message = "Your payment was cancelled. Please try again if this was unintentional.";
      color = "#f97316"; // orange-500
      shadow = "0 0 20px rgba(249, 115, 22, 0.5)";
      break;
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      <style>
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #f9fafb, #e5e7eb);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }

        .container {
          text-align: center;
          padding: 40px;
          border-top: 8px solid ${color};
          border-radius: 16px;
          background-color: #fff;
          box-shadow: ${shadow};
          max-width: 480px;
          width: 90%;
          animation: fadeIn 1s ease-out, bounceIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounceIn {
          0%   { transform: scale(0.8); }
          60%  { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .emoji {
          font-size: 60px;
          margin-bottom: 16px;
        }

        h1 {
          color: ${color};
          font-size: 26px;
          margin-bottom: 12px;
        }

        p {
          font-size: 18px;
          color: #333;
          margin-bottom: 28px;
        }

        a.button {
          display: inline-block;
          padding: 12px 24px;
          background-color: ${color};
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }

        a.button:hover {
          background-color: #111827;
        }

        a.button::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200%;
          height: 200%;
          background: rgba(255, 255, 255, 0.15);
          transform: translate(-50%, -50%) scale(0);
          border-radius: 50%;
          animation: ripple 0.6s linear;
        }

        a.button:active::after {
          animation: ripple 0.6s linear;
        }

        @keyframes ripple {
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="emoji">${emoji}</div>
        <h1>${title}</h1>
        <p>${message}</p>
        <a class="button" href="https://royal-place.vercel.app">⬅️ Back to Home</a>
      </div>
    </body>
    </html>
  `;
};
