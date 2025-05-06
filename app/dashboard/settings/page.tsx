'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 mb-6">
         <h1 className="font-semibold text-2xl md:text-3xl">Settings</h1>
         <p className="text-muted-foreground">
           Manage your profile, notifications, and application preferences.
         </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
         <div className="flex flex-col gap-6">
           {/* Profile Settings Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Your first name" defaultValue="Alex" />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="lastName">Last Name</Label>
                     <Input id="lastName" placeholder="Your last name" defaultValue="Johnson" />
                  </div>
                </div>
                <div className="space-y-2">
                 <Label htmlFor="email">Email</Label>
                 <Input id="email" type="email" placeholder="Your email address" defaultValue="alex.johnson@example.com" disabled />
                 <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                </div>
                {/* Add other profile fields if needed (e.g., phone, address) */}
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Profile</Button>
              </CardFooter>
            </Card>

            {/* Notification Settings Card */}
            <Card>
              <CardHeader>
                 <CardTitle>Notifications</CardTitle>
                 <CardDescription>Manage how you receive application updates.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                   <Label htmlFor="interview-reminders" className="flex flex-col space-y-1">
                     <span>Interview Reminders</span>
                     <span className="font-normal leading-snug text-muted-foreground">
                       Receive email reminders for upcoming interviews.
                     </span>
                   </Label>
                   <Switch id="interview-reminders" defaultChecked />
                 </div>
                 <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                   <Label htmlFor="candidate-updates" className="flex flex-col space-y-1">
                     <span>Application Status Updates</span>
                     <span className="font-normal leading-snug text-muted-foreground">
                       Get notified when your application status changes.
                     </span>
                   </Label>
                   <Switch id="candidate-updates" defaultChecked/>
                 </div>
               </CardContent>
               <CardFooter>
                 <Button className="ml-auto">Save Notifications</Button>
               </CardFooter>
             </Card>
         </div>

         {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Appearance Card */} 
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="theme">Theme</Label>
                   <Select defaultValue="system">
                     <SelectTrigger id="theme">
                       <SelectValue placeholder="Select theme" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="light">Light</SelectItem>
                       <SelectItem value="dark">Dark</SelectItem>
                       <SelectItem value="system">System</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
               </CardContent>
               {/* No footer needed unless adding a save button specific to appearance */}
             </Card>
             {/* Add other relevant candidate settings if needed (e.g., Password Change) */}
           </div>
       </div>
     </div>
  );
} 