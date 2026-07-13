import { Tabs, TabsList, TabsTrigger, TabsContent } from "aurora-ui";

export const AccountSettings = () => (
  <Tabs defaultValue="account" style={{ width: 320 }}>
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <p style={{ fontSize: 13, opacity: 0.85, margin: "8px 0 0" }}>
        Update your name and email. Changes to your profile are visible to your team immediately.
      </p>
    </TabsContent>
    <TabsContent value="password">
      <p style={{ fontSize: 13, opacity: 0.85, margin: "8px 0 0" }}>
        Choose a strong password. You will be signed out of other sessions after saving.
      </p>
    </TabsContent>
  </Tabs>
);

export const Project = () => (
  <Tabs defaultValue="overview" style={{ width: 320 }}>
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="activity">Activity</TabsTrigger>
      <TabsTrigger value="members">Members</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">
      <p style={{ fontSize: 13, opacity: 0.85, margin: "8px 0 0" }}>
        Production is healthy. Last deploy succeeded 3 minutes ago from the main branch.
      </p>
    </TabsContent>
    <TabsContent value="activity">
      <p style={{ fontSize: 13, opacity: 0.85, margin: "8px 0 0" }}>
        14 events in the last hour, including 2 deployments and 3 config changes.
      </p>
    </TabsContent>
    <TabsContent value="members">
      <p style={{ fontSize: 13, opacity: 0.85, margin: "8px 0 0" }}>
        6 collaborators have access. Invite teammates by email to grant deploy permissions.
      </p>
    </TabsContent>
  </Tabs>
);
