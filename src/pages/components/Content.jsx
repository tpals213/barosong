// src/components/Container.jsx
import React, { useState } from "react";

import heroVideo from "../../assets/video/main_video.mp4"; // 메인 상단 영상

import middle from "../../assets/image/middle.svg"  // 중산 이미지

import useCase1 from "../../assets/image/image_1.svg";     // 소상공인 매장음악
import useCase2 from "../../assets/image/image_2.svg";     // 비즈니스 연결음
import useCase3 from "../../assets/image/image_3.svg";     // 선거 캠페인
import useCase4 from "../../assets/image/image_4.svg";     // 지자체 홍보음악
import useCase5 from "../../assets/image/image_5.svg";     // 광고/홍보 영상음악
import useCase6 from "../../assets/image/image_6.svg";     // 축제/이벤트 음악



import audio1 from "../../assets/audio/audio_1.mp3";
import audio2 from "../../assets/audio/audio_2.mp3";
import audio3 from "../../assets/audio/audio_3.mp3";
import audio4 from "../../assets/audio/audio_4.mp3";
import audio5 from "../../assets/audio/audio_5.mp3";
import audio6 from "../../assets/audio/audio_6.mp3";

const Content = () => {
    const handleScrollToFooter = () => {
        const el = document.getElementById("barosong-footer");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="w-full bg-[#0a050f] text-white">
            <div className="max-w-[1200px] mx-auto pb-[120px]">
                {/* 헤드 카피 */}
                <section className="pt-[40px] text-center">
                    <h1 className="text-[90px] leading-[100px] font-bold tracking-[-0.02em] text-[#e6dbee]">
                        당신의 이야기를 바로 노래로
                        <br />
                        만들어드립니다.
                    </h1>
                </section>

                {/* 메인 영상 */}
                <section className="mt-[24px]">
                    <video
                        src={heroVideo}
                        className="w-full rounded-[12px] object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </section>

                {/* 소개 영역 */}
                <section className="mt-[32px] flex flex-col md:flex-row gap-[32px]">
                    <div className="md:w-1/2">
                        <h2 className="text-[26px] leading-[36px] font-semibold text-[#efe4f5]">
                            소상공인에서 지자체까지,
                            <br />
                            브랜드 사운드를 바로 완성합니다.
                        </h2>
                    </div>
                    <div className="md:w-1/2 text-[14px] leading-[24px] text-[#c2b4cf]">
                        <p>
                            ‘바로송’은 AI 분석과 프로 작곡가의 감성을 결합한 맞춤형 브랜드송
                            제작 서비스입니다. 매장 홍보, 선거송, 지자체 캠페인, 유튜브 오프닝,
                            홍보영상 등 당신의 이야기를 가장 감각적인 오리지널 음악으로
                            만들어드립니다. AI는 당신의 컨셉과 키워드를 분석하고, 최종 곡은
                            전문 작곡가가 디테일을 완성합니다.
                        </p>
                    </div>
                </section>

                {/* CTA 버튼 */}
                <section className="mt-[40px] flex justify-center">
                    <button
                        onClick={handleScrollToFooter}
                        className="px-[56px] py-[18px] rounded-[999px] bg-[#b52aff] hover:bg-[#c956ff] transition-colors text-[18px] font-semibold text-white shadow-lg"
                    >
                        바로송 제작 신청하기
                    </button>
                </section>


                <section className="w-full py-32">
                    <div className="mx-auto flex flex-col lg:flex-row items-center gap-[40px]">
                        {/* 텍스트 영역 */}
                        <div className="w-full lg:w-1/2 text-left">
                            <h2 className="text-[#DFD7E4] font-bold text-[32px] leading-[1.2] lg:text-[48px] mb-[24px]">
                                아직도 가격으로 망설이십니까?
                            </h2>
                            <p className="text-[#DFD7E4] text-[14px] lg:text-[18px] leading-[1.6] mb-[6px]">
                                아직도 많은 비용을 주고 음악을 제작하십니까? 이제 세상은 변했습니다.
                                &nbsp;‘바로송’의 가격은 결코 퀄리티의 저하가 아닙니다.
                            </p>
                            <p className="text-[#DFD7E4] text-[14px] lg:text-[18px] leading-[1.6] mb-[6px]">
                                AI 기술 기반의 효율적인 프로세스와, JYP·현대자동차 등 다양한 브랜드
                                음원을 제작한 전문 작곡가진의 노하우가 결합된 새로운 형태의
                                브랜드 사운드 솔루션입니다.
                            </p>
                            <p className="text-[#DFD7E4] text-[14px] lg:text-[18px] leading-[1.6]">
                                매장 분위기, 캠페인 메시지, 공간의 감성을 가장 합리적인 가격으로
                                음악을 완성하세요.
                            </p>
                        </div>

                        {/* 이미지 영역 */}
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <div className="w-full max-w-[720px] rounded-[40px] overflow-hidden">
                                <img
                                    src={middle}
                                    alt="헤드폰과 계산기 이미지"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>



                {/* 활용 분야 */}
                <section className="mt-[72px]">
                    <h3 className="text-[20px] font-semibold text-[#f0e6ff] mb-[20px]">
                        ‘바로송’은 다양한 분야에서 쓰입니다.
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[28px]">
                        <UseCaseCard
                            img={useCase1}
                            audio={audio1}
                            title="소상공인 매장음악"
                            desc="까페, 미용실, 병원, 학원, 의류매장, 카센터, 식당 등 다양한 종류의 매장에 가장 잘 어울리는 음악을 분석하여 전문 작곡가가 완성합니다."
                        />
                        <UseCaseCard
                            img={useCase2}
                            audio={audio2}
                            title="비즈니스 연결음"
                            desc="매장 통화 연결시 브랜드의 인상을 강화할 수 있도록 매장 특성을 분석합니다. 고객이 매장을 기억할 수 있는 감성마케팅을 시작하세요."
                        />
                        <UseCaseCard
                            img={useCase3}
                            audio={audio3}
                            title="선거 캠페인"
                            desc="후보의 메시지를 감동적으로 전달하는 초개인화 맞춤형 선거음악으로 주민들의 지지와 공감을 이끌어 냅니다."
                        />
                        <UseCaseCard
                            img={useCase4}
                            audio={audio4}
                            title="지자체 홍보음악"
                            desc="지역의 매력과 정체성을 음악으로 표현합니다. 시민들은 물론이고 관광객 모두가 기억하는 브랜드송을 만듭니다."
                        />
                        <UseCaseCard
                            img={useCase5}
                            audio={audio5}
                            title="광고·홍보 영상음악"
                            desc="브랜드의 정체성을 분석하여 감성과 메시지를 음악으로 제작합니다. 이제 새로운 모습의 음악으로 광고.홍보 영상의 완성도를 높여드립니다. "
                        />
                        <UseCaseCard
                            img={useCase6}
                            audio={audio6}
                            title="축제·이벤트 음악"
                            desc="현장의 분위기를 한층 끌어올리는 신나는 사운드를 생동감있도록 만들어드립니다. 일회성음악이 무색할 정도의 퀄러티를 느껴보세요."
                        />
                    </div>
                </section>

                {/* 요금 안내 (이하는 동일) */}
                <section className="mt-[96px] text-center">
                    {/* 요금안내 섹션 */}
                    <div className="mt-[36px] flex flex-col items-center text-center">
                        <div className="text-[40px] md:text-[52px] font-bold text-white leading-none">
                            요금안내
                        </div>
                        <div className="mt-[10px] text-[36px] md:text-[36px] font-semibold text-white pt-16">
                            Our Plans
                        </div>
                        <p className="mt-[6px] text-[14px] text-white/70">
                            Choose the best plan for your needs.
                        </p>
                    </div>

                    {/* 플랜 카드 */}
                    <div className="mt-[40px] grid grid-cols-1 md:grid-cols-4 gap-[20px]">
                        <PlanCard
                            label="BASIC"
                            price="30,000원"
                            subtitle="Try us out first"
                            ctaLabel="Just Start for Barosong"
                            items={[
                                "통화연결음(비즈링)",
                                "15~30초 음원 길이 (WAV, MP3)",
                                "총 3개 샘플 제시",
                                "수정 1회",
                                "3일 이내 납품",
                                "부가세 별도",
                                "작업 착수 후에는 환불이 불가합니다.",
                            ]}
                        />
                        <PlanCard
                            label="PLUS"
                            highlight
                            price="50,000원"
                            subtitle="Start with Plus"
                            ctaLabel="Start with Plus"
                            items={[
                                "소·중 규모 매장음악, 영상 CM송",
                                "30초 ~ 1분 음원 길이 (WAV, MP3)",
                                "총 3개 샘플 제시",
                                "수정 1회",
                                "3일 이내 납품",
                                "부가세 별도",
                                "작업 착수 후에는 환불이 불가합니다.",
                            ]}
                        />
                        <PlanCard
                            label="VIP"
                            price="100,000원"
                            subtitle="Advance Brand Music"
                            ctaLabel="Advance Brand Music"
                            items={[
                                "선거 캠페인, 지자체 홍보, 축제",
                                "1분 ~ 1:30초 음원 길이 (WAV, MP3)",
                                "총 5개 샘플 제시",
                                "수정 3회 · 고품질 믹싱",
                                "5일 이내 납품",
                                "부가세 별도",
                                "작업 착수 후에는 환불이 불가합니다.",
                            ]}
                        />
                        <PlanCard
                            label="Special"
                            price="별도문의"
                            subtitle="Professional Music"
                            ctaLabel="Professional Music"
                            items={[
                                "모든 종류의 음악 제작",
                                "음원 길이 협의 (WAV, MP3)",
                                "총 5개 샘플 제시",
                                "수정 3회",
                                "유명 가수 가창 협의",
                                "부가세 별도",
                                "작업 착수 후에는 환불이 불가합니다.",
                            ]}
                        />
                    </div>

                </section>
            </div>
        </main>
    );
};

const UseCaseCard = ({ img, title, desc, audio }) => {
    const [showPlayer, setShowPlayer] = useState(false);

    const handleShowPlayer = () => {
        setShowPlayer(true); // 클릭 시 컨트롤러로 전환
    };

    return (
        <div className="flex flex-col items-center bg-[#151018] rounded-[14px] overflow-hidden shadow-md">
            <img src={img} alt={title} className="w-full object-cover" />

            <div className="px-[14px] pt-[14px] pb-[18px] w-full">
                <h4 className="text-[20px] font-semibold text-[#f5eaff] mb-[6px] text-center pb-4">
                    {title}
                </h4>
                <p className="text-[16px] leading-[18px] text-[#c0b3cf] mb-[10px] text-center pb-4">
                    {desc}
                </p>

                {showPlayer ? (
                    <div className="flex items-center justify-center">
                        <audio
                            src={audio}
                            controls
                            autoPlay
                            className="w-full"
                        >
                            브라우저에서 오디오 태그를 지원하지 않습니다.
                        </audio>
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <button
                            onClick={handleShowPlayer}
                            className="px-[18px] py-[8px] rounded-xl bg-[#b52aff] text-[11px] font-semibold hover:bg-[#c956ff] transition-colors"
                        >
                            샘플음원 듣기
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};



// PlanCard.jsx
const PlanCard = ({ label, price, subtitle, items, highlight, ctaLabel }) => {
    const base =
        "flex flex-col justify-between h-full text-left px-[24px] pt-[24px] pb-[22px] rounded-[20px] border transition-all duration-300";
    const highlightStyle =
        "bg-[#928DD30F] border-transparent shadow-[0_0_40px_rgba(109,75,255,0.55)] scale-[1.03]";
    const normalStyle = "bg-[#050609] border-[#2a2233]";
    const labelClass = highlight
        ? "text-[20px] font-semibold text-[#928DD3] mb-[4px]"
        : "text-[20px] font-semibold text-white/60 mb-[4px]";
    const priceClass = highlight
        ? "text-[40px] font-extrabold text-[#928DD3] mb-[2px] tracking-tight"
        : "text-[40px] font-extrabold text-white mb-[2px] tracking-tight"
    const subtitleClass = highlight
        ? "text-[17px] text-[#928DD3] mb-[10px]"
        : "text-[17px] text-white/65 mb-[10px]";
    const listClass = highlight
        ? "space-y-[4px] text-[10px] leading-[16px] text-white pt-8"
        : "space-y-[4px] text-[10px] leading-[16px] text-[#FFFFFF99] pt-8"
    const checkColor = highlight ? "text-white" : "text-white";

    return (
        <div className={`${base} ${highlight ? highlightStyle : normalStyle}`}>
            <div>
                <div className={labelClass}>{label}</div>
                <div className={priceClass}>{price}</div>
                <div className={subtitleClass}>{subtitle}</div>
                {ctaLabel && (
                    <button
                        className={`mt-[18px] w-full h-[40px] rounded-2xl text-[16px] font-bold flex items-center justify-center
          ${highlight
                                ? "bg-[#928DD3] text-black"
                                : "bg-black text-white border border-white-1 hover:bg-white/10"
                            }`}
                    >
                        {ctaLabel}
                    </button>
                )}
                <ul className={listClass}>
                    {items.map((it, idx) => (
                        <li key={idx} className="flex gap-[6px]">
                            <span className={`${checkColor}`}>✓</span>
                            <span>{it}</span>
                        </li>
                    ))}
                </ul>
            </div>


        </div>
    );
};

export default Content;
