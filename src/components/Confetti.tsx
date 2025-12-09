import React from 'react';

interface ConfettiProps {
  active: boolean;
}

export const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  if (!active) return null;

  // Partículas estáticas para animación CSS
  const particles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(i => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-[fall_3s_ease-in_forwards]"
          style={{
            left: `${(i * 7) % 100}%`,
            backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'][i % 5],
            animationDelay: `${(i % 10) * 0.1}s`,
            top: '-10px'
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
