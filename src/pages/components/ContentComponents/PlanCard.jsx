// src/components/PlanCard.jsx
import React from "react";

const PlanCard = ({ label, price, subtitle, items, ctaLabel }) => {
    const base =
        "flex flex-col justify-between h-full text-left px-[24px] pt-[24px] pb-[22px] rounded-[20px] border transition-all duration-300";
    const cardStyle = "bg-[#050609] border-[#2a2233]";

    const labelClass = "text-[20px] font-semibold text-white/60 mb-[4px]";
    const priceClass =
        "text-[40px] font-extrabold text-white mb-[2px] tracking-tight";
    const subtitleClass = "text-[17px] text-white/65 mb-[10px]";
    const listClass =
        "space-y-[4px] text-[10px] leading-[16px] text-[#FFFFFF99] pt-8";
    const checkColor = "text-white";

    return (
        <div className={`${base} ${cardStyle}`}>
            <div>
                <div className={labelClass}>{label}</div>
                <div className={priceClass}>{price}</div>
                <div className={subtitleClass}>{subtitle}</div>

                {ctaLabel && (
                    <button
                        className="mt-[18px] w-full h-[40px] rounded-2xl text-[16px] font-bold flex items-center justify-center bg-black text-white border border-white/40 hover:bg-white/10"
                    >
                        {ctaLabel}
                    </button>
                )}

                <ul className={listClass}>
                    {items.map((it, idx) => (
                        <li key={idx} className="flex gap-[6px]">
                            <span className={checkColor}>✓</span>
                            <span>{it}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlanCard;
