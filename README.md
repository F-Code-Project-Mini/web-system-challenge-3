# F-Code Challenge 3 Recruitment Project (F21)

## Overview

Dự án được xây dựng phục vụ kỳ tuyển quân khóa F21 của CLB F-Code. Hệ thống bao gồm backend (Node.js/Prisma) và frontend (React/Next.js). Toàn bộ hạ tầng phụ trợ được quản lý qua Docker.

## Project Structure

- /backend: API Service và Database Schema.
- /frontend: Giao diện người dùng.
- /root: Cấu hình môi trường phát triển chung (Prettier, Docker Compose).

## Prerequisites

Yêu cầu máy cài đặt sẵn:

- Node.js (LTS version)
- Docker & Docker Compose
- Git

---

## 1. Global Configuration

Tại thư mục gốc, cài đặt các package phục vụ việc định dạng code (Prettier) và công cụ phát triển:

```bash
npm install
```

## 2. Infrastructure Setup

Khởi chạy container cho cơ sở dữ liệu và các dịch vụ đi kèm:

```bash
docker compose up -d
```

- Quản trị cơ sở dữ liệu: http://localhost:8080
- Username: challenge_3_fcode
- Password: challenge_3_fcode

## 3. Backend Setup

Di chuyển vào thư mục backend:

```bash
cd backend
npm install
```

### Database & Schema

Thực hiện các lệnh sau để thiết lập cơ sở dữ liệu:

1. **npx prisma db push**: Đẩy cấu hình từ schema vào database. Lệnh này đồng bộ trực tiếp mà không cần tạo file migration, phù hợp cho giai đoạn phát triển prototype.
2. **npx prisma generate**: Khởi tạo Prisma Client. Bước này tạo ra các kiểu dữ liệu (Typescript types) giúp IDE có thể gợi ý code (Intellisense).

### Environment Variables

Sao chép `.env.example` để tạo cấu hình cho từng môi trường:

- `.env.development`
- `.env.production`

_Lưu ý: Kiểm tra và cập nhật biến **NODE_ENV** cho chính xác với mục đích sử dụng._

### Run Project

```bash
npm run dev
```

## 4. Frontend Setup

Di chuyển vào thư mục frontend:

```bash
cd frontend
npm install
```

### Environment Variables

Tạo các file `.env.development` và `.env.production`. Cập nhật các biến môi trường (như API URL) bên trong các file này.

### Run Project

```bash
npm run dev
```

---

## Maintenance & Common Commands

### Code Formatting

Dự án sử dụng Prettier để thống nhất phong cách viết mã. Trước khi commit, hãy thực hiện lệnh sau tại thư mục gốc:

```bash
npm run format
```

### Docker Management

- Dừng các dịch vụ: `docker compose stop`
- Gỡ bỏ hoàn toàn container: `docker compose down`

### Prisma Troubleshooting

Nếu gặp lỗi không nhận diện được kiểu dữ liệu hoặc thay đổi schema không được áp dụng, hãy thực hiện lại bộ lệnh:

```bash
npx prisma db push
npx prisma generate
```

---

## Author

Phạm Hoàng Tuấn

Vai trò:

- Leader Technical Recruitment 2025
- Leader Challenge 3
- Subleader Challenge 1

---

### Các điểm trọng tâm cho tương lai:

- **Prisma:** Luôn chạy `generate` sau khi thay đổi schema để tránh lỗi Type.
- **Docker:** Nếu thay đổi cấu hình trong file `docker-compose.yml`, cần chạy lại `docker compose up -d` để áp dụng.
- **Environment:** Không được push các file `.env.development` hoặc `.env.production` lên GitHub.
