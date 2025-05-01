interface AnimatedTextProps {
  text: string;
  className?: string;
}

export function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  return (
    <div className={`animate-in ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block animate-float"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}