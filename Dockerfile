# 1. Node.js 기반으로 빌드를 먼저 진행
FROM node:16-alpine as build-stage

# 작업 디렉토리 설정
WORKDIR /app

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

# Nginx 설정 파일 복사
COPY ./nginx/nginx.conf /etc/nginx/nginx.d

# 빌드된 정적 파일 복사 (이 부분은 첫 번째 단계에서 생성된 dist 폴더)
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Nginx의 기본 포트를 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
