// src/components/UseCaseCard.jsx
import React, { useState } from "react";

const UseCaseCard = ({ img, title, desc, audio }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  const handleShowPlayer = () => {
    setShowPlayer(true); // 클릭 시 컨트롤러로 전환
  };

  return (
    <div className="flex flex-col items-center bg-[#151018] rounded-[14px] overflow-hidden shadow-md">
      <img src={img} alt={title} className="w-full object-cover" />

      <div className="px-[14px] pt-[14px] pb-[18px] w-full">
        <h4 className="text-[24px] font-semibold text-[#f5eaff] mb-[6px] text-center pb-4">
          {title}
        </h4>
        <p className="text-[16px] leading-[18px] text-[#c0b3cf] mb-[10px] text-center pb-4">
          {desc}
        </p>

        {showPlayer ? (
          <div className="flex items-center justify-center">
            <audio src={audio} controls autoPlay className="w-full">
              브라우저에서 오디오 태그를 지원하지 않습니다.
            </audio>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <button
              onClick={handleShowPlayer}
              className="px-[18px] py-[8px] rounded-xl bg-[#b52aff] text-[14px] font-semibold hover:bg-[#c956ff] transition-colors"
            >
              샘플음원 듣기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UseCaseCard;
