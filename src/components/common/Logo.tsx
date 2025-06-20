interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
};

export default function Logo({ className = '', size = 'lg' }: LogoProps) {
  return (
    <h1 
      className={`font-bold text-black ${sizeClasses[size]} ${className} relative inline-block px-2 cursor-pointer
        before:absolute before:z-[-1] before:content-[''] before:bg-blue-900 before:h-5 before:left-2 before:bottom-0 
        before:w-0 before:opacity-70 before:transition-all before:duration-500 before:ease-in-out
        hover:before:w-[calc(100%-1rem)]`}
      style={{ fontFamily: 'Nanum Pen Script' }}
    >
      이지훈
    </h1>
  );
} 