---
version: beta
name: "Pig & Hen"
description: "피그앤헨 본사 비주얼 언어를 따르는 한국어 브랜드 사이트"
colors:
  black: "#0a0a0a"
  white: "#ffffff"
  cloud: "#f1f1ef"
  stone: "#d9d9d5"
  gray: "#6e6e6a"
typography:
  body:
    fontFamily: "Helvetica Neue, Helvetica, Arial, Pretendard, Noto Sans KR, Apple SD Gothic Neo, sans-serif"
rounded:
  DEFAULT: "0px"
spacing:
  page-max: "1600px"
components:
  button: {}
  navigation: {}
  product-card: {}
  story-card: {}
---

# Pig & Hen Design System

## Creative North Star

피그앤헨 본사 사이트의 캠페인 화보와 제품 카탈로그 사이 균형을 한국어 화면에 옮긴다. 흑백과 밝은 회색, 굵고 압축된 산세리프 제목, 각진 버튼, 화면을 크게 차지하는 주얼리 사진이 핵심이다.

## Context

- 한국어 방문자에게 브랜드 역사와 대표 제품을 소개하는 정적 브랜드 사이트다.
- 본사의 현재 로고 SVG와 Shopify CDN 사진 자산을 사용한다.
- 제품·가격·연락처 중 확정되지 않은 정보는 명시적으로 임시 상태를 표시한다.
- 모바일은 사진을 먼저 보여주고, 콘텐츠와 행동 버튼은 한 열로 쌓는다.

## Visual language

- 색상은 `black`, `white`, `cloud`를 주축으로 하며 컬러 장식은 사진 안에서만 허용한다.
- 모든 제목과 본문에 현대적인 산세리프를 사용한다. 장식적 세리프는 사용하지 않는다.
- 카드, 버튼, 필터는 직선 모서리와 1px 경계선을 사용한다. 그림자와 유리 효과는 쓰지 않는다.
- 사진은 4:5 제품 컷, 넓은 캠페인 컷, 세로 에디토리얼 컷으로 역할을 구분한다.
- 영어는 짧은 카테고리·슬로건 레이블로만 사용하고 설명은 한국어로 제공한다.

## Layout and behavior

- 데스크톱 헤더는 흰 배경의 공식 워드마크와 중앙 내비게이션으로 구성한다.
- 히어로는 밝은 회색 카피 영역과 캠페인 사진을 나란히 배치한다.
- 대표 카테고리는 사진 3열, 제품은 4열이며 760px 이하에서 한두 열로 축소한다.
- 모바일 메뉴는 전체 화면 패널이며 Escape 키로 닫고 토글로 포커스를 돌려준다.
- 포커스는 파란색 3px 외곽선으로 명확히 표시하고, 모션 축소 설정에서는 등장 효과를 제거한다.

## Do / Don't

- **Do:** 공식 로고 비율과 여백을 보존한다.
- **Do:** 제품과 공방의 실제 사진을 화면의 주인공으로 둔다.
- **Do:** 짧은 대문자 레이블과 한국어 본문의 위계를 분명히 한다.
- **Don't:** 청록·황동·녹슨 오렌지 팔레트나 클래식 세리프를 다시 핵심 스타일로 사용하지 않는다.
- **Don't:** 둥근 카드, 장식용 그래픽, 불필요한 배지와 그림자를 추가하지 않는다.
