import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { 
  // Cloud Computing
  Cloud, CloudCog, Database, Server,
  // Cybersecurity
  Shield, ShieldAlert, ShieldCheck, Lock, Key, Fingerprint, 
  // AI & Machine Learning
  Brain, Cpu, CircuitBoard, Binary, Network, Workflow,
  // Software Development
  Code, CodeSquare, GitBranch, Terminal, Blocks, PackageCheck,
  // Additional Tech Icons
  Globe, Wifi, MonitorSmartphone, HardDrive, Settings, Radio
} from 'lucide-react';

const icons = [
  // Cloud Computing
  { size: "lg", type: "fill", Icon: Cloud },
  { size: "md", type: "outline", Icon: CloudCog },
  { size: "lg", type: "fill", Icon: Database },
  { size: "sm", type: "outline", Icon: Server },
  
  // Cybersecurity
  { size: "lg", type: "fill", Icon: Shield },
  { size: "md", type: "outline", Icon: ShieldAlert },
  { size: "sm", type: "fill", Icon: ShieldCheck },
  { size: "lg", type: "outline", Icon: Lock },
  { size: "md", type: "fill", Icon: Key },
  { size: "sm", type: "outline", Icon: Fingerprint },
  
  // AI & Machine Learning
  { size: "lg", type: "fill", Icon: Brain },
  { size: "md", type: "outline", Icon: Cpu },
  { size: "lg", type: "fill", Icon: CircuitBoard },
  { size: "sm", type: "outline", Icon: Binary },
  { size: "md", type: "fill", Icon: Network },
  { size: "lg", type: "outline", Icon: Workflow },
  
  // Software Development
  { size: "md", type: "fill", Icon: Code },
  { size: "lg", type: "outline", Icon: CodeSquare },
  { size: "sm", type: "fill", Icon: GitBranch },
  { size: "md", type: "outline", Icon: Terminal },
  { size: "lg", type: "fill", Icon: Blocks },
  { size: "sm", type: "outline", Icon: PackageCheck },
  
  // Additional Tech Icons
  { size: "lg", type: "fill", Icon: Globe },
  { size: "md", type: "outline", Icon: Wifi },
  { size: "sm", type: "fill", Icon: MonitorSmartphone },
  { size: "lg", type: "outline", Icon: Settings },
  { size: "md", type: "fill", Icon: Radio },
  { size: "sm", type: "outline", Icon: HardDrive }
];

const DynamicBackground = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const heroRef = useRef();
  const iconsRef = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setHasMounted(true);
    setDimensions({
      width: heroRef.current?.offsetWidth || 0,
      height: heroRef.current?.offsetHeight || 0
    });

    const handleResize = () => {
      setDimensions({
        width: heroRef.current?.offsetWidth || 0,
        height: heroRef.current?.offsetHeight || 0
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const heroElement = heroRef.current;
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const rect = heroElement.getBoundingClientRect();
      
      iconsRef.current.forEach((icon, index) => {
        if (!icon) return;
        const speed = (index + 1) * 0.05;
        const x = (clientX - rect.left - dimensions.width / 2) * speed;
        const y = (clientY - rect.top - dimensions.height / 2) * speed;
        icon.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    heroElement.addEventListener('mousemove', handleMouseMove);
    return () => heroElement.removeEventListener('mousemove', handleMouseMove);
  }, [dimensions]);

  const getIconSize = (size) => {
    switch (size) {
      case 'lg': return 'w-12 h-12';
      case 'md': return 'w-8 h-8';
      case 'sm': return 'w-6 h-6';
      default: return 'w-8 h-8';
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-russian-violet" ref={heroRef}>
      {hasMounted && (
        <div className="absolute inset-0 pointer-events-none">
          {icons.map(({ size, type, Icon }, i) => (
            <div
              key={i}
              ref={el => iconsRef.current[i] = el}
              className={`absolute transition-transform duration-100 ease-out ${getIconSize(size)}`}
              style={{
                top: `${Math.random() * dimensions.height}px`,
                left: `${Math.random() * dimensions.width}px`,
              }}
            >
              <Icon 
                className={`w-full h-full ${type === 'fill' ? 'text-orange-peel/40' : 'text-princeton-orange/30'}`}
                strokeWidth={type === 'outline' ? 1 : 2}
              />
            </div>
          ))}
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

DynamicBackground.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DynamicBackground;
