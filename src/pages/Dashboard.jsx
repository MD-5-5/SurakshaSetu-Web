import { useState, useEffect } from "react"; // === ADDED useEffect ===
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, MapPin, Clock, User, Phone, LogOut, Bell } from "lucide-react";

import { io } from "socket.io-client"; // === ADDED io ===

// === ADDED: Socket.IO Connection ===
// Server se connection banao (component ke bahar)
const socket = io("http://localhost:5000"); // Aapka backend URL

const Dashboard = () => {
  const navigate = useNavigate();

  // === MODIFIED: Mock data ko real state se replace kiya ===
  // Ab yeh state Socket.IO se update hoga
  const [activeCases, setActiveCases] = useState([]);

  // === YAHAN DONO CHEEZEIN HAIN ===
  useEffect(() => {
    
    // === 1. YEH FUNCTION PURANA DATA FETCH KAREGA ===
    const fetchExistingAlerts = async () => {
      try {
        // Proxy ki wajah se humein sirf '/api/alert' likhna hai
        const response = await fetch("/api/alert"); // Yeh GET request hai
        const data = await response.json();
        
        // Data ko UI ke format mein badlo
        const formattedAlerts = data.map(alert => ({
          id: alert.id,
          type: alert.type || "Unknown Emergency",
          location: alert.location || "Unknown",
          reportedBy: alert.userId || "System",
          reportedAt: alert.timestamp ? new Date(alert.timestamp).toLocaleTimeString() : "long ago",
          status: alert.status || "resolved",
          priority: alert.priority || "medium",
          description: alert.description || "...",
          contactNumber: alert.contactNumber || "N/A",
        }));
        
        // State ko update karo
        setActiveCases(formattedAlerts); 

      } catch (error) {
        console.error("Failed to fetch existing alerts:", error);
      }
    };
    
    // FUNCTION KO CALL KIYA
    fetchExistingAlerts();


    // === 2. YEH FUNCTION NAYE ALERTS KE LIYE WAIT KAREGA ===
    // Server se connect ho
    socket.connect();

    // 'newAlert' event ko suno
    socket.on("newAlert", (newAlertData) => {
      console.log("NEW ALERT RECEIVED!", newAlertData);

      // Naye data ko apne UI ke format mein badlo
      const formattedAlert = {
        id: newAlertData.id || `EMG-${Date.now()}`,
        type: newAlertData.emergencyType || "Unknown Emergency",
        location: newAlertData.location.lat
          ? `Lat: ${newAlertData.location.lat}, Lng: ${newSAlertData.location.lng}`
          : "Location not provided",
        reportedBy: newAlertData.userId || "Unknown User",
        reportedAt: newAlertData.timestamp
          ? new Date(newAlertData.timestamp).toLocaleTimeString()
          : "Just now",
        status: "pending", // Har naya alert 'pending' hoga
        priority: newAlertData.priority || "high", // Default priority
        description:
          newAlertData.description || "No description from reporter.",
        contactNumber: newAlertData.contactNumber || "N/A",
      };

      // Naye alert ko list mein sabse upar add kardo
      setActiveCases((prevAlerts) => [formattedAlert, ...prevAlerts]);
    });

    // 3. Cleanup: Jab component band ho toh connection bhi band kardo
    return () => {
      socket.off("newAlert");
      socket.disconnect();
    };
  }, []); // [] ka matlab yeh code sirf ek baar chalega
  // === END: useEffect ===

  const handleLogout = () => {
    navigate("/login");
  };

  const handleTakeAction = (caseId) => {
    console.log("Taking action on case:", caseId);
    // Example: socket.emit('caseAction', { caseId: caseId, status: 'in-progress' });
  };

  // === YEH CODE AB AUTOMATICALLY KAAM KAREGA ===
  const pendingCases = activeCases.filter((c) => c.status === "pending");
  const inProgressCases = activeCases.filter((c) => c.status === "in-progress");

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-accent text-accent-foreground";
      case "medium":
        return "bg-amber-500 text-white";
      case "low":
        return "bg-blue-500 text-white";
      default:
        return "bg-muted";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-accent text-accent-foreground";
      case "in-progress":
        return "bg-primary text-primary-foreground";
      case "resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Service Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Police Station - Central District
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {pendingCases.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Require immediate action
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {inProgressCases.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Currently being handled
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {activeCases.length}
              </div>
              
              <p className="text-xs text-muted-foreground mt-1">
                All active cases
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Active Cases List */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-accent" />
            <h2 className="text-2xl font-bold">Active Emergency Cases</h2>
          </div>

          {activeCases.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No active cases at the moment
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activeCases.map((emergencyCase) => (
                <Card
                  key={emergencyCase.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={getPriorityColor(emergencyCase.priority)}
                          >
                            {emergencyCase.priority.toUpperCase()} PRIORITY
                          </Badge>
                          <Badge
                            className={getStatusColor(emergencyCase.status)}
                            variant="outline"
                          >
                            {emergencyCase.status
                              .replace("-", " ")
                              .toUpperCase()}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {emergencyCase.type}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Case ID: {emergencyCase.id}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {emergencyCase.reportedAt}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          {emergencyCase.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          Reported by: {emergencyCase.reportedBy}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          Contact: {emergencyCase.contactNumber}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm mb-4 p-3 bg-muted/50 rounded-lg">
                      {emergencyCase.description}
                    </p>

                    <div className="flex gap-2">
                      {emergencyCase.status === "pending" && (
                        <Button
                          onClick={() => handleTakeAction(emergencyCase.id)}
                          className="bg-accent hover:bg-accent/90"
                        >
                          Respond to Emergency
                        </Button>
                      )}
                      {emergencyCase.status === "in-progress" && (
                        <Button variant="outline">Update Status</Button>
                      )}
                      <Button variant="outline">View on Map</Button>
                      <Button variant="outline">Call Reporter</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;