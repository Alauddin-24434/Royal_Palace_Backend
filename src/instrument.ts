import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://497acb499844883233e0bcda4a5aa2be@o4511143223033856.ingest.de.sentry.io/4511143226114128",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});