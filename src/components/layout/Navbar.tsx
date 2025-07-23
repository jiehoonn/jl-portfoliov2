"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Responsive navbar container (no content yet)
 *
 * Requirements satisfied:
 *  • Flex column layout, items-start, 10 px gap
 *  • 82 px space from both screen edges (left & right) via mx-[82px]
 *  • 36 px space from top edge via mt-[36px]
 *  • Fixed 75 px height
 *  • 50 px border-radius, #EFF2F9 background
 *  • Neumorphic twin box-shadow
 *  • Width is always viewport − 164 px (82 px each side), capped at 1265 px
 */
export default function Navbar() {
  return (
    <div className="w-full px-[82px] mt-[36px] flex justify-center">
      {/* Mobile: 658px and below: navbar container with only the circle.svg button */}
      <header className="flex items-center h-[75px] rounded-[50px] bg-[#EFF2F9] shadow-[_-5px_-5px_10px_0px_rgba(174,174,192,0.40),_5px_5px_10px_0px_#ffffff] z-10 w-full max-w-[1265px] sm:hidden">
        <button
          className="cursor-pointer p-0 border-none bg-transparent focus:outline-none"
          onClick={() => {
            // TODO: handle circle.svg click event for mobile
          }}
          aria-label="Open menu"
        >
          <Image src="/circle.svg" alt="Logo" width={88} height={88} priority />
        </button>
      </header>
      {/* Desktop: above 658px: full navbar */}
      <header className="hidden sm:flex flex-row items-center justify-between h-[75px] rounded-[50px] bg-[#EFF2F9] shadow-[_-5px_-5px_10px_0px_rgba(174,174,192,0.40),_5px_5px_10px_0px_#ffffff] z-10 w-full max-w-[1265px]">
        <div className="flex flex-row items-center">
          <Image src="/circle.svg" alt="Logo" width={88} height={88} priority />
          <nav className="flex flex-row items-center gap-[32px] ml-[32px]">
            <Link
              href="#experience"
              className="text-[#6E7F8D] text-center font-[400] text-[24px] leading-normal tracking-[-1.2px] font-[Avenir\ Next] hover:underline"
              style={{ fontFamily: "Avenir Next, sans-serif" }}
            >
              Experience
            </Link>
            <Link
              href="#projects"
              className="text-[#6E7F8D] text-center font-[400] text-[24px] leading-normal tracking-[-1.2px] font-[Avenir\ Next] hover:underline"
              style={{ fontFamily: "Avenir Next, sans-serif" }}
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="text-[#6E7F8D] text-center font-[400] text-[24px] leading-normal tracking-[-1.2px] font-[Avenir\ Next] hover:underline"
              style={{ fontFamily: "Avenir Next, sans-serif" }}
            >
              Contact
            </Link>
          </nav>
        </div>
        <div
          className="hidden lg:block h-[55px] w-[220px] sm:w-[405px] rounded-[50px] bg-[#EFF2F9] mr-[15px]"
          style={{
            boxShadow:
              "10px 10px 10px 0px rgba(174, 174, 192, 0.20) inset, -10px -10px 10px 0px rgba(255, 255, 255, 0.70) inset",
          }}
        />
      </header>
      {/* TODO: Replace sm: with custom max-xs658: classes for exact 658px breakpoint */}
    </div>
  );
}
