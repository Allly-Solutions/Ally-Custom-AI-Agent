import { useEffect, useState } from "react";
import { Users, RefreshCw, Layers, Globe, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MetricsCardsChat() {
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [createdToday, setCreatedToday] = useState<number>(0);
  const [byService, setByService] = useState<Record<string, number>>({});
  const [bySource, setBySource] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://ally-agent-crm-cjgecca2a8c9hjfv.eastus2-01.azurewebsites.net/api/metrics/");
      const data = await res.json();
      console.log("📊 Data from backend:", data);

      // ✅ set all metrics
      setTotalLeads(data.total ?? 0);
      setCreatedToday(data.today ?? 0);
      setByService(data.byService ?? {});
      setBySource(data.bySource ?? {});
    } catch (error) {
      console.error("❌ Failed to fetch lead metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">
      {/* Total Leads */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Leads
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center gap-2">
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                <span className="text-muted-foreground">Loading...</span>
              </>
            ) : (
              totalLeads
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {loading ? "Fetching..." : "Last updated just now"}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 flex items-center gap-2"
            onClick={fetchMetrics}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </CardContent>
      </Card>

      {/* Leads Created Today */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Leads Created Today
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold flex items-center gap-2">
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                <span className="text-muted-foreground">Loading...</span>
              </>
            ) : (
              createdToday
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {loading ? "Fetching..." : "New leads counted today"}
          </p>

          <Button
            variant="outline"
            size="sm"
            className="mt-2 flex items-center gap-2"
            onClick={fetchMetrics}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </CardContent>
      </Card>

      {/* Leads by Service Needed */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Leads by Service
          </CardTitle>
          <Layers className="h-4 w-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-muted-foreground">Loading...</span>
            </div>
          ) : Object.keys(byService).length === 0 ? (
            <div className="text-sm text-muted-foreground">No data available</div>
          ) : (
            <ul className="text-sm space-y-1">
              {Object.entries(byService).map(([service, count]) => (
                <li key={service} className="flex justify-between">
                  <span>{service}</span>
                  <span className="font-semibold">{count}</span>
                </li>
              ))}
            </ul>
          )}

          <Button
            variant="outline"
            size="sm"
            className="mt-3 flex items-center gap-2"
            onClick={fetchMetrics}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </CardContent>
      </Card>

      {/* Leads from Website */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Leads from Website
          </CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center gap-2">
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                <span className="text-muted-foreground">Loading...</span>
              </>
            ) : (
              bySource["website"] ?? 0
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {loading ? "Fetching..." : "Leads originated from website"}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 flex items-center gap-2"
            onClick={fetchMetrics}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
