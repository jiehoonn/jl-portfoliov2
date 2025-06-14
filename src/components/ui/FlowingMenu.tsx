import React from "react";
import { gsap } from "gsap";

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
  content?: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="w-full overflow-hidden">
      <nav className="flex flex-col m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image, content, isExpanded = false, onToggle }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const showMarquee = (edge: "top" | "bottom") => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;
    
    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
  };

  const showMarqueeFromBottom = () => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;
    
    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: "101%" })
      .set(marqueeInnerRef.current, { y: "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
  };

  const hideMarquee = (edge: "top" | "bottom") => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;
    
    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, "<");
  };

  const hideMarqueeToBottom = () => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;
    
    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef.current, { y: "101%" })
      .to(marqueeInnerRef.current, { y: "-101%" }, "<");
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current) return;
    setIsHovered(true);
    
    // If expanded, don't do edge detection - just ensure marquee is visible
    if (isExpanded) {
      // If marquee is not already showing, show it from bottom
      if (marqueeRef.current && marqueeInnerRef.current) {
        const currentY = gsap.getProperty(marqueeRef.current, "y");
        if (currentY !== "0%" && currentY !== 0) {
          showMarqueeFromBottom();
        }
      }
      return;
    }
    
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    showMarquee(edge);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current) return;
    setIsHovered(false);
    
    // Don't hide marquee if item is expanded
    if (isExpanded) return;
    
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    hideMarquee(edge);
  };

  const handleClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    if (onToggle) {
      onToggle();
    }
  };

  // Handle expansion/collapse animations
  React.useEffect(() => {
    if (!contentRef.current) return;

    if (isExpanded) {
      // Show marquee when expanding (always from bottom for consistency)
      if (marqueeRef.current && marqueeInnerRef.current) {
        showMarqueeFromBottom();
      }
      
      // Expand content
      gsap.fromTo(contentRef.current, 
        { height: 0, opacity: 0 },
        { 
          height: "auto", 
          opacity: 1, 
          duration: 0.6, 
          ease: "power2.out"
        }
      );
    } else {
      // Only hide marquee when collapsing if not currently hovered
      if (!isHovered && marqueeRef.current && marqueeInnerRef.current) {
        hideMarqueeToBottom();
      }
      
      // Collapse content
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    }
  }, [isExpanded]);

  // Handle marquee state when hover changes while expanded
  React.useEffect(() => {
    if (!isExpanded) return;
    
    // When expanded and hover state changes, ensure marquee remains visible
    if (marqueeRef.current && marqueeInnerRef.current) {
      const currentY = gsap.getProperty(marqueeRef.current, "y");
      if (currentY !== "0%" && currentY !== 0) {
        showMarqueeFromBottom();
      }
    }
  }, [isHovered, isExpanded]);

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 16 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span className="text-[#060606] uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0] whitespace-nowrap">
          {text}
        </span>
        <div
          className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center flex-shrink-0"
          style={{ backgroundImage: `url(${image})` }}
        />
      </React.Fragment>
    ));
  }, [text, image]);

  return (
    <div className="w-full">
      <div
        className="relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff] h-[150px]"
        ref={itemRef}
      >
        <a
          className="flex items-center justify-start pl-8 h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[4vh] hover:text-[#060606] focus:text-white focus-visible:text-[#060606]"
          href={link}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {text}
          <span className="ml-4 text-2xl transition-transform duration-300" style={{
            transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)'
          }}>
            +
          </span>
        </a>
        <div
          className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"
          ref={marqueeRef}
        >
          <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
            <div className="flex items-center relative h-full w-full will-change-transform animate-marquee">
              {repeatedMarqueeContent}
            </div>
          </div>
        </div>
      </div>
      
      {/* Expandable content */}
      {content && (
        <div
          ref={contentRef}
          className="overflow-hidden bg-white"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="p-8">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowingMenu; 