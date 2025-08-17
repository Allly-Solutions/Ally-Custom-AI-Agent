import { useState } from 'react';
import { Save, Key, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    min_budget_threshold: 1000,
    max_acceptable_timeline: '6 months',
    api_keys: {
      langchain: '',
      azure: '',
      crm: ''
    },
    email_integration: {
      enabled: false,
      provider: 'gmail'
    },
    calendar_integration: {
      enabled: false,
      provider: 'google'
    }
  });

  const handleSave = () => {
    // Here you would typically save to your backend/database
    toast({
      title: "Settings saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApiKeyChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      api_keys: {
        ...prev.api_keys,
        [key]: value
      }
    }));
  };

  const handleIntegrationChange = (integration: 'email_integration' | 'calendar_integration', field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [integration]: {
        ...prev[integration],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure your AI agent's lead qualification criteria and integrations
        </p>
      </div>

      <div className="grid gap-6">
        {/* Lead Qualification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Lead Qualification Criteria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="min-budget">Minimum Budget Threshold ($)</Label>
                <Input
                  id="min-budget"
                  type="number"
                  value={settings.min_budget_threshold}
                  onChange={(e) => handleInputChange('min_budget_threshold', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-timeline">Maximum Acceptable Timeline</Label>
                <Select 
                  value={settings.max_acceptable_timeline} 
                  onValueChange={(value) => handleInputChange('max_acceptable_timeline', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 week">1 week</SelectItem>
                    <SelectItem value="2 weeks">2 weeks</SelectItem>
                    <SelectItem value="1 month">1 month</SelectItem>
                    <SelectItem value="3 months">3 months</SelectItem>
                    <SelectItem value="6 months">6 months</SelectItem>
                    <SelectItem value="1 year">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Keys Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>API Keys Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="langchain-key">LangChain API Key</Label>
              <Input
                id="langchain-key"
                type="password"
                placeholder="Enter your LangChain API key"
                value={settings.api_keys.langchain}
                onChange={(e) => handleApiKeyChange('langchain', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="azure-key">Azure API Key</Label>
              <Input
                id="azure-key"
                type="password"
                placeholder="Enter your Azure API key"
                value={settings.api_keys.azure}
                onChange={(e) => handleApiKeyChange('azure', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="crm-key">CRM API Key</Label>
              <Input
                id="crm-key"
                type="password"
                placeholder="Enter your CRM API key"
                value={settings.api_keys.crm}
                onChange={(e) => handleApiKeyChange('crm', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Email Integration</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically send follow-up emails to qualified leads
                </p>
              </div>
              <Switch
                checked={settings.email_integration.enabled}
                onCheckedChange={(checked) => handleIntegrationChange('email_integration', 'enabled', checked)}
              />
            </div>
            
            {settings.email_integration.enabled && (
              <>
                <Separator />
                <div className="space-y-2">
                  <Label>Email Provider</Label>
                  <Select 
                    value={settings.email_integration.provider}
                    onValueChange={(value) => handleIntegrationChange('email_integration', 'provider', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmail">Gmail</SelectItem>
                      <SelectItem value="outlook">Outlook</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Calendar Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Calendar Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Calendar Integration</Label>
                <p className="text-sm text-muted-foreground">
                  Allow leads to schedule meetings directly
                </p>
              </div>
              <Switch
                checked={settings.calendar_integration.enabled}
                onCheckedChange={(checked) => handleIntegrationChange('calendar_integration', 'enabled', checked)}
              />
            </div>
            
            {settings.calendar_integration.enabled && (
              <>
                <Separator />
                <div className="space-y-2">
                  <Label>Calendar Provider</Label>
                  <Select 
                    value={settings.calendar_integration.provider}
                    onValueChange={(value) => handleIntegrationChange('calendar_integration', 'provider', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Calendar</SelectItem>
                      <SelectItem value="outlook">Outlook Calendar</SelectItem>
                      <SelectItem value="calendly">Calendly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}