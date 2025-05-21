'use client'
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-red-600 to-pink-500 text-white pt-8 pb-6 shadow-lg">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-2 tracking-tight leading-tight break-words">
          Ruby進化の物語
        </h1>
        <div className="text-sm sm:text-xl font-normal italic mt-0 mb-4 opacity-90 break-words">
          〜バージョンごとに読み解く、技術と思想の歩み〜
        </div>
        <p className="text-sm sm:text-base font-light opacity-95 leading-relaxed m-0 break-words"> {/* Changed text-xs to text-sm for mobile */}
          Rubyはなぜ多くの開発者に愛され続けてきたのか？<br />
          その歴史と進化を、初心者にもやさしく・わかりやすく解説します。
        </p>
      </div>
    </header>
  );
};

export default Header;