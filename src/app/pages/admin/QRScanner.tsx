import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import StatsCard from '../../components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { QrCode, CheckCircle2, XCircle, Users, Search, Store } from 'lucide-react';
import { mockRegistrants, mockEvents, mockSubEvents } from '../../lib/mockData';
import { toast } from 'sonner';

export default function QRScanner() {
  const [qrInput, setQrInput] = useState('');
  const [selectedBooth, setSelectedBooth] = useState<string>('');
  const [scanMode, setScanMode] = useState<'check-in' | 'booth-visit'>('check-in');
  const [scannedRegistrant, setScannedRegistrant] = useState<typeof mockRegistrants[0] | null>(null);
  const [recentScans, setRecentScans] = useState<Array<{
    id: string;
    name: string;
    type: 'check-in' | 'booth-visit';
    time: string;
    booth?: string;
  }>>([]);

  const totalScans = recentScans.length;
  const checkIns = recentScans.filter(s => s.type === 'check-in').length;
  const boothVisits = recentScans.filter(s => s.type === 'booth-visit').length;
  const uniqueVisitors = new Set(recentScans.map(s => s.id)).size;

  const handleScan = () => {
    if (!qrInput.trim()) {
      toast.error('Please enter a QR code');
      return;
    }

    // Find registrant by QR code
    const registrant = mockRegistrants.find(r => r.qrCode === qrInput.trim());
    
    if (!registrant) {
      toast.error('Invalid QR code. Registrant not found.');
      setScannedRegistrant(null);
      return;
    }

    if (scanMode === 'check-in') {
      // Check-in mode
      if (registrant.checkedIn) {
        toast.info(`${registrant.name} is already checked in.`);
      } else {
        toast.success(`Successfully checked in ${registrant.name}!`);
        // In a real app, this would update the backend
      }
      
      setRecentScans(prev => [{
        id: registrant.id,
        name: registrant.name,
        type: 'check-in',
        time: new Date().toISOString()
      }, ...prev.slice(0, 9)]);
      
    } else {
      // Booth visit mode
      if (!selectedBooth) {
        toast.error('Please select a booth first');
        return;
      }
      
      const booth = mockSubEvents.find(se => se.id === selectedBooth);
      toast.success(`${registrant.name} visited ${booth?.title}!`);
      
      setRecentScans(prev => [{
        id: registrant.id,
        name: registrant.name,
        type: 'booth-visit',
        time: new Date().toISOString(),
        booth: booth?.title
      }, ...prev.slice(0, 9)]);
    }

    setScannedRegistrant(registrant);
    setQrInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">QR Code Scanner</h1>
            <p className="text-gray-600">Scan attendee QR codes for check-in and booth tracking</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Scans"
            value={totalScans}
            icon={QrCode}
          />
          <StatsCard
            title="Check-Ins"
            value={checkIns}
            icon={CheckCircle2}
          />
          <StatsCard
            title="Booth Visits"
            value={boothVisits}
            icon={Store}
          />
          <StatsCard
            title="Unique Visitors"
            value={uniqueVisitors}
            icon={Users}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Scanner Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code Scanner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mode Selection */}
              <div>
                <Label>Scan Mode</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Button
                    variant={scanMode === 'check-in' ? 'default' : 'outline'}
                    onClick={() => setScanMode('check-in')}
                    className="w-full"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Check-In
                  </Button>
                  <Button
                    variant={scanMode === 'booth-visit' ? 'default' : 'outline'}
                    onClick={() => setScanMode('booth-visit')}
                    className="w-full"
                  >
                    <Store className="h-4 w-4 mr-2" />
                    Booth Visit
                  </Button>
                </div>
              </div>

              {/* Booth Selection (only for booth-visit mode) */}
              {scanMode === 'booth-visit' && (
                <div>
                  <Label htmlFor="booth">Select Booth *</Label>
                  <Select value={selectedBooth} onValueChange={setSelectedBooth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a booth" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSubEvents.map(booth => (
                        <SelectItem key={booth.id} value={booth.id}>
                          {booth.title} - {booth.company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* QR Input */}
              <div>
                <Label htmlFor="qrInput">QR Code</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="qrInput"
                    placeholder="Scan or enter QR code..."
                    value={qrInput}
                    onChange={(e) => setQrInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                    className="font-mono"
                  />
                  <Button onClick={handleScan}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Try: QR-1-001, QR-1-002, or QR-1-003
                </p>
              </div>

              {/* Scanned Result */}
              {scannedRegistrant && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1">{scannedRegistrant.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{scannedRegistrant.position} at {scannedRegistrant.company}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Email:</span>
                          <span>{scannedRegistrant.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Event:</span>
                          <Badge variant="outline">
                            {mockEvents.find(e => e.id === scannedRegistrant.eventId)?.title}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Booths Visited:</span>
                          <Badge className="bg-blue-600">
                            {scannedRegistrant.boothsVisited.length}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Demo QR Codes */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="text-sm mb-2">Demo QR Codes:</h5>
                <div className="flex flex-wrap gap-2">
                  {mockRegistrants.map(reg => (
                    <Button
                      key={reg.id}
                      size="sm"
                      variant="outline"
                      onClick={() => setQrInput(reg.qrCode)}
                      className="text-xs"
                    >
                      {reg.qrCode}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Scans */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
            </CardHeader>
            <CardContent>
              {recentScans.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <QrCode className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No scans yet. Start scanning QR codes.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentScans.map((scan, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        scan.type === 'check-in' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {scan.type === 'check-in' ? (
                          <CheckCircle2 className={`h-5 w-5 ${
                            scan.type === 'check-in' ? 'text-green-600' : 'text-blue-600'
                          }`} />
                        ) : (
                          <Store className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">{scan.name}</div>
                        <div className="text-xs text-gray-600">
                          {scan.type === 'check-in' ? 'Checked In' : `Visited: ${scan.booth}`}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(scan.time).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
