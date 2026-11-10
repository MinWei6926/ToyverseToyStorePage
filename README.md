# Toyverse

Toyverse là website thương mại điện tử dành cho người yêu thích đồ chơi sưu tầm, tập trung vào:

- Figure và blindbox.
- Thẻ bài/Trading Card Game.
- Mô hình lắp ghép.
- Xe diecast và xe điều khiển từ xa.

Dự án sử dụng **Next.js 16**, **React 19**, **Payload CMS 4**, **TypeScript** và **Tailwind CSS 4**. Payload quản lý sản phẩm, hình ảnh, tài khoản khách hàng, giỏ hàng và lịch sử đơn hàng.

## Tính năng chính

- Trang chủ responsive với danh mục dạng accordion.
- Danh sách sản phẩm từ Payload CMS.
- Lọc theo thể loại, thương hiệu và khoảng giá.
- Sắp xếp theo độ nổi bật, đánh giá và giá.
- Trang sản phẩm khuyến mãi.
- Carousel deal và sản phẩm nổi bật.
- Dòng thương hiệu liên kết tới sản phẩm tương ứng.
- Đăng ký, đăng nhập và đăng xuất.
- Hồ sơ cá nhân.
- Giỏ hàng thuộc từng tài khoản.
- Lịch sử mua hàng.
- Payload Admin Panel.
- Catalog sản phẩm có cache và tự làm mới khi dữ liệu thay đổi.

## Công nghệ sử dụng

| Công nghệ      | Mục đích                                                 |
| -------------- | -------------------------------------------------------- |
| Next.js 16     | App Router, Server Components, Server Actions và routing |
| React 19       | Xây dựng giao diện                                       |
| Payload CMS 4  | Database, CMS, xác thực và quản lý media                 |
| TypeScript     | Kiểm tra kiểu dữ liệu                                    |
| Tailwind CSS 4 | Styling                                                  |
| pnpm           | Quản lý package                                          |
| oxfmt          | Format mã nguồn                                          |
| Figma Make     | Preview, backend cloud và quy trình deploy               |

## Cấu trúc thư mục

```text
figma-make-app/
├── .figma/
│   └── make/
│       ├── analyze-routes
│       ├── deploy
│       ├── deploy-preview
│       ├── dev
│       ├── format
│       ├── install
│       └── payload.json
│
├── data/
│   └── toyverse-products.json
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── app/
│   │   ├── (frontend)/
│   │   │   ├── actions/
│   │   │   │   ├── auth.ts
│   │   │   │   └── cart.ts
│   │   │   │
│   │   │   ├── api/
│   │   │   │   └── app-session/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   └── page.tsx
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── page.tsx
│   │   │   └── styles.css
│   │   │
│   │   └── (payload)/
│   │       ├── admin/
│   │       ├── api/
│   │       ├── custom.css
│   │       └── layout.tsx
│   │
│   ├── collections/
│   │   ├── Admins.ts
│   │   ├── Folders.ts
│   │   ├── Media.ts
│   │   ├── Orders.ts
│   │   ├── Products.ts
│   │   ├── Tags.ts
│   │   └── Users.ts
│   │
│   ├── components/
│   │   ├── AuthForms.tsx
│   │   ├── ProductCatalog.tsx
│   │   ├── ProfileForm.tsx
│   │   ├── StoreHeader.tsx
│   │   └── ToyverseApp.tsx
│   │
│   ├── lib/
│   │   ├── app-auth.ts
│   │   ├── make-custom-code.tsx
│   │   ├── make-site-settings.ts
│   │   ├── payload.ts
│   │   └── products.ts
│   │
│   ├── payload-types.ts
│   └── payload.config.ts
│
├── figma-image-loader.ts
├── next.config.ts
├── oxfmt.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── tsconfig.json
└── .mise.toml
```

## Giải thích các thư mục quan trọng

### `src/app/(frontend)`

Chứa các trang dành cho khách hàng:

| Route                    | File                | Chức năng                  |
| ------------------------ | ------------------- | -------------------------- |
| `/`                      | `page.tsx`          | Trang chủ                  |
| `/products`              | `products/page.tsx` | Catalog, bộ lọc và sắp xếp |
| `/products?sale=1`       | `products/page.tsx` | Sản phẩm khuyến mãi        |
| `/products?brand=BANDAI` | `products/page.tsx` | Sản phẩm theo thương hiệu  |
| `/auth`                  | `auth/page.tsx`     | Đăng nhập và đăng ký       |
| `/profile`               | `profile/page.tsx`  | Hồ sơ và lịch sử mua hàng  |
| `/cart`                  | `cart/page.tsx`     | Giỏ hàng                   |

