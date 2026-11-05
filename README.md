# Portfolio

> 사람들의 삶을 윤택하게 만들어주는 로봇공학자를 꿈꿉니다.

전민수 (한양대학교 융합전자공학부) 포트폴리오 사이트

**🔗 https://jms1005.github.io/portfolio/**

## About

사람들의 삶을 윤택하게 만들어주는 로봇공학자를 꿈꾸는 전민수의 개인 포트폴리오 사이트입니다. 회로 설계부터 임베디드 프로그래밍, 반도체까지 하드웨어와 소프트웨어를 넘나들며 쌓아 온 공부와 프로젝트를 담았습니다. 자기소개, 기술 스택, 프로젝트, 연락처를 한 페이지에 담은 싱글 페이지 반응형 웹사이트입니다.

## Tech Stack

- **HTML5** — 시맨틱 마크업
- **CSS3** — Flexbox/Grid 기반 반응형 레이아웃, Scroll-reveal 애니메이션
- **JavaScript (Vanilla)** — 프레임워크 없이 순수 JS로 구현
  - `IntersectionObserver` 기반 스크롤 reveal 애니메이션
  - 모바일 대응 네비게이션 토글
- **[PDF.js](https://mozilla.github.io/pdf.js/)** (CDN) — 프로젝트 발표자료(PDF)를 페이지 이탈 없이 모달에서 바로 넘겨볼 수 있는 뷰어 구현
- **Google Fonts** — IBM Plex Sans / IBM Plex Sans KR
- **GitHub Pages** — 정적 사이트 배포

## Features

- 반응형 레이아웃 (모바일 햄버거 메뉴 포함)
- 스크롤 시 섹션/카드 요소가 순차적으로 나타나는 reveal 애니메이션
- 프로젝트 카드 클릭 시 PDF 슬라이드를 페이지 넘김·키보드(←/→)·터치 스와이프로 볼 수 있는 인앱 PDF 뷰어
- 접근성을 고려한 ARIA 속성 적용 (메뉴, 모달 등)

## Project Structure

```
├── index.html          # Jeonminsoo.html로 즉시 리다이렉트
├── Jeonminsoo.html      # 메인 포트폴리오 페이지
├── styles.css           # 전체 스타일시트
├── script.js            # 네비게이션, 스크롤 애니메이션, PDF 뷰어 로직
└── assets/
    ├── GRUTT.pdf              # GRUTT 프로젝트 발표자료
    ├── project-grutt.png      # GRUTT 프로젝트 썸네일
    ├── project-pedd.png       # LED PEDD 분석기 시스템 블록도
    └── project-knock2fa.png   # knock2fa 시스템 블록도
```

## Sections

1. **About** — 자기소개 및 학력
2. **Skills** — 사용 언어(C, Java, Verilog, Python), 도구(Git, Microchip Studio, AVR/ATmega328P, Arduino, Visual Studio, VS Code), 관심 분야(임베디드 시스템, 베어메탈 펌웨어, 하드웨어 설계, 반도체, 센서 신호처리, 게이미피케이션)
3. **Projects**
   - [LED PEDD 액체 광학 분석기](https://github.com/jms1005/COSS_LED_PEDD_analyzer) — 2026 COSS 차세대반도체 MCU 응용 경진대회 출품작. LED를 발광·검출 소자로 함께 쓰는 PEDD 방식으로 액체 시료를 판별하는 ATmega328P 베어메탈 시스템
   - [knock2fa](https://github.com/jms1005/COSS_KNOCK2FA) — 버튼 시퀀스(지식)와 노크 리듬(행동)을 서로 다른 주변장치에서 독립적으로 읽어 이중 인증하는 잠금 시스템
   - [GRUTT](https://github.com/gyuwon000921/grutt) — 반려식물 게이미피케이션 플랫폼 (센서 기반 스마트 화분 하드웨어 설계 및 사용자 플랫폼 개발)
4. **Contact** — 이메일, GitHub

## Deployment

GitHub Pages를 통해 정적으로 배포되어 있으며, `main` 브랜치에 push하면 자동으로 반영됩니다.
