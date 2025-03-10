# 1. Node.js 기반으로 빌드를 먼저 진행
FROM node:18-alpine as build-stage

ARG VITE_BASE_URL
ARG VITE_IMAGE_URL
ARG VITE_REGION
ARG VITE_ACCESS_KEY_ID
ARG VITE_SECRET_ACCESS_KEY

# 작업 디렉토리 설정
WORKDIR /app

RUN echo "VITE_BASE_URL=${VITE_BASE_URL}" >> /app/.env \
    && echo "VITE_IMG_BASE_URL=${VITE_IMAGE_URL}" >> /app/.env \
    && echo "VITE_AWS_REGION=${VITE_REGION}" >> /app/.env \
    && echo "VITE_ACCESS_KEY_ID=${VITE_ACCESS_KEY_ID}" >> /app/.env \
    && echo "VITE_SECRET_ACCESS_KEY=${VITE_SECRET_ACCESS_KEY}" >> /app/.env


# 패키지 파일 복사
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# 빌드 명령어 실행 (정적 파일을 dist 폴더에 생성)
RUN npm run build

# 2. Nginx 이미지 설정 (실제 배포용)
FROM nginx:1.25.1-alpine3.17-slim

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 정적 파일 복사 (이 부분은 첫 번째 단계에서 생성된 dist 폴더)
COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Nginx의 기본 포트를 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