### `src/app/(frontend)/actions`

Chứa Server Actions:

- `auth.ts`: đăng nhập, đăng ký, đăng xuất và cập nhật hồ sơ.
- `cart.ts`: thêm sản phẩm, xóa sản phẩm và tạo đơn hàng.

### `src/app/(payload)`

Khu vực Payload tự quản lý, bao gồm Admin Panel và API. Không nên chỉnh sửa trực tiếp các file trong thư mục này.

### `src/collections`

Định nghĩa schema Payload:

- `Admins.ts`: tài khoản quản trị CMS.
- `Users.ts`: tài khoản khách hàng, hồ sơ và giỏ hàng.
- `Products.ts`: sản phẩm.
- `Orders.ts`: đơn hàng.
- `Media.ts`: hình ảnh.
- `Folders.ts`, `Tags.ts`: tổ chức thư viện media.

### `src/components`

Các component giao diện chính:

- `ToyverseApp.tsx`: giao diện trang chủ.
- `ProductCatalog.tsx`: catalog, bộ lọc và sắp xếp.
- `StoreHeader.tsx`: navigator dùng trên các trang con.
- `AuthForms.tsx`: form đăng nhập/đăng ký.
- `ProfileForm.tsx`: form hồ sơ.

### `data/toyverse-products.json`

File dữ liệu portable gồm:

- 36 sản phẩm.
- 12 media.
- 4 danh mục.
- Giá, khuyến mãi, đánh giá, thương hiệu và khóa hình ảnh.

## Yêu cầu môi trường

Khuyến nghị:

- Node.js `>= 24.22.1`.
- pnpm phiên bản `9`, `10` hoặc `11`.
- VS Code phiên bản mới.
- Git.
- mise để đồng bộ phiên bản công cụ theo `.mise.toml`.

Kiểm tra phiên bản:

```bash
node --version
npm --version
git --version
```

## Mở dự án bằng VS Code

### 1. Clone hoặc tải source code

Nếu dự án nằm trên Git:

```bash
git clone https://github.com/MinWei6926/ToyverseToyStorePage.git
cd figma-make-app
```

Nếu đã có thư mục dự án, mở terminal tại thư mục đó.

### 2. Mở bằng VS Code

```bash
code .
```

Hoặc:

1. Mở VS Code.
2. Chọn **File → Open Folder**.
3. Chọn thư mục gốc của dự án.

### 3. Mở terminal trong VS Code

Chọn:

```text
Terminal → New Terminal
```

Terminal phải đang đứng tại thư mục có file `package.json`.

## Cài đặt dự án

### Cách khuyến nghị với mise

Nếu đã cài mise:

```bash
mise install
pnpm install
```

`mise install` đọc phiên bản công cụ từ `.mise.toml`.

### Nếu đã có Node.js phù hợp

```bash
pnpm install
```

Không nên dùng `npm install` vì dự án sử dụng `pnpm-lock.yaml`.

## Chạy development

Trong môi trường Figma Make, development server thường được khởi động tự động.

Nếu chạy thủ công trong VS Code:

```bash
pnpm dev
```

Mặc định website chạy tại:

```text
http://localhost:3000
```

Để dùng port khác:

### macOS/Linux

```bash
PORT=3001 pnpm dev
```

### PowerShell

```powershell
$env:PORT=3001
pnpm dev
```

Sau đó mở:

```text
http://localhost:3001
```

## Payload Admin Panel

Sau khi development server hoạt động, mở:

```text
http://localhost:3000/admin
```

Admin Panel dùng để:

- Thêm hoặc chỉnh sửa sản phẩm.
- Tải hình ảnh.
- Xem đơn hàng.
- Quản lý media.

Tài khoản Payload Admin và tài khoản khách hàng là hai hệ thống riêng biệt.

## Lưu ý về Payload/Figma Backend

Dự án sử dụng backend do Figma Make quản lý thông qua `@payloadcms/figma`.

Các biến môi trường cho database, storage và Payload được Figma Make tự động cung cấp. Không:

- Tạo secret giả.
- Hard-code database URL.
- Thay thế `buildFigmaConfig()` bằng `buildConfig()`.
- Thêm adapter database riêng.
- Chỉnh sửa trực tiếp thư mục `src/app/(payload)`.

