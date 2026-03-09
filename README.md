# 🚁 Flood Rescue Frontend

Hệ thống quản lý điều phối cứu hộ và cứu trợ lũ lụt - Frontend Application

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Mô tả

Ứng dụng web frontend cho hệ thống điều phối cứu hộ và quản lý cứu trợ trong các tình huống lũ lụt khẩn cấp. Hệ thống hỗ trợ 5 vai trò người dùng với các chức năng riêng biệt.

## ✨ Tính năng chính

### 👤 Citizen (Người dân)
- ✅ Gửi yêu cầu cứu hộ với vị trí GPS
- ✅ Xem vị trí cứu hộ trên bản đồ
- ✅ Theo dõi trạng thái yêu cầu real-time
- ✅ Xem kết quả cứu hộ

### 🎯 Rescue Coordinator (Điều phối viên)
- ✅ Tiếp nhận và xác minh yêu cầu cứu hộ
- ✅ Phân loại mức độ khẩn cấp
- ✅ Điều phối đội cứu hộ và phương tiện
- ✅ Xem tổng quan trên bản đồ

### 🚑 Rescue Team (Đội cứu hộ)
- ✅ Nhận nhiệm vụ cứu hộ được phân công
- ✅ Xem chi tiết yêu cầu và vị trí trên bản đồ
- ✅ Cập nhật trạng thái thực hiện
- ✅ Báo cáo kết quả cứu hộ

### 📊 Manager (Quản lý)
- ✅ Theo dõi và điều chỉnh trạng thái xử lý
- ✅ Quản lý phương tiện cứu hộ
- ✅ Quản lý kho hàng cứu trợ và tồn kho
- ✅ Theo dõi phân phối hàng cứu trợ
- ✅ Thống kê và báo cáo sử dụng nguồn lực

### ⚙️ Admin (Quản trị viên)
- ✅ Quản lý người dùng và phân quyền
- ✅ Cấu hình danh mục hệ thống
- ✅ Báo cáo tổng hợp hoạt động

## 🛠️ Tech Stack

- **Framework:** React 18.2
- **Build Tool:** Vite 5.0
- **Routing:** React Router v6
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **HTTP Client:** Axios
- **Maps:** Leaflet + React Leaflet
- **Styling:** CSS Modules

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 16.x
- npm >= 8.x hoặc yarn >= 1.22.x

### Các bước cài đặt

1. Clone repository:
```bash
git clone https://github.com/TuanHoang297/flood-rescue-frontend.git
cd flood-rescue-frontend
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```

4. Cấu hình biến môi trường trong `.env`:
```env
VITE_API_URL=http://localhost:8080/api
```

## 🚀 Chạy ứng dụng

### Development mode
```bash
npm run dev
```
Ứng dụng sẽ chạy tại: http://localhost:3000

### Build production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## 📁 Cấu trúc thư mục

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # React components
│   │   ├── common/       # Shared components (Layout, Map, etc.)
│   │   ├── citizen/      # Citizen-specific components
│   │   ├── coordinator/  # Coordinator components
│   │   ├── rescueTeam/   # Rescue team components
│   │   ├── manager/      # Manager components
│   │   └── admin/        # Admin components
│   ├── pages/            # Page components
│   │   ├── LoginPage.jsx
│   │   ├── CitizenDashboard.jsx
│   │   ├── CoordinatorDashboard.jsx
│   │   ├── RescueTeamDashboard.jsx
│   │   ├── ManagerDashboard.jsx
│   │   └── AdminDashboard.jsx
│   ├── services/         # API services
│   │   └── api.js
│   ├── contexts/         # State management (Zustand stores)
│   │   └── authStore.js
│   ├── hooks/            # Custom React hooks
│   ├── routes/           # Routing configuration
│   │   └── AppRoutes.jsx
│   ├── config/           # App configuration
│   │   └── api.js
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles
│   │   ├── global.css
│   │   └── login.css
│   ├── App.jsx           # Root component
│   └── main.jsx          # Entry point
├── .env.example          # Environment variables template
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔐 Authentication

Hệ thống sử dụng JWT token cho authentication:
- Token được lưu trong localStorage
- Tự động attach vào header của mọi API request
- Auto redirect về login page khi token hết hạn

## 🗺️ Maps Integration

Sử dụng Leaflet với OpenStreetMap (miễn phí):
- Hiển thị vị trí yêu cầu cứu hộ
- Marker với popup thông tin chi tiết
- Tương tác zoom, pan
- Responsive trên mobile

## 🎨 UI/UX Features

- Responsive design cho mobile và desktop
- Loading states và error handling
- Toast notifications
- Form validation
- Badge system cho status và priority
- Color-coded urgency levels

## 🔄 API Integration

API endpoints được cấu hình trong `src/config/api.js`:
- Authentication: `/api/auth/*`
- Rescue Requests: `/api/rescue-requests/*`
- Teams: `/api/teams/*`
- Vehicles: `/api/vehicles/*`
- Supplies: `/api/supplies/*`
- Users: `/api/users/*`
- Statistics: `/api/statistics/*`

## 🧪 Testing

```bash
# Run tests (coming soon)
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📝 Scripts

```json
{
  "dev": "vite",              // Start development server
  "build": "vite build",      // Build for production
  "preview": "vite preview"   // Preview production build
}
```

## 🤝 Contributing

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer:** Tuan Hoang
- **GitHub:** [@TuanHoang297](https://github.com/TuanHoang297)

## 🔗 Related Projects

- **Backend API:** [flood-rescue-backend](https://github.com/TuanHoang297/flood-rescue-backend)

## 📞 Support

Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng tạo issue trên GitHub.

---

Made with ❤️ for flood rescue operations
