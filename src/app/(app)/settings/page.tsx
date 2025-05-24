import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SettingsIcon, FileText, Lock, Users, Bell, Palette } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="h-7 w-7 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Account</CardTitle>
          <CardDescription>Manage your account details and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="TeenUser123" disabled />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="user@example.com" disabled />
          </div>
           <div className="space-y-1">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" defaultValue="15" disabled />
          </div>
          <Button variant="outline" disabled>Update Profile (Coming Soon)</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-primary" /> Notifications</CardTitle>
          <CardDescription>Control how you receive reminders and alerts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between space-x-2 p-3 rounded-md border">
            <Label htmlFor="medication-reminders" className="flex flex-col space-y-1 cursor-pointer">
              <span>Medication Reminders</span>
              <span className="font-normal leading-snug text-muted-foreground text-xs">
                Get notified when it&apos;s time for your medication.
              </span>
            </Label>
            <Switch id="medication-reminders" defaultChecked aria-label="Medication Reminders Toggle"/>
          </div>
          <div className="flex items-center justify-between space-x-2 p-3 rounded-md border">
            <Label htmlFor="checkin-reminders" className="flex flex-col space-y-1 cursor-pointer">
              <span>Daily Check-in Reminders</span>
              <span className="font-normal leading-snug text-muted-foreground text-xs">
                Gentle prompts to log your symptoms.
              </span>
            </Label>
            <Switch id="checkin-reminders" defaultChecked aria-label="Daily Check-in Reminders Toggle"/>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5 text-primary" /> Privacy & Security</CardTitle>
          <CardDescription>Enhance your app security and manage data sharing.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start gap-2" disabled>
             Change Password (Coming Soon)
          </Button>
          <div className="flex items-center justify-between space-x-2 p-3 rounded-md border">
            <Label htmlFor="face-id" className="flex flex-col space-y-1 cursor-pointer">
              <span>Enable Passcode/Face ID</span>
               <span className="font-normal leading-snug text-muted-foreground text-xs">
                Secure your app with device authentication.
              </span>
            </Label>
            <Switch id="face-id" aria-label="Passcode or Face ID Toggle" />
          </div>
           <Separator />
           <div className="flex items-center justify-between space-x-2 p-3 rounded-md border">
            <Label htmlFor="parental-access" className="flex flex-col space-y-1 cursor-pointer">
              <span>Parental Access (Optional)</span>
              <span className="font-normal leading-snug text-muted-foreground text-xs">
                Allow a parent or guardian to view your progress (requires your consent).
              </span>
            </Label>
            <Switch id="parental-access" aria-label="Parental Access Toggle" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Data & Export</CardTitle>
          <CardDescription>Manage your application data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full justify-start gap-2" disabled>
            Export Reports for Physician (Coming Soon)
          </Button>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-primary" /> Appearance</CardTitle>
          <CardDescription>Customize the look and feel of the app.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
            <Label htmlFor="theme-mode" className="cursor-default">Theme Mode</Label>
            <ThemeToggle />
        </CardContent>
      </Card>
    </div>
  );
}
