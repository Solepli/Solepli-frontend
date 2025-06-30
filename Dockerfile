# Stage 1: Build the React application

FROM node:20-alpine AS builder
WORKDIR /app

# --build-arg로 전달받을 환경 변수를 ARG로 선언합니다.
# 실제 .env 파일에 있는 변수명으로 변경해야 합니다.
ARG VITE_MAP_CLIENT_ID
ARG VITE_API_BASE_URL
ARG VITE_MAP_STYLE_ID
ARG VITE_IMAGE_UPLOAD_MAX_SIZE
ARG VITE_KAKAO_REST_API_KEY
ARG VITE_KAKAO_REDIRECT_URI
ARG VITE_NAVER_CLIENT_ID
ARG VITE_NAVER_CLIENT_SECRET
ARG VITE_NAVER_REDIRECT_URI
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_GOOGLE_CLIENT_SECRET
ARG VITE_GOOGLE_REDIRECT_URI

# 선언한 ARG를 빌드 시점에 사용할 환경 변수로 설정합니다.
ENV VITE_MAP_CLIENT_ID=$VITE_MAP_CLIENT_ID
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_MAP_STYLE_ID=$VITE_MAP_STYLE_ID
ENV VITE_IMAGE_UPLOAD_MAX_SIZE=$VITE_IMAGE_UPLOAD_MAX_SIZE
ENV VITE_KAKAO_REST_API_KEY=$VITE_KAKAO_REST_API_KEY
ENV VITE_KAKAO_REDIRECT_URI=$VITE_KAKAO_REDIRECT_URI
ENV VITE_NAVER_CLIENT_ID=$VITE_NAVER_CLIENT_ID
ENV VITE_NAVER_CLIENT_SECRET=$VITE_NAVER_CLIENT_SECRET
ENV VITE_NAVER_REDIRECT_URI=$VITE_NAVER_REDIRECT_URI
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENT_SECRET=$VITE_GOOGLE_CLIENT_SECRET
ENV VITE_GOOGLE_REDIRECT_URI=$VITE_GOOGLE_REDIRECT_URI

COPY package.json ./
COPY package-lock.json ./ 
RUN npm install
COPY . .
# 여기서 npm run build를 실행하면, Vite가 환경변수 값을 참조하여 빌드합니다.
RUN npm run build

# Stage 2: Serve the application using Nginx

FROM nginx:1.25-alpine
# Nginx의 기본 설정을 삭제하고, 우리가 만든 설정을 복사합니다.
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Builder 스테이지에서 빌드된 결과물(정적 파일)을 Nginx의 서빙 경로로 복사합니다.
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA(Single Page Application)를 위한 설정입니다.
# 모든 요청을 index.html로 보내 React Router가 처리하도록 합니다.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]