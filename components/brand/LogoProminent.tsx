'use client';

import Link from 'next/link';
import { Receipt } from 'lucide-react';

export function LogoProminent() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Icon Container - Clean Design */}
      <div className="relative w-20 h-20 rounded-2xl bg-[#9945FF] hover:bg-[#8839EE] p-3.5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all duration-300">
        <Receipt className="w-full h-full text-white" />
      </div>
      
      {/* Text - BIGGER */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold tracking-tight leading-none text-white">
          SolPay
        </h1>
        <span className="text-xs font-semibold text-gray-400 tracking-widest -mt-0.5">
          EXPRESS
        </span>
      </div>
    </Link>
  );
}
