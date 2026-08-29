---
version: alpha
name: "Pig & Hen"
description: "암스테르담 운하의 구조감과 금속 공예의 물성을 결합한 한국어 주얼리 브랜드 사이트"
colors:
  ink: "#102a30"
  canal: "#173b42"
  canal-deep: "#0d292f"
  paper: "#edf0ea"
  mist: "#d9dfda"
  brass: "#c5a45c"
  rust: "#944934"
  white: "#f9faf7"
typography:
  display:
    fontFamily: "Iowan Old Style, Palatino Linotype, Noto Serif KR, Georgia, serif"
  body:
    fontFamily: "Pretendard, SUIT, Noto Sans KR, Apple SD Gothic Neo, system-ui, sans-serif"
rounded:
  DEFAULT: "0px"
  circle: "999px"
spacing:
  section-gap: "clamp(6rem, 10vw, 10rem)"
  page-max: "1440px"
components:
  button: {}
  navigation: {}
  product-card: {}
  story-row: {}
---

# Pig & Hen Design System

## Overview

### Creative North Star

비 오는 날의 암스테르담 운하, 오래된 교량의 리벳, 공방 책상 위 황동 체인을 한 화면에 옮긴다. 따뜻한 베이지 중심의 전형적인 럭셔리 쇼핑몰보다 청회색 도시성과 금속의 질감을 전면에 둔다.

### Product context and register

- **Audience and primary job:** 유럽 감성의 핸드메이드 주얼리를 찾는 한국어 사용자에게 브랜드 인상과 대표 제품을 소개한다.
- **Target market(s) and evidence:** 한국어 웹 방문자를 우선한다. 실제 판매·배송 정책은 아직 정해지지 않아 표기하지 않는다.
- **Locale(s) and language policy:** `ko-KR` 중심, 브랜드명과 공방의 지역성만 영어를 보조적으로 사용한다.
- **Usage scene:** 모바일 탐색을 우선하고, 데스크톱에서는 에디토리얼한 여백과 큰 활자를 활용한다.
- **Register:** 브랜드·콘텐츠 사이트.
- **Memorable signature:** 세로 프레임 안에서 연결되는 황동 체인과 암스테르담 좌표.
- **Restraint:** 제품 설명, 가격, 연락처 영역은 장식을 줄여 교체와 읽기가 쉽도록 한다.
- **Anti-references:** 베이지 배경과 테라코타 버튼의 범용 럭셔리 템플릿, 과도한 그라디언트, 유리 효과, 둥근 카드 묶음을 피한다.
- **Token ownership/runtime mapping:** 이 문서가 시각 토큰의 기준이며 `styles.css`의 `:root` 변수가 동일 값을 구현한다.

## Colors

운하색 `canal`과 `canal-deep`이 브랜드의 주 배경, `paper`와 `mist`가 읽기 쉬운 중성 면, `brass`가 금속 및 포커스, `rust`가 공방의 온기를 나타낸다. 일반 텍스트는 `ink`, 역상 텍스트는 `white`를 사용한다.

## Typography

큰 브랜드 헤드라인과 제품명에는 고전적이되 날렵한 `display` 스택을 쓴다. 한국어 본문과 인터랙션은 화면 가독성이 높은 `body` 스택을 쓴다. 본문은 최소 16px, 한국어 행간은 1.7을 기본으로 하며 긴 문장은 `word-break: keep-all`로 어절을 보호한다.

## Layout

최대 1440px 프레임 안에서 홈은 비대칭 2열, 제품은 3열, 소개와 연락은 2열로 구성한다. 900px에서 내비게이션과 주요 그리드를 재배치하고 620px에서는 모든 핵심 콘텐츠를 한 열로 만든다. 이미지 영역은 `aspect-ratio`로 높이를 예약해 레이아웃 이동을 막는다.

## Elevation & Depth

정적 카드에는 그림자와 떠 있는 효과를 쓰지 않는다. 제품 금속 오브젝트에만 작은 드롭 섀도를 허용해 물성을 표현한다. 헤더는 스크롤 후 얕은 그림자와 흐림으로 콘텐츠와 분리한다.

## Shapes

기본 컨테이너와 버튼은 직선 모서리다. 원형은 브랜드 마크와 주얼리 오브젝트처럼 실제 의미가 있는 곳에서만 쓴다. 가는 1px 분할선으로 편집 디자인의 리듬을 만든다.

## Components

### Foundational visual states

모든 링크와 버튼은 호버·포커스·활성 상태를 가진다. 포커스는 황동색 3px 외곽선으로 표시한다. 모션 축소 선호 시 모든 등장 모션과 부드러운 스크롤을 제거한다.

### Buttons and actions

주요 행동은 황동 배경의 직사각형 버튼, 보조 행동은 밑줄형 텍스트 링크다. 최소 터치 높이는 44px이며 클릭 시 크기가 바뀌지 않는다.

### Navigation and data display

데스크톱 내비게이션은 얇은 밑줄로 현재 위치를 표시한다. 모바일 내비게이션은 전체 화면 메뉴이며 Escape로 닫고, 닫힌 뒤 토글로 포커스를 되돌린다. 제품 필터는 `aria-pressed` 상태를 제공한다.

### Forms and overlays

현재 문의는 명확한 이메일 링크를 사용하며 작동하지 않는 전송 폼을 만들지 않는다. 모바일 메뉴 외 별도 오버레이는 없다.

### Iconography

별도 아이콘 세트를 의존하지 않는다. 외부 이동 표시는 텍스트와 단순 화살표 문자를 함께 사용하고 접근 가능한 이름에서 의미를 보완한다.

### Motion

스크롤 등장 모션은 700ms 이내의 단일 방향 이동만 쓴다. 제품 필터는 250ms 이내로 전환한다. 장식적인 무한 반복 애니메이션은 사용하지 않는다.

### Content and data visualization

한국어 문장은 차분하고 구체적인 존댓말을 사용한다. 브랜드 역사와 제작 정보는 피그앤헨 공식 본사 자료를 근거로 쓰고, 확정되지 않은 제품명·가격·이메일에는 임시 문구임을 화면에서 직접 알린다.

## Do's and Don'ts

- **Do:** 운하의 청회색과 황동의 대비를 브랜드의 핵심 기억점으로 유지한다.
- **Do:** 실제 사진으로 교체해도 흔들리지 않는 이미지 비율과 정보 구조를 지킨다.
- **Don't:** 장식용 둥근 카드, 무의미한 숫자 배지, 과도한 모션을 추가하지 않는다.
- **Don't:** 임시 가격이나 연락처를 실제 영업 정보처럼 숨겨 표현하지 않는다.
