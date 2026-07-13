import { Alert, AlertTitle, AlertDescription } from "aurora-ui";

export const TrialEnding = () => (
  <Alert style={{ width: 360 }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
    <AlertTitle>Heads up! Your trial ends in 3 days.</AlertTitle>
    <AlertDescription>
      Add a payment method before Friday to keep your projects deployed without interruption.
    </AlertDescription>
  </Alert>
);

export const PaymentFailed = () => (
  <Alert variant="destructive" style={{ width: 360 }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6" />
      <path d="M9 9l6 6" />
    </svg>
    <AlertTitle>Payment failed</AlertTitle>
    <AlertDescription>
      We couldn't charge the card ending in 4242. Update your card to avoid a service interruption.
    </AlertDescription>
  </Alert>
);
