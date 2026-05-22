"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { primaryNav, solutions, ctaLinks } from "@/data/nav";

const SCROLL_THRESHOLD = 50;

/**
 * Site header — fixed 68px.
 *
 * Behavior:
 *   - Transparent over hero at the top.
 *   - Background fades to `paper` after 50px scroll (RAF-throttled).
 *   - Solutions item opens a mega-dropdown listing all 9 solutions in a 3×3 grid.
 *   - Mobile: hamburger opens full-viewport menu with nested 9-item Solutions list.
 *   - Three desktop right CTAs (matches current site): Log in, Request a Demo, Get started free.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > SCROLL_THRESHOLD);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openDropdown) return;
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [openDropdown]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  const toggleDropdown = useCallback((key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }, []);

  const bgClass =
    scrolled || mobileOpen || openDropdown
      ? "bg-paper border-b border-ink/8"
      : "bg-transparent";

  return (
    <header
      ref={dropdownRef}
      className={`fixed top-0 left-0 right-0 z-50 h-[68px] transition-colors duration-200 ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="SmilePass home" className="flex items-center">
          <Image
            src="/images/logos/smilepass-logo-primary-purple.png"
            alt="SmilePass"
            width={200}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {primaryNav.map((item) => (
            <div key={item.label} className="relative">
              {item.hasDropdown ? (
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="px-4 py-2 text-[0.92rem] font-medium text-ink hover:text-brand-purple transition-colors flex items-center gap-1"
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="true"
                >
                  {item.label}
                  <Chevron open={openDropdown === item.label} />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="px-4 py-2 text-[0.92rem] font-medium text-ink hover:text-brand-purple transition-colors block"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop right CTAs — 3 buttons matching current site */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={ctaLinks.login}
            className="text-[0.92rem] font-medium text-ink hover:text-brand-purple transition-colors"
          >
            Log in
          </a>
          <Link href={ctaLinks.requestDemo} className="btn-outline-purple text-[0.85rem] !py-2 !px-4">
            Request a Demo
          </Link>
          <a href={ctaLinks.getStarted} className="btn-primary text-[0.85rem] !py-2 !px-4">
            Get started free
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 text-ink"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <Hamburger open={mobileOpen} />
        </button>
      </div>

      {/* Solutions mega-dropdown (desktop) — 9 solutions in 3×3 grid */}
      {openDropdown === "Solutions" && (
        <div className="hidden lg:block absolute left-0 right-0 top-full bg-paper border-b border-ink/8 shadow-lg">
          <div className="max-w-7xl mx-auto px-10 py-8 grid grid-cols-3 gap-x-6 gap-y-3">
            {solutions.map((sol) => (
              <Link
                key={sol.slug}
                href={sol.href}
                onClick={() => setOpenDropdown(null)}
                className="group block px-4 py-3 rounded-lg hover:bg-mist transition-colors"
              >
                <h3 className="text-[0.95rem] font-medium text-ink mb-1 group-hover:text-brand-purple transition-colors">
                  {sol.label}
                </h3>
                <p className="text-[0.82rem] text-ink/65 leading-snug">{sol.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute left-0 right-0 top-full bg-paper border-b border-ink/8 shadow-lg max-h-[calc(100vh-68px)] overflow-y-auto">
          <nav className="px-6 py-6 flex flex-col gap-1">
            {primaryNav.map((item) =>
              item.hasDropdown ? (
                <MobileSolutionsBlock
                  key={item.label}
                  onLinkClick={() => setMobileOpen(false)}
                />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-2 text-base font-medium text-ink border-b border-ink/8"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="flex flex-col gap-3 mt-6 pb-2">
              <a
                href={ctaLinks.login}
                className="btn-secondary w-full"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </a>
              <Link
                href={ctaLinks.requestDemo}
                className="btn-outline-purple w-full"
                onClick={() => setMobileOpen(false)}
              >
                Request a Demo
              </Link>
              <a
                href={ctaLinks.getStarted}
                className="btn-primary w-full"
                onClick={() => setMobileOpen(false)}
              >
                Get started free
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────────────────────────────────────────── */

function MobileSolutionsBlock({ onLinkClick }: { onLinkClick: () => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-ink/8">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full py-3 px-2 text-base font-medium text-ink flex items-center justify-between"
        aria-expanded={expanded}
      >
        Solutions
        <Chevron open={expanded} />
      </button>
      {expanded && (
        <ul className="pb-3 pl-3 flex flex-col gap-1">
          {solutions.map((sol) => (
            <li key={sol.slug}>
              <Link
                href={sol.href}
                onClick={onLinkClick}
                className="block py-2 px-2 text-[0.92rem] text-ink/80 hover:text-brand-purple"
              >
                {sol.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 8"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={`w-3 h-2 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 1.5l5 5 5-5" />
    </svg>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden
    >
      {open ? (
        <>
          <path strokeLinecap="round" d="M6 6l12 12" />
          <path strokeLinecap="round" d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path strokeLinecap="round" d="M4 7h16" />
          <path strokeLinecap="round" d="M4 12h16" />
          <path strokeLinecap="round" d="M4 17h16" />
        </>
      )}
    </svg>
  );
}
