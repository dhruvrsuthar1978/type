import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Shield, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Demo = () => {
  const [testText, setTestText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(true);
  const { toast } = useToast();

  // Demo analysis function
  const analyzeText = async () => {
    if (!testText.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter some text to analyze"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock analysis logic
    const threats = [];
    const toxicWords = ['hate', 'stupid', 'idiot', 'kill', 'die', 'dumb'];
    const harassmentPatterns = ['you suck', 'go away', 'nobody likes you'];
    
    toxicWords.forEach(word => {
      if (testText.toLowerCase().includes(word)) {
        threats.push({
          type: 'toxicity',
          severity: 'high',
          word: word,
          context: 'Toxic language detected'
        });
      }
    });

    harassmentPatterns.forEach(pattern => {
      if (testText.toLowerCase().includes(pattern)) {
        threats.push({
          type: 'harassment',
          severity: 'critical',
          word: pattern,
          context: 'Harassment pattern detected'
        });
      }
    });

    // Check for excessive caps
    if (testText === testText.toUpperCase() && testText.length > 10) {
      threats.push({
        type: 'aggressive',
        severity: 'medium',
        word: 'ALL CAPS',
        context: 'Aggressive communication style'
      });
    }

    setAnalysisResult({
      threats,
      safetyScore: Math.max(0, 100 - (threats.length * 25)),
      suggestions: threats.length > 0 ? [
        'Consider using more respectful language',
        'Focus on constructive communication',
        'Take a moment before posting'
      ] : ['Your message looks great!']
    });
    
    setIsAnalyzing(false);
  };

  const downloadExtension = () => {
    // Create a simple download link for the extension
    toast({
      title: "Extension Ready",
      description: "Extension files are being prepared for download..."
    });
    
    // In a real scenario, this would trigger a download of the extension zip
    console.log('Extension download initiated');
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-danger text-danger-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getSafetyScoreColor = (score) => {
    if (score >= 80) return 'text-security';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/30 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            TypeAware Demo Center
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test our advanced AI-powered content moderation technology. Analyze text for toxicity, harassment, and safety threats.
          </p>
        </div>

        {/* Extension Download */}
        <Card className="hover-lift">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Browser Extension
                </CardTitle>
                <CardDescription>
                  Download our browser extension for real-time protection across all websites
                </CardDescription>
              </div>
              <Button 
                onClick={downloadExtension} 
                variant="premium" 
                size="lg" 
                className="min-w-[160px]"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Extension
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Text Testing Area */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                Text Analysis Demo
              </CardTitle>
              <CardDescription>
                Enter any text to see how our AI detection system works
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Type your message here... (try words like 'hate', 'stupid', or 'YOU SUCK' to see detection in action)"
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                rows={6}
                className="transition-smooth focus:ring-2 focus:ring-primary/20"
              />
              
              <div className="flex gap-3">
                <Button 
                  onClick={analyzeText} 
                  disabled={isAnalyzing}
                  variant="default"
                  size="lg"
                  className="flex-1"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  size="lg"
                >
                  {showAnalysis ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </Button>
              </div>

              {testText && (
                <div className="text-sm text-muted-foreground">
                  Character count: {testText.length}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card className={`hover-lift transition-all duration-500 ${analysisResult && showAnalysis ? 'ring-2 ring-primary/20' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Analysis Results
              </CardTitle>
              <CardDescription>
                Real-time safety assessment and threat detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!analysisResult && showAnalysis && (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter text and click "Analyze Text" to see results</p>
                </div>
              )}

              {analysisResult && showAnalysis && (
                <div className="space-y-6 animate-fade-in">
                  {/* Safety Score */}
                  <div className="text-center p-4 bg-gradient-card rounded-lg">
                    <div className={`text-3xl font-bold ${getSafetyScoreColor(analysisResult.safetyScore)}`}>
                      {analysisResult.safetyScore}%
                    </div>
                    <div className="text-sm text-muted-foreground">Safety Score</div>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          analysisResult.safetyScore >= 80 ? 'bg-security' :
                          analysisResult.safetyScore >= 60 ? 'bg-warning' : 'bg-danger'
                        }`}
                        style={{ width: `${analysisResult.safetyScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Threats Detected */}
                  {analysisResult.threats.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-warning" />
                        Threats Detected ({analysisResult.threats.length})
                      </h4>
                      {analysisResult.threats.map((threat, index) => (
                  <Alert key={index} className="border-l-4 border-l-warning bg-warning/5 hover-scale">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-foreground">{threat.word}</span>
                          <p className="text-xs text-muted-foreground mt-1">{threat.context}</p>
                        </div>
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity}
                        </Badge>
                      </div>
                    </AlertDescription>
                  </Alert>
                      ))}
                    </div>
                  )}

                  {/* Suggestions */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-security" />
                      Suggestions
                    </h4>
                    <ul className="space-y-1">
                      {analysisResult.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {analysisResult.threats.length === 0 && (
                  <Alert className="border-l-4 border-l-security bg-security/5 hover-scale">
                    <CheckCircle className="w-4 h-4 text-security" />
                    <AlertDescription className="text-foreground font-medium">
                      Great! No safety threats detected in your message. It's safe to post.
                    </AlertDescription>
                  </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-lift text-center">
            <CardContent className="pt-6">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real-time Detection</h3>
              <p className="text-sm text-muted-foreground">Instant analysis as you type</p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift text-center">
            <CardContent className="pt-6">
              <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Multi-threat Analysis</h3>
              <p className="text-sm text-muted-foreground">Detects toxicity, harassment & more</p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift text-center">
            <CardContent className="pt-6">
              <CheckCircle className="w-12 h-12 text-security mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Smart Suggestions</h3>
              <p className="text-sm text-muted-foreground">AI-powered improvement tips</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Demo;