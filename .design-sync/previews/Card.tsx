import {
  Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter,
  Button, Badge,
} from "aurora-ui";

export const Basic = () => (
  <Card style={{ width: 340 }}>
    <CardHeader>
      <CardTitle>Deployment</CardTitle>
      <CardDescription>Ship your project to production in one click.</CardDescription>
    </CardHeader>
    <CardContent>
      <p style={{ fontSize: 14, opacity: 0.85, margin: 0 }}>
        Connected to <strong>main</strong>. Last deploy 3 minutes ago.
      </p>
    </CardContent>
    <CardFooter style={{ display: "flex", gap: 8 }}>
      <Button size="sm">Deploy</Button>
      <Button size="sm" variant="outline">Preview</Button>
    </CardFooter>
  </Card>
);

export const PricingWithAction = () => (
  <Card style={{ width: 340 }}>
    <CardHeader>
      <CardTitle>Team plan</CardTitle>
      <CardDescription>Billed annually.</CardDescription>
      <CardAction><Badge>Popular</Badge></CardAction>
    </CardHeader>
    <CardContent>
      <div style={{ fontSize: 30, fontWeight: 700 }}>
        $20<span style={{ fontSize: 14, fontWeight: 400, opacity: 0.7 }}> /mo</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button style={{ width: "100%" }}>Upgrade</Button>
    </CardFooter>
  </Card>
);
