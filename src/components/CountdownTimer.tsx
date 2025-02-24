import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  targetDate: string;
}

function CountdownTimer({ targetDate }: Props) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const unitTranslations: { [key: string]: string } = {
    days: 'Dias',
    hours: 'Horas',
    minutes: 'Minutos',
    seconds: 'Segundos'
  };

  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      {Object.entries(timeLeft).map(([unit, value], index) => (
        <div
          key={unit}
          className={`bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 flex flex-col items-center animate-fade-scale hover-grow animate-soft-glow`}
          style={{ animationDelay: `${index * 200}ms` }}
        >
          <div className="text-2xl md:text-4xl font-bold animate-gentle-wave">
            {value}
          </div>
          <div className="text-xs md:text-sm uppercase mt-2 animate-float-in" style={{ animationDelay: `${(index * 200) + 300}ms` }}>
            {unitTranslations[unit] || unit}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CountdownTimer;