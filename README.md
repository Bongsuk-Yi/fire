# 이지자동화 FIRE (FIRE Portfolio Lab)

> **목표에서 시작하는 나만의 ETF 포트폴리오 연구소**  
> 사용자가 설정한 FIRE 목표와 투자 가정으로 목표 자산을 계산하고, 55개 ETF 데이터와 14개 거시지표를 분석하는 웹 애플리케이션입니다.

배포 URL: [https://bonsuk-yi.github.io/fire/](https://bonsuk-yi.github.io/fire/)

---

## 🌟 주요 기능

1. **1분 FIRE 나이 계산기 위저드**: 현재 나이, 은퇴 후 월 희망 생활비, 보유 자산, 월 저축액, 은퇴 희망 연령 등 5단계 입력을 통해 은퇴 가능 시점과 필요 목표 자산을 즉시 진단
2. **정밀 FIRE 계산기**: 안전 인출률(4% 룰 등), 기대수익률, 물가상승률을 반영한 실질 자산 복리 축적 및 은퇴 후 인출 시뮬레이션 테이블 제공 (브라우저 목표 저장 지원)
3. **기회비용 계산기**: 일상의 작은 소비(커피, 택시, 배달, 차량 등)를 ETF에 투자했을 때 미래에 어떤 자산과 평생 배당금이 되는지 시각화
4. **55개 ETF 분석 및 탐색기**: 미국/한국 상장 55개 ETF의 실시간 가격, 1년 총수익률, 연 배당률, 자산규모(AUM), 총보수 비용 비교 및 다자간 필터/정렬
5. **ETF 개별 상세 및 1:1 심층 비교 매트릭스**: 종목별 상세 설명 및 전략 태그, 두 ETF 간의 핵심 지표 맞대결 비교
6. **ETF 포트폴리오 연구소**: 배당성장(SCHD), 지수성장(QQQM/VOO), 커버드콜(JEPI), 채권(TLT)의 비중을 직접 조절하여 예상 배당수익률과 월 현금흐름 시뮬레이션
7. **거시경제 지표 시계열 비교**: 코스피, 다우, S&P 500, 나스닥, 니케이, 한국은행 기준금리, 달러환율, WTI유가, 비트코인, 금, 은, 부동산 매매지수 등 14개 지표 30년 시계열 비교 분석
8. **20편의 전문 FIRE 인사이트**: 경제적 자유의 본질부터 4% 룰의 한계, 수익률 순서 위험, 세금, 연금 브리지 등 실전 가이드 전문 탑재

---

## 🚀 기술 스택

- **Frontend**: React 18, Vite 6, Tailwind CSS, Lucide Icons
- **Design System**: 이지자동화 고유 색상 팔레트 (Navy, Emerald Teal, Fire Amber, Mint)
- **Data & Batch**:
  - 내장 정적 데이터셋 (55개 ETF, 14개 거시지표, 20개 아티클)
  - Python 자동화 스크립트 (`scripts/update_market_data.py`)
- **CI/CD & Deployment**: GitHub Actions (`.github/workflows/deploy.yml`, `.github/workflows/update-data.yml`), GitHub Pages

---

## 🛠️ 로컬 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev

# 3. 프로덕션 빌드 테스트
npm run build
```

---

## 🌐 GitHub Pages 서비스 활성화 방법

1. 리포지토리 `https://github.com/bonsuk-yi/fire` 로 이동합니다.
2. **Settings** -> **Pages** 메뉴로 이동합니다.
3. **Build and deployment** 항목의 **Source**를 `GitHub Actions` 로 선택합니다.
4. `main` 브랜치에 코드가 푸시되면 자동으로 빌드 및 배포되어 `https://bonsuk-yi.github.io/fire/` 에서 서비스가 활성화됩니다!
