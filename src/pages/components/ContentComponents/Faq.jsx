// src/components/Faq.jsx
import React, { useState } from "react";

const FAQ_ITEMS = [
    {
        question: "수정은 몇 번까지 가능한가요?",
        answer:
            "A. 기본 1회 무료 수정이 포함됩니다. 추가 수정은 소정의 비용이 발생할 수 있으며, 멜로디·창곡 변경은 새로운 프로젝트로 간주됩니다.",
    },
    {
        question: "제작된 음악이 마음에 들지 않아요.",
        answer:
            "A. 샘플 단계에서 충분히 피드백을 주시면 수정해드립니다. 최종 납품 후에는 환불이 어렵지만, 보완 또는 리믹스를 제안드릴 수 있습니다.",
    },
    {
        question: "환불이 가능한가요?",
        answer:
            "A. 음원은 주문제작 서비스로 작업 시작 후 환불이 불가합니다. 단, 제작 전 단계에서는 취소 가능하며, 파일 오류 발생 시 재납품됩니다.",
    },
    {
        question: "연예인이나 보컬 섭외도 가능한가요?",
        answer:
            "A. 네, 가능합니다. 전문 녹음 스튜디오 및 연예인 보컬 네트워크를 통해 브랜드송, 캠페인송 목적에 맞는 아티스트를 제안드립니다. 또한 원하시는 아티스트 섭외도 가능합니다. (별도 제작비 산정)",
    },
    {
        question: "가사도 알아서 써주시나요?",
        answer:
            "A. 네, 가능합니다. 주제나 키워드만 주시면 AI와 작사가가 함께 자연스럽고 설득력 있는 가사를 완성합니다.",
    },
    {
        question: "상업적 사용이 가능한가요?",
        answer:
            "A. 네, 가능합니다. 매장, 광고, 유튜브, 캠페인 등 상업적 활용이 100% 가능합니다. 단 재판매 및 무단 배포는 금지됩니다.",
    },
    {
        question: "제작된 음원의 저작권은 어떻게 되나요?",
        answer:
            "A. 구매자에게 영구적 사용권이 부여되며, 작곡가의 저작권은 유지됩니다. 필요 시 사용 허락서 발급도 가능합니다.",
    },
    {
        question: "음원 납품은 어떤 방식으로 이루어지나요?",
        answer:
            "A. 최종 납품 시 WAV, MP3 파일이 이메일 또는 메신저로 전달됩니다. 요청 시 유튜브용 MP4 포맷으로도 변환 가능합니다.",
    },
];

const Faq = () => {
    // ✅ 각 항목별로 열림 상태를 가지고, 기본값은 전부 true (모두 열림)
    const [openStates, setOpenStates] = useState(
        FAQ_ITEMS.map(() => true)
    );

    const toggle = (index) => {
        setOpenStates((prev) =>
            prev.map((opened, i) => (i === index ? !opened : opened))
        );
    };

    return (
        <section className="w-full bg-black text-white">
            <div className="max-w-[1200px] mx-auto px-[24px] py-[80px]">
                {/* 타이틀 */}
                <h2 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.02em] mb-[40px]">
                    FAQ — 자주 묻는 질문
                </h2>

                {/* 리스트 */}
                <div className="border-t border-[#333333]">
                    {FAQ_ITEMS.map((item, idx) => {
                        const isOpen = openStates[idx];
                        return (
                            <div
                                key={item.question}
                                className="border-b border-[#333333] py-[20px]"
                            >
                                {/* 질문 영역 */}
                                <button
                                    type="button"
                                    onClick={() => toggle(idx)}
                                    className="w-full flex items-center justify-between text-left"
                                >
                                    <span className="text-[24px] font-semibold">
                                        {item.question}
                                    </span>
                                    <span
                                        className={`ml-[16px] text-[20px] transition-transform ${isOpen ? "rotate-180" : ""
                                            }`}
                                    >
                                        ▾
                                    </span>
                                </button>

                                {/* 답변 영역 */}
                                {isOpen && (
                                    <p className="mt-[12px] text-[14px] leading-[1.7] text-[#d4d4d4]">
                                        {item.answer}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Faq;
