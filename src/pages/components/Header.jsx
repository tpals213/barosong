// src/components/Header.jsx
import React from "react";
import baroSongLogo from "../../assets/image/header.svg"; // 실제 로고 이미지 경로로 교체

const Header = () => {
  return (
    <header className="w-full bg-[#0a050f]">
      <div className="max-w-[1200px] mx-auto flex items-center h-[70px] ">
        {/* 로고 이미지 (좌측 정렬) */}
        <img
          src={baroSongLogo}
          alt="BaroSong"
          className="h-[40px] object-contain"
        />
      </div>
    </header>
  );
};

export default Header;