Nếu chạy bản clone bên ngoài môi trường Figma Make, backend có thể báo thiếu biến môi trường do các giá trị này chỉ được cung cấp trong Make runtime. Trong trường hợp đó, hãy chạy dự án trong workspace Figma Make hoặc triển khai bằng quy trình được Figma Make hỗ trợ.

## Build production

```bash
pnpm build
```

Chạy production build:

```bash
pnpm start
```

Nên chạy build trước khi tạo pull request hoặc deploy:

```bash
pnpm build
```

## Format mã nguồn

```bash
pnpm format
```

Dự án sử dụng oxfmt và cấu hình tại:

```text
oxfmt.config.ts
```

## Kiểm tra TypeScript

```bash
pnpm exec tsc --noEmit
```

## Xác minh production trong Figma Make

```bash
figma make verify-deploy
```

Lệnh này kiểm tra:

- Production build.
- Route table.
- Cấu trúc output deploy.
- Khả năng đóng gói ứng dụng.

## Các script có sẵn

| Lệnh                  | Chức năng                                        |
| --------------------- | ------------------------------------------------ |
| `pnpm dev`            | Chạy development server                          |
| `pnpm build`          | Build Next.js và Payload                         |
| `pnpm start`          | Chạy production server                           |
| `pnpm format`         | Format source code                               |
| `pnpm payload`        | Chạy Payload CLI                                 |
| `pnpm generate:types` | Tạo lại Payload TypeScript types khi thật sự cần |

Payload types thường được tự động cập nhật bởi development server và build. Không cần chạy `generate:types` sau mọi thay đổi.

## Dữ liệu sản phẩm

File dữ liệu mẫu:

```text
data/toyverse-products.json
```

Cấu trúc rút gọn:

```json
{
  "categories": ["Figure", "Thẻ bài", "Mô hình lắp ghép", "Xe"],
  "media": [
    {
      "key": "fig-anime-hero",
      "alt": "Mô hình Figure nhân vật Anime",
      "filename": "fig-anime-hero.jpg",
      "externalURL": "https://images.unsplash.com/..."
    }
  ],
  "products": [
    {
      "name": "Figure Nendoroid Anh Hùng Huyền Thoại",
      "slug": "figure-nendoroid-anh-hung",
      "brand": "GOOD SMILE",
      "category": "Figure",
      "price": 1250000,
      "oldPrice": 1450000,
      "sale": 14,
      "rating": 4.9,
      "imageKey": "fig-chibi",
      "featured": true
    }
  ]
}
```

Sản phẩm thực tế được lưu trong Payload. File JSON dùng để:

- Sao lưu dữ liệu mẫu.
- Chuyển dữ liệu sang dự án khác.
- Chuẩn bị batch import.
- Làm tài liệu về cấu trúc sản phẩm.

## Quy tắc phát triển

- Frontend nằm trong `src/app/(frontend)`.
- Không chỉnh sửa `src/app/(payload)` trực tiếp.
- Dữ liệu bền vững phải lưu trong Payload.
- Media sản phẩm phải dùng quan hệ tới collection `media`.
- Mọi Local API call phải đặt rõ `overrideAccess`.
- Dữ liệu người dùng và đơn hàng phải được bảo vệ bằng access control.
- Không đưa secret hoặc thông tin backend vào client code.

## Khắc phục lỗi thường gặp

### `pnpm` chưa được cài

Nếu Node.js hỗ trợ Corepack:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

Sau đó:

```bash
pnpm install
```

### Sai phiên bản Node.js

Nếu dùng mise:

```bash
mise install
mise use
```

Kiểm tra lại:

```bash
node --version
```

### Port 3000 đang được sử dụng

Chạy bằng port khác:

```bash
PORT=3001 pnpm dev
```

### Payload báo thiếu biến môi trường

Không tạo biến giả. Hãy xác nhận dự án đang chạy trong Figma Make runtime hoặc môi trường deployment được Figma Make hỗ trợ.

### Giao diện chưa nhận dữ liệu sản phẩm mới

Production catalog sử dụng cache. Sau khi thay đổi schema hoặc seed dữ liệu bằng CLI, chạy lại:

```bash
figma make verify-deploy
```

hoặc publish lại website để tạo build mới.

## Giấy phép

Đây là dự án riêng của Toyverse. Việc sử dụng, phân phối hoặc chỉnh sửa source code phụ thuộc vào chính sách của chủ sở hữu dự án.
