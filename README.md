# 🚀 Feedback System - Frontend Web App

Welcome to the **Feedback System Frontend**! A high-performance, responsive, and intuitive web application designed to manage customer feedback and service requests for ISPs. Built with a modern tech stack and optimized for a seamless administrative experience.

---

## 🛠 Tech Stack

We use a premium selection of technologies to ensure speed, type-safety, and a modern developer experience:

- **Framework:** [Next.js](https://nextjs.org/) ⚡ (App Router & Server Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/) 💙 (Strictly typed)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) 🎨 (Utility-first styling)
- **UI Components:** [Radix UI Themes](https://www.radix-ui.com/themes) 🧩 (Accessible components)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) 🐻 (Scalable state)
- **Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest) 🔄 (Server state management)
- **HTTP Client:** [Ky](https://github.com/sindresorhus/ky) 🏎 (Modern fetch wrapper)
- **Validation:** [Zod](https://zod.dev/) ✅ (Schema validation)
- **Forms:** [React Hook Form](https://react-hook-form.com/) 📝 (Performant forms)
- **Icons:** [Lucide React](https://lucide.dev/) ✨

---

## ✨ Features

- 👤 **Employee Dashboard:** Specialized views for managing customer feedback and requests.
- 📩 **Request Tracking:** Real-time monitoring and handling of petitions, complaints, and suggestions.
- 📊 **Analytics & Reports:** Visualized data insights for ISP performance and response times.
- 🔐 **Secure Access:** Robust authentication flow with JWT-based sessions.
- 📱 **Fully Responsive:** Optimized experience across desktops, tablets, and mobile devices.
- 🎨 **Premium UI:** Polished interface using Radix UI and Tailwind CSS for a professional look.

---

## 🚦 Getting Started

### 📋 Prerequisites

- **Node.js 20+**
- **PNPM** (highly recommended) or NPM.

### ⚙️ Installation & Configuration

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd feedback-net
   ```

2. **Setup environment variables:**

   ```bash
   cp .env.example .env
   ```

   > 💡 _Make sure to define `NEXT_PUBLIC_API_URL` to point to your backend service!_

3. **Install dependencies:**
   ```bash
   pnpm install
   ```

---

## 👨‍💻 Development

### Run in Dev Mode ⚡

```bash
pnpm dev
```

The application will start at `http://localhost:3000`.

### Build & Production 🚢

```bash
pnpm build
pnpm start
```

### Code Quality

- ✨ **Linting:** `pnpm lint`
- 🎨 **Formatting:** `pnpm format`
- 🛡 **Type Check:** `pnpm check-types`

---

## 📁 Project Structure

```text
src/
 ├── app/           # Next.js App Router (Layouts, Pages, Providers)
 │    ├── (private) # Authenticated routes (Dashboard, Requests, Analytics)
 │    ├── (public)  # Guest routes (Home, Login, Register)
 │    ├── core      # Shared logic: hooks, services, stores, and types
 │    └── components# App-specific shared components
 ├── components/    # Reusable UI primitives and global components
 ├── lib/           # Utility libraries (API clients, shared helpers)
 └── providers/     # React Context and Global Providers
public/             # Static assets (images, icons, etc.)
```

---

## 🛡 License

This project is licensed under the **ISC License**.

Developed with ❤️ by the Feedback Team.
