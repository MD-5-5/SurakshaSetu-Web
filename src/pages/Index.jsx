import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, AlertCircle, Bell, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SurakshaSetu</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-accent hover:bg-accent/90">Register Service</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              SurakshaSetu
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-6">
              Bridge of Safety
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A platform to connect emergency services with individuals in distress. 
              Real-time alert coordination for Police, Ambulance, and Fire services.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8">
                Get Started
              </Button>
            </Link>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-3xl p-12 flex items-center justify-center aspect-square">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-accent/20 flex items-center justify-center animate-pulse">
                  <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center">
                    <AlertCircle className="w-10 h-10 text-accent-foreground" />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-accent/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <p className="text-sm font-medium text-muted-foreground">Emergency Location</p>
                <p className="text-xs text-muted-foreground">Real-time tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-card/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Report Emergency
              </h3>
              <p className="text-muted-foreground">
                Users raise real-time emergency alerts from their mobile app
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Alert Services
              </h3>
              <p className="text-muted-foreground">
                Police, Ambulance, and Fire services receive instant notifications
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Quick Response
              </h3>
              <p className="text-muted-foreground">
                Services coordinate and reach the location with real-time tracking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Instant Notifications
            </h3>
            <p className="text-sm text-muted-foreground">
              Receive emergency alerts in real-time directly to your service station
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Fast Response
            </h3>
            <p className="text-sm text-muted-foreground">
              Coordinate quickly with accurate location data and emergency details
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Secure Platform
            </h3>
            <p className="text-sm text-muted-foreground">
              Verified emergency services with secure authentication and data protection
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 SurakshaSetu. Connecting emergency services for a safer community.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
