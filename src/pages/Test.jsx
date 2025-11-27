import React, { useEffect, useMemo, useState } from "react";
import useSectionLog from "../hooks/useSectionLog";
import LogBox from "../components/LogBox";
import { addAppMessageListener, postToApp } from "../bridges/appBridge";

const label = { fontSize: 13, color: "#555" };
const value = { fontWeight: 700, color: "#111" };
const Box = ({ title, children }) => (
    <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 13, color: "#333" }}>{children}</div>
    </div>
);

function fmt(ts) {
    if (!ts) return "—";
    try { return new Date(ts).toLocaleString(); } catch { return String(ts); }
}

export default function IapBridgePage() {
    // 섹션 전용 로그 (IAP 관련 App→Web 메시지만)
    const { logs, clear, pushLocal } = useSectionLog(
        [
            "IAP_BUSY",
            "IAPINFO",
            "PURCHASE_PENDING_FINISH",
            "SUBSCRIPTION_PENDING_FINISH",
            "PURCHASE_RESULT",
            "SUBSCRIPTION_RESULT",
        ],
        200
    );

    // 테스트용 상품 ID (웹=서버가 어떤 product_id로 스타트 보낼지)
    const [oneTimeProductId, setOneTimeProductId] = useState("wm_basic_n");
    const [subProductId, setSubProductId] = useState("wm_standard_m");

    // 앱이 알려준 현재 Busy 상태 / IAP정보
    const [busyInfo, setBusyInfo] = useState(null);
    const [iapInfo, setIapInfo] = useState(null);

    // 현재 대기 중인 결제(서버 검증 전 상태)
    const [pendingOneTime, setPendingOneTime] = useState(null); // { product_id, transaction_id, at }
    const [pendingSub, setPendingSub] = useState(null); // { product_id, transaction_id, at }

    // 최근 결과
    const [lastPurchaseResult, setLastPurchaseResult] = useState(null);
    const [lastSubscriptionResult, setLastSubscriptionResult] = useState(null);

    // App → Web IAP 이벤트 수신
    useEffect(() => {
        const unbind = addAppMessageListener((msg) => {
            if (!msg?.type) return;
            const p = msg.payload || {};

            if (msg.type === "IAP_BUSY") {
                const info = {
                    value: !!p.value,
                    kind: p.kind || null,
                    sku: p.sku || null,
                    at: p.at || Date.now(),
                };
                setBusyInfo(info);
                pushLocal("IAP_BUSY", info);
                return;
            }

            if (msg.type === "IAPINFO") {
                const info = {
                    platform: p.platform,
                    connected: !!p.connected,
                    isLoading: !!p.isLoading,
                    subscription: p.subscription || null,
                    latest_purchase: p.latest_purchase || null,
                    last_error: p.last_error || null,
                    ts: p.ts || Date.now(),
                };
                setIapInfo(info);
                pushLocal("IAPINFO", info);
                return;
            }

            if (msg.type === "PURCHASE_PENDING_FINISH") {
                const info = {
                    platform: p.platform || "ios",
                    one_time: !!p.one_time,
                    product_id: p.product_id,
                    transaction_id: p.transaction_id,
                    at: p.at || Date.now(),
                };
                setPendingOneTime(info);
                pushLocal("PURCHASE_PENDING_FINISH", info);
                return;
            }

            if (msg.type === "SUBSCRIPTION_PENDING_FINISH") {
                const info = {
                    platform: p.platform || "ios",
                    product_id: p.product_id,
                    transaction_id: p.transaction_id,
                    at: p.at || Date.now(),
                };
                setPendingSub(info);
                pushLocal("SUBSCRIPTION_PENDING_FINISH", info);
                return;
            }

            if (msg.type === "PURCHASE_RESULT") {
                const info = {
                    platform: p.platform || "ios",
                    success: !!p.success,
                    one_time: !!p.one_time,
                    product_id: p.product_id,
                    transaction_id: p.transaction_id,
                    error_code: p.error_code,
                    message: p.message,
                    at: Date.now(),
                };
                setLastPurchaseResult(info);
                // 성공/실패 결과는 대기건도 초기화해준다 (서버 입장: 케이스 종료)
                setPendingOneTime(null);
                pushLocal("PURCHASE_RESULT", info);
                return;
            }

            if (msg.type === "SUBSCRIPTION_RESULT") {
                const info = {
                    platform: p.platform || "ios",
                    success: !!p.success,
                    product_id: p.product_id,
                    transaction_id: p.transaction_id,
                    error_code: p.error_code,
                    message: p.message,
                    at: Date.now(),
                };
                setLastSubscriptionResult(info);
                setPendingSub(null);
                pushLocal("SUBSCRIPTION_RESULT", info);
                return;
            }
        });

        return () => unbind?.();
    }, [pushLocal]);

    // Web → App 메시지 송신 헬퍼
    const sendToApp = (type, payload = {}) => {
        const msg = { type, payload };
        postToApp(msg);
        pushLocal("WEB→APP", { type, payload });
    };

    // 단건 결제 시작
    const handleStartOneTime = () => {
        if (!oneTimeProductId) return;
        sendToApp("START_ONE_TIME_PURCHASE", { product_id: oneTimeProductId });
    };

    // 구독 결제 시작
    const handleStartSubscription = () => {
        if (!subProductId) return;
        sendToApp("START_SUBSCRIPTION", { product_id: subProductId });
    };

    // 서버 검증 OK → 단건 finish 지시
    const handleFinishOneTimeSuccess = () => {
        if (!pendingOneTime?.transaction_id || !pendingOneTime?.product_id) return;
        sendToApp("FINISH_ONE_TIME_PURCHASE", {
            product_id: pendingOneTime.product_id,
            transaction_id: pendingOneTime.transaction_id,
        });
    };

    // 서버 검증 NG → 단건 실패 결과 직접 통보 (앱은 finishTransaction 안 함)
    const handleFinishOneTimeFail = () => {
        if (!pendingOneTime?.product_id) return;
        const payload = {
            platform: "ios",
            success: false,
            one_time: true,
            product_id: pendingOneTime.product_id,
            error_code: "verification_failed",
            message: "서버 검증 실패(테스트용)",
        };
        sendToApp("PURCHASE_RESULT", payload);
        setPendingOneTime(null);
    };

    // 서버 검증 OK → 구독 finish 지시
    const handleFinishSubSuccess = () => {
        if (!pendingSub?.transaction_id || !pendingSub?.product_id) return;
        sendToApp("FINISH_SUBSCRIPTION", {
            product_id: pendingSub.product_id,
            transaction_id: pendingSub.transaction_id,
        });
    };

    // 서버 검증 NG → 구독 실패 결과 직접 통보
    const handleFinishSubFail = () => {
        if (!pendingSub?.product_id) return;
        const payload = {
            platform: "ios",
            success: false,
            product_id: pendingSub.product_id,
            error_code: "verification_failed",
            message: "서버 검증 실패(테스트용)",
        };
        sendToApp("SUBSCRIPTION_RESULT", payload);
        setPendingSub(null);
    };

    // IAPINFO 요청
    const handleRequestIapInfo = () => {
        sendToApp("GET_IAPINFO", { at: Date.now() });
    };

    const busyBadge = useMemo(() => {
        if (!busyInfo) return "unknown";
        if (!busyInfo.value) return "idle";
        return `${busyInfo.kind || "busy"} (${busyInfo.sku || "-"})`;
    }, [busyInfo]);

    return (
        <div style={{ padding: "10px 4px" }}>
            <div
                style={{
                    background: "#f7f7f7",
                    padding: "12px 16px",
                    borderRadius: 8,
                    fontSize: 14,
                    color: "#444",
                    marginBottom: 16,
                }}
            >
                <b>IAP 브리지 테스트</b>
                <br />
                이 섹션은 <b>웹이 서버 역할</b>을 하며, App과 다음 메시지를 주고 받는 플로우를 테스트합니다.
                <div style={{ marginTop: 8 }}>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                        <li>Web → App: START_* / FINISH_* 를 눌러서 요청</li>
                        <li>App → Web: *_PENDING_FINISH / *_RESULT / IAP_BUSY / IAPINFO 수신</li>
                        <li>서버 검증 OK/NG를 수동으로 조작해 전체 흐름을 검증할 수 있습니다.</li>
                    </ul>
                </div>
            </div>

            <div style={{ display: "grid", gap: 12, marginBottom: 12 }}>
                {/* 현재 상태 */}
                <Box title="현재 세션 상태">
                    <div style={{ marginBottom: 6 }}>
                        <span style={label}>IAP Busy:</span>{" "}
                        <span style={value}>{busyBadge}</span>
                    </div>
                    <div style={{ marginBottom: 6 }}>
                        <span style={label}>최근 단건 결과:</span>{" "}
                        <span style={value}>
                            {lastPurchaseResult
                                ? `${lastPurchaseResult.success ? "성공" : "실패"} · ${lastPurchaseResult.product_id || "-"}`
                                : "—"}
                        </span>
                    </div>
                    <div>
                        <span style={label}>최근 구독 결과:</span>{" "}
                        <span style={value}>
                            {lastSubscriptionResult
                                ? `${lastSubscriptionResult.success ? "성공" : "실패"} · ${lastSubscriptionResult.product_id || "-"}`
                                : "—"}
                        </span>
                    </div>
                </Box>

                {/* 상품 & 시작 버튼 */}
                <Box title="결제 시작 (Web → App)">
                    <div style={{ marginBottom: 10 }}>
                        <div style={{ marginBottom: 4, fontSize: 12 }}>단건 상품 ID</div>
                        <input
                            value={oneTimeProductId}
                            onChange={(e) => setOneTimeProductId(e.target.value)}
                            style={{ width: "100%", padding: 6, fontSize: 13, marginBottom: 6 }}
                            placeholder="wm_basic_n"
                        />
                        <button
                            type="button"
                            onClick={handleStartOneTime}
                            style={{
                                padding: "6px 12px",
                                fontSize: 13,
                                borderRadius: 8,
                                border: "1px solid #ddd",
                                background: "#fff",
                                cursor: "pointer",
                                marginRight: 8,
                            }}
                        >
                            START_ONE_TIME_PURCHASE
                        </button>
                    </div>

                    <div>
                        <div style={{ marginBottom: 4, fontSize: 12 }}>구독 상품 ID</div>
                        <input
                            value={subProductId}
                            onChange={(e) => setSubProductId(e.target.value)}
                            style={{ width: "100%", padding: 6, fontSize: 13, marginBottom: 6 }}
                            placeholder="wm_standard_m"
                        />
                        <button
                            type="button"
                            onClick={handleStartSubscription}
                            style={{
                                padding: "6px 12px",
                                fontSize: 13,
                                borderRadius: 8,
                                border: "1px solid #ddd",
                                background: "#fff",
                                cursor: "pointer",
                            }}
                        >
                            START_SUBSCRIPTION
                        </button>
                    </div>
                </Box>

                {/* Pending 상태 & Finish 시나리오 */}
                <Box title="서버 검증 & Finish 시나리오 (App → Web → App)">
                    <div style={{ marginBottom: 12, fontWeight: 600, fontSize: 13 }}>단건(Consumable)</div>
                    <div style={{ marginBottom: 6 }}>
                        <span style={label}>대기 상태:</span>{" "}
                        <span style={value}>
                            {pendingOneTime
                                ? `${pendingOneTime.product_id} · tx=${pendingOneTime.transaction_id}`
                                : "없음"}
                        </span>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <button
                            type="button"
                            onClick={handleFinishOneTimeSuccess}
                            disabled={!pendingOneTime}
                            style={{
                                padding: "6px 10px",
                                fontSize: 12,
                                borderRadius: 8,
                                border: "1px solid #16a34a",
                                background: pendingOneTime ? "#dcfce7" : "#f5f5f5",
                                color: pendingOneTime ? "#166534" : "#999",
                                cursor: pendingOneTime ? "pointer" : "default",
                                marginRight: 6,
                            }}
                        >
                            서버 검증 OK → FINISH_ONE_TIME_PURCHASE
                        </button>
                        <button
                            type="button"
                            onClick={handleFinishOneTimeFail}
                            disabled={!pendingOneTime}
                            style={{
                                padding: "6px 10px",
                                fontSize: 12,
                                borderRadius: 8,
                                border: "1px solid #dc2626",
                                background: pendingOneTime ? "#fee2e2" : "#f5f5f5",
                                color: pendingOneTime ? "#991b1b" : "#999",
                                cursor: pendingOneTime ? "pointer" : "default",
                            }}
                        >
                            서버 검증 실패 → PURCHASE_RESULT 실패 전송
                        </button>
                    </div>

                    <div style={{ marginTop: 8, marginBottom: 8, borderTop: "1px dashed #eee" }}></div>

                    <div style={{ marginBottom: 12, fontWeight: 600, fontSize: 13 }}>구독(Subscription)</div>
                    <div style={{ marginBottom: 6 }}>
                        <span style={label}>대기 상태:</span>{" "}
                        <span style={value}>
                            {pendingSub
                                ? `${pendingSub.product_id} · tx=${pendingSub.transaction_id}`
                                : "없음"}
                        </span>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleFinishSubSuccess}
                            disabled={!pendingSub}
                            style={{
                                padding: "6px 10px",
                                fontSize: 12,
                                borderRadius: 8,
                                border: "1px solid #16a34a",
                                background: pendingSub ? "#dcfce7" : "#f5f5f5",
                                color: pendingSub ? "#166534" : "#999",
                                cursor: pendingSub ? "pointer" : "default",
                                marginRight: 6,
                            }}
                        >
                            서버 검증 OK → FINISH_SUBSCRIPTION
                        </button>
                        <button
                            type="button"
                            onClick={handleFinishSubFail}
                            disabled={!pendingSub}
                            style={{
                                padding: "6px 10px",
                                fontSize: 12,
                                borderRadius: 8,
                                border: "1px solid #dc2626",
                                background: pendingSub ? "#fee2e2" : "#f5f5f5",
                                color: pendingSub ? "#991b1b" : "#999",
                                cursor: pendingSub ? "pointer" : "default",
                            }}
                        >
                            서버 검증 실패 → SUBSCRIPTION_RESULT 실패 전송
                        </button>
                    </div>
                </Box>

                {/* IAPINFO 조회 */}
                <Box title="IAPINFO 확인">
                    <button
                        type="button"
                        onClick={handleRequestIapInfo}
                        style={{
                            padding: "6px 10px",
                            fontSize: 12,
                            borderRadius: 8,
                            border: "1px solid #ddd",
                            background: "#fff",
                            cursor: "pointer",
                            marginBottom: 8,
                        }}
                    >
                        GET_IAPINFO 요청 (Web → App)
                    </button>
                    <div style={{ fontSize: 12, color: "#555" }}>
                        {iapInfo ? (
                            <pre style={{ fontSize: 11, whiteSpace: "pre-wrap" }}>
                                {JSON.stringify(iapInfo, null, 2)}
                            </pre>
                        ) : (
                            "아직 IAPINFO 응답 없음"
                        )}
                    </div>
                </Box>
            </div>

            {/* IAP 섹션 전용 로그 */}
            <LogBox title="IAP 브리지 로그(App ↔ Web)" logs={logs} onClear={clear} />
        </div>
    );
}
2. App.jsx 쪽에 붙이는 방법 (간단 스니펫)
1) 페이지 임포트
js
코드 복사
// App.jsx 상단
import IapBridgePage from "./pages/IapBridgePage";
2) ALLOWED_TYPES 확장
ALLOWED_TYPES에 아래 타입들 추가해줘:


const ALLOWED_TYPES = new Set([
  "PUSH_EVENT",
  "PUSH_TOKEN",
  "BACK_REQUEST",
  "SUBSCRIPTION_RESULT",
  "RESTORE_RESULT",
  "PERMISSION_STATUS",
  "SIGNIN_RESULT",
  "SIGNOUT_RESULT",
  "SPLASH_STATE",
  "OFFLINE_FALLBACK",
  "RETRY_TRIGGER",
  "WEB_READY_ACK",
  "WEB_ERROR_ACK",
  "SHARE_RESULT",
  "DOWNLOAD_RESULT",

  // IAP 관련 추가
  "IAP_BUSY",
  "IAPINFO",
  "PURCHASE_PENDING_FINISH",
  "SUBSCRIPTION_PENDING_FINISH",
  "PURCHASE_RESULT",
  "SUBSCRIPTION_RESULT",
]);