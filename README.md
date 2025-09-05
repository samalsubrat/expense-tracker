# 💸 ExpenseTracker

<div align="center">
  
  
  <p align="center">
    <strong>A modern, beautiful expense tracking application built with Next.js</strong>
  </p>
  
  <p align="center">
    Track your expenses, analyze spending patterns, and take control of your finances
  </p>

  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#deployment">Deployment</a> •
    <a href="#contributing">Contributing</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind-4.1.9-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS">
  </p>
</div>

---

## ✨ Features

### 📊 **Dashboard Overview**
- Real-time financial summary with balance, income, and expenses
- Beautiful charts and visualizations using Recharts
- Recent transactions overview
- Category-wise expense analytics

### 💳 **Transaction Management**
- Add new transactions with ease
- Categorize expenses for better organization
- Edit and delete transactions
- Filter transactions by category
- Responsive transaction list with smart pagination

### 📈 **Analytics & Insights**
- Category-wise spending breakdown
- Visual charts showing expense patterns
- Percentage-based category analysis
- Monthly and yearly spending trends

### 🎨 **Modern UI/UX**
- Clean, intuitive interface built with Radix UI
- Dark/Light theme support with next-themes
- Responsive design that works on all devices
- Beautiful animations and transitions
- Custom DM Sans typography for enhanced readability

### 🔐 **Authentication**
- Secure user authentication with Clerk
- Protected routes and user sessions
- Multi-platform sign-in support

### 🛡️ **Type Safety**
- Full TypeScript implementation
- Type-safe API routes
- Comprehensive error handling
- Input validation with Zod

## 🚀 Tech Stack

### **Frontend**
- **[Next.js 15.5.2](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4.1.9](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons

### **Backend & Database**
- **[Neon Database](https://neon.tech/)** - Serverless PostgreSQL
- **[SQL](https://www.postgresql.org/)** - Database queries

### **Authentication**
- **[Clerk](https://clerk.com/)** - Complete authentication solution

### **Charts & Visualization**
- **[Recharts](https://recharts.org/)** - Composable charting library

### **Development Tools**
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/expensetracker.git
   cd expensetracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your_neon_database_url"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"
   
   # Clerk URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
   NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"
   ```

4. **Set up the database**
   
   Run the database migration script:
   ```bash
   # Execute the SQL script in your Neon database
   # File: src/scripts/001-create-transactions-table.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
expensetracker/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── components/    # React components
│   │   │   └── ui/        # Reusable UI components
│   │   ├── dashboard/     # Dashboard pages
│   │   ├── transactions/  # Transaction pages
│   │   └── globals.css    # Global styles
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── scripts/           # Database scripts
├── components.json        # shadcn/ui configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy your ExpenseTracker app is to use the [Vercel Platform](https://vercel.com/new).

1. **Connect your repository** to Vercel
2. **Configure environment variables** in the Vercel dashboard
3. **Deploy** with automatic CI/CD

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/expensetracker)

### Other Platforms

- **Netlify**: Connect your Git repository and deploy
- **Railway**: Deploy with built-in PostgreSQL
- **DigitalOcean App Platform**: Container-based deployment

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎨 Customization

### Themes
The app supports both light and dark themes. You can customize the color scheme in:
- `src/app/globals.css` - CSS custom properties
- `tailwind.config.ts` - Tailwind theme configuration

### Components
All UI components are built with Radix UI and are fully customizable. Find them in:
- `src/app/components/ui/` - Base UI components
- `src/app/components/` - Application-specific components

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Write clean, readable TypeScript code
- Follow the existing code style and conventions
- Add type definitions for all new features
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help getting started:

- 📧 **Email**: support@expensetracker.com
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/expensetracker/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/expensetracker/issues)

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Authentication by [Clerk](https://clerk.com/)
- Database hosted on [Neon](https://neon.tech/)
- Icons from [Lucide](https://lucide.dev/)

---

<div align="center">
  <p>Built with ❤️</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
