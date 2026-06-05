import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3, 
  ArrowRight,
  CheckCircle2,
  Cpu,
  Lock,
  Server,
  Network,
  Settings,
  Database,
  Radio,
  LineChart,
  ShieldCheck,
  MousePointer2
} from 'lucide-react';
import { ROUTES } from '../utils/constants';

export const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <motion.div 
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20"
            >
              <Activity className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight text-white">STPI <span className="text-cyan-400">NOC</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Infrastructure</a>
            <a href="#security" className="hover:text-white transition-colors">Intelligence</a>
            <a href="#monitoring" className="hover:text-white transition-colors">Compliance</a>
            <a href="#coverage" className="hover:text-white transition-colors">Global Ops</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to={ROUTES.LOGIN} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
              Operator Login
            </Link>
            <Link 
              to={ROUTES.DASHBOARD} 
              className="rounded-full bg-white px-5 py-2 text-sm font-bold text-[#020617] transition hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              Command Center
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-40">
        {/* Animated Background Gradients */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" 
        />
        <div className="absolute top-1/4 right-0 -z-10 h-[600px] w-[600px] translate-x-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-xs font-semibold text-cyan-400 ring-1 ring-inset ring-cyan-500/20"
            >
              <Zap className="h-3 w-3" />
              STPI Next-Generation Intelligence Platform
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="mt-8 text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl"
            >
              Autonomous Network <br />
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent italic">
                Resilience
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="mx-auto mt-8 max-w-3xl text-lg text-slate-400 sm:text-xl leading-relaxed"
            >
              The definitive standard for enterprise network orchestration. Monitor global infrastructure with sub-millisecond precision, automated healing, and zero-trust security architecture.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link 
                to={ROUTES.DASHBOARD} 
                className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-cyan-600 px-10 py-5 text-lg font-bold text-white transition-all hover:bg-cyan-500 hover:shadow-[0_0_40px_rgba(8,145,178,0.4)]"
              >
                Access Command Center
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#coverage" className="rounded-xl border border-slate-700 bg-slate-900/50 px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-slate-800">
                Network Coverage Map
              </a>
            </motion.div>
          </motion.div>

          {/* App Preview Mockup with Live Feed Simulation */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-24 relative mx-auto max-w-6xl"
          >
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-2 backdrop-blur-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              <div className="rounded-xl border border-white/5 bg-[#020617] overflow-hidden aspect-[21/9] flex flex-col">
                 <div className="bg-slate-900/80 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500/20" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/20" />
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       Primary Gateway: Online
                    </div>
                 </div>
                 <div className="flex-1 grid grid-cols-4 p-6 gap-6">
                    <div className="col-span-3 rounded-lg border border-white/5 bg-slate-900/50 p-4 relative overflow-hidden">
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05),transparent)] pointer-events-none" />
                       <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Topology Visualizer</h4>
                          <Activity className="h-4 w-4 text-cyan-500" />
                       </div>
                       <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full flex items-center justify-center opacity-40"
                       >
                          <Network className="h-32 w-32 text-cyan-500/20" />
                       </motion.div>
                    </div>
                    <div className="col-span-1 space-y-4">
                       {[1, 2, 3, 4].map(i => (
                         <div key={i} className="rounded-lg border border-white/5 bg-slate-900/80 p-3">
                            <div className="h-1 w-12 bg-cyan-500/20 rounded-full mb-2" />
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                               <motion.div 
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                className="h-full w-1/2 bg-cyan-500/40" 
                               />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
            {/* Real-time Status Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-12 -right-8 hidden lg:block rounded-xl border border-white/10 bg-slate-900/90 p-5 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  <div className="absolute inset-0 h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white uppercase tracking-tighter">Nodes Healthy</span>
                  <span className="text-[10px] text-emerald-400 font-mono">1,248 / 1,248</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Expansion: Regional Infrastructure Map */}
      <section id="coverage" className="py-32 bg-slate-950/50 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(2,6,23,0)_0%,rgba(15,23,42,0.4)_50%,rgba(2,6,23,0)_100%)] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1">
                 <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                 >
                    <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10">
                      <Globe className="h-3 w-3" />
                      Pan-India Connectivity
                    </div>
                    <h2 className="text-4xl font-bold text-white leading-tight">
                      Decentralized Network <br />
                      Distribution Nodes
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      STPI NOC manages 60+ strategic gateway locations across India. Each node is equipped with autonomous failover capabilities and redundant fiber architecture.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                       {[
                         { label: 'Cloud Regions', val: '08' },
                         { label: 'Edge Gateways', val: '142' },
                         { label: 'Backbone Fiber', val: '12k km' },
                         { label: 'Secure Pop Locs', val: '64' }
                       ].map(stat => (
                         <div key={stat.label} className="p-4 rounded-xl border border-white/5 bg-[#020617]">
                            <div className="text-2xl font-bold text-cyan-400">{stat.val}</div>
                            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{stat.label}</div>
                         </div>
                       ))}
                    </div>
                 </motion.div>
              </div>
              <div className="flex-1 w-full max-w-xl aspect-square relative flex items-center justify-center">
                 <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
                 {/* Visual Proxy for a Map */}
                 <div className="relative h-full w-full border border-white/10 rounded-full p-12 overflow-hidden flex items-center justify-center">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1], rotate: 360 }}
                      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 opacity-10"
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[0.2]">
                        <circle cx="50" cy="50" r="45" />
                        <path d="M50 5 L50 95 M5 50 L95 50" strokeWidth="0.1" />
                        {[...Array(12)].map((_, i) => (
                           <path key={i} d={`M${50 + 45 * Math.cos(i * Math.PI / 6)} ${50 + 45 * Math.sin(i * Math.PI / 6)} L 50 50`} strokeWidth="0.05" />
                        ))}
                      </svg>
                    </motion.div>
                    <div className="relative text-center">
                       <Radio className="h-16 w-16 text-cyan-500 mx-auto mb-4" />
                       <div className="text-sm font-mono text-cyan-400 animate-pulse">ACTIVE SIGNAL BEACON</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Extended Features Grid */}
      <section id="features" className="py-32 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white">Full-Stack Network Governance</h2>
            <p className="mt-4 text-slate-400">Total control from Layer 2 up to custom Application Delivery.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard 
              icon={ShieldCheck}
              title="Quantum-Grade Security"
              description="Zero-trust posture with real-time protocol analysis and automated perimeter hardening."
            />
            <FeatureCard 
              icon={LineChart}
              title="Telemetry Analytics"
              description="Peta-scale data ingestion engine providing deep forensic insights into packet flow."
            />
            <FeatureCard 
              icon={Server}
              title="Hyper-Converged Ops"
              description="Unified control plane for physical hardware, virtualization, and containerized SDNs."
            />
            <FeatureCard 
              icon={Settings}
              title="Smart Automation"
              description="Infrastructure as Code (IaC) integration for rapid environment provisioning and patching."
            />
            <FeatureCard 
              icon={Database}
              title="Secure Archiving"
              description="FIPS 140-3 compliant storage for all network audit logs and historical snapshots."
            />
            <FeatureCard 
              icon={Radio}
              title="Spectrum Monitoring"
              description="Advanced wireless and RF infrastructure tracking across specialized gateways."
            />
            <FeatureCard 
              icon={Lock}
              title="Auth Vault"
              description="Biometric and hardware-backed multi-factor authentication for sensitive NOC actions."
            />
            <FeatureCard 
              icon={MousePointer2}
              title="Remote Hands"
              description="Integrated virtual console for direct low-level device management across any distance."
            />
          </div>
        </div>
      </section>

      {/* Technical Performance Metrics */}
      <section id="monitoring" className="py-24 border-y border-white/5 bg-slate-900/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
            <StatItem label="Global Nodes" value="2.4k+" color="cyan" />
            <StatItem label="Data Processed" value="1.2 PB" color="blue" />
            <StatItem label="Avg Response" value="1.1ms" color="emerald" />
            <StatItem label="System Uptime" value="100%" color="indigo" />
          </div>
        </div>
      </section>

      {/* Intelligence & Infrastructure Section */}
      <section className="py-32 overflow-hidden bg-[radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.05),transparent)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-white leading-tight">
                  High-Availability <br />
                  <span className="text-blue-500">Autonomous Core</span>
                </h2>
                <div className="h-1.5 w-20 bg-blue-500 rounded-full mt-4" />
              </motion.div>
              
              <p className="text-slate-400 text-lg leading-relaxed font-light">
                Our infrastructure is built on a distributed ledger of network states, ensuring that no single point of failure can impact regular operations. The AI-driven NOC brain analyzes 4 million events per second to maintain peak performance.
              </p>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Self-healing switch fabrics",
                  "Predictive traffic rerouting",
                  "Automated threat sandboxing",
                  "Hardware-level isolation",
                  "Sub-second error recovery",
                  "Integrated DTI (Deep Threat Intel)"
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-slate-300 text-sm font-medium"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 relative">
               <div className="grid grid-cols-2 gap-6 relative z-10">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-8 rounded-3xl bg-cyan-600/5 border border-cyan-500/10 flex flex-col items-center justify-center text-center gap-4 group transition-colors hover:bg-cyan-500/10"
                  >
                    <div className="p-4 rounded-2xl bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Cpu className="h-10 w-10" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Processing Core</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-8 rounded-3xl bg-blue-600/5 border border-blue-500/10 flex flex-col items-center justify-center text-center gap-4 mt-12 group transition-colors hover:bg-blue-500/10"
                  >
                    <div className="p-4 rounded-2xl bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                      <Lock className="h-10 w-10" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Secure Gateway</span>
                  </motion.div>
                  <motion.div 
                     whileHover={{ scale: 1.05 }}
                     className="p-8 rounded-3xl bg-emerald-600/5 border border-emerald-500/10 flex flex-col items-center justify-center text-center gap-4 group transition-colors hover:bg-emerald-500/10"
                  >
                    <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                      <BarChart3 className="h-10 w-10" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Live Analytics</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-8 rounded-3xl bg-indigo-600/5 border border-indigo-500/10 flex flex-col items-center justify-center text-center gap-4 mt-12 group transition-colors hover:bg-indigo-500/10"
                  >
                    <div className="p-4 rounded-2xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                       <Radio className="h-10 w-10" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Node Beacon</span>
                  </motion.div>
               </div>
               <div className="absolute -inset-10 bg-cyan-500/5 blur-[100px] -z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#020617] relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-blue-500/5 blur-[60px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2 space-y-6">
                 <div className="flex items-center gap-2">
                    <Activity className="h-6 w-6 text-cyan-500" />
                    <span className="text-2xl font-bold text-white tracking-tighter">STPI NOC <span className="text-cyan-400 italic">V4.0</span></span>
                 </div>
                 <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                    Software Technology Parks of India (STPI) Network Operations Center provides cutting-edge infrastructure management and monitoring solutions for critical national digital architecture.
                 </p>
              </div>
              <div>
                 <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Navigation</h4>
                 <ul className="space-y-2 text-sm text-slate-500">
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Infrastructure</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Security Protocols</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Compliance Engine</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Operator Portal</a></li>
                 </ul>
              </div>
              <div>
                 <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Resources</h4>
                 <ul className="space-y-2 text-sm text-slate-500">
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">incident Response</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">API Reference</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">System Status</a></li>
                 </ul>
              </div>
           </div>
           
           <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-slate-600 text-[10px] uppercase tracking-widest">
                 Managed by Ministry of Electronics and IT, Government of India.
              </p>
              <div className="flex gap-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <a href="#" className="hover:text-white transition-colors">Legal Disclosure</a>
                <a href="#" className="hover:text-white transition-colors">Data Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Cyber Policy</a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5, borderColor: 'rgba(34, 211, 238, 0.3)' }}
    className="group relative rounded-3xl border border-white/5 bg-slate-900/40 p-8 transition-all hover:bg-slate-950"
  >
    <div className="absolute inset-0 bg-linear-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
    <div className="relative z-10">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500 ring-1 ring-cyan-500/20 group-hover:scale-110 transition-transform">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-xs font-medium">
        {description}
      </p>
    </div>
  </motion.div>
);

const StatItem = ({ label, value, color = 'cyan' }) => {
  const colors = {
    cyan: 'text-cyan-400',
    blue: 'text-blue-400',
    emerald: 'text-emerald-400',
    indigo: 'text-indigo-400'
  };
  
  return (
    <div className="text-center space-y-2 group">
      <motion.div 
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        className={`text-3xl lg:text-4xl font-black ${colors[color]}`}
      >
        {value}
      </motion.div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold group-hover:text-slate-300 transition-colors">
        {label}
      </div>
    </div>
  );
};


