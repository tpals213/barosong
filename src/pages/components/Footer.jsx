// src/components/Footer.jsx
import React from "react";
import kakaoIcon from "../../assets/image/kakao.svg"; // 실제 아이콘 이미지 경로로 변경

const Footer = () => {
  return (
    <footer id="barosong-footer"  className="w-full bg-[#120d13] text-[#e4dde9]">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center py-[80px]">
        {/* 상단 타이틀 */}
        <div className="text-[28px] font-semibold tracking-[-0.02em] mb-[40px]">
          문의·신청하기
        </div>

        {/* 대표번호 */}
        <div className="text-[120px] leading-none font-semibold tracking-[0.06em] mb-[60px]">
          1577-4996
        </div>

        {/* 구분선 + or */}
        <div className="flex items-center gap-6 mb-[50px] w-full px-[160px]">
          <div className="flex-1 h-[2px] bg-[#2e2833]" />
          <span className="text-[28px] font-semibold text-[#f4e9ff]">or</span>
          <div className="flex-1 h-[2px] bg-[#2e2833]" />
        </div>

        {/* 카카오톡 아이콘 (원 안에) */}
        <div className="mb-[60px]">
          <div className="w-[80px] h-[80px] rounded-full bg-[#ffd900] flex items-center justify-center shadow-md">
            <img
              src={kakaoIcon}
              alt="카카오톡 상담"
              className="w-[40px] h-[40px] object-contain"
            />
          </div>
        </div>

        {/* 하단 주소 + 이메일 */}
        <div className="text-center text-[18px] leading-[30px] text-[#d3c6dd]">
          서울특별시 영등포구 영신로 220 knk디지털타워 606호
          <br />
          <span className="text-[#f4e9ff]">contact@jyes.co.kr</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
