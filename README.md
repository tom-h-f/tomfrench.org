# tomfrench.org

A modern personal website built with Next.js 15, featuring a clean design, responsive layout, and powerful content management capabilities.

## ✨ Features

- **🏠 Personal Homepage** - Clean, tabbed interface showcasing posts and projects
- **📝 Notes System** - Markdown-based note management with search and filtering
- **✍️ Blog Posts** - Dynamic blog with React component rendering
- **📋 Kanban Board** - Task management with drag-and-drop functionality
- **🔊 Ambient Noise Player** - Built-in audio player for productivity sounds
- **📁 File Management** - Upload and manage files with UploadThing integration
- **🎨 Modern Design** - Custom shadcn/ui components with consistent styling
- **📱 Responsive** - Mobile-first design with adaptive navigation

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes (UploadThing)
│   ├── files/             # File management page
│   ├── kanban/            # Kanban board interface
│   ├── noise/             # Ambient noise player
│   ├── notes/             # Notes browser and viewer
│   ├── posts/             # Blog posts
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage
├── components/            # React components
│   ├── audio/             # Audio player components
│   ├── auth/              # Authentication components
│   ├── kanban/            # Kanban-specific components
│   ├── posts/             # Blog post components
│   ├── ui/                # shadcn/ui components
│   ├── brand-logo.tsx     # Reusable brand component
│   ├── navigation.tsx     # Main navigation
│   └── notes-*.tsx        # Notes-related components
├── content/               # Content management
│   └── obsidian-vault/    # Obsidian vault submodule
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tom-h-f/tomfrench.org.git
   cd tomfrench.org
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the required environment variables:
   - `UPLOADTHING_*` - For file uploads
   - `SUPABASE_*` - For database operations (Kanban)

4. **Initialize Obsidian vault** (if using notes)
   ```bash
   git submodule update --init --recursive
   ```

5. **Run development server**
   ```bash
   bun run dev
   # or npm run dev
   ```

## 🛠️ Development

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run sync-obsidian` - Sync Obsidian vault content

### Key Technologies

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS + shadcn/ui
- **Database**: Supabase (for Kanban)
- **File Storage**: UploadThing
- **Content**: Markdown + Gray Matter
- **State Management**: React hooks + Context
- **TypeScript**: Full type safety

## 📁 Content Management

### Notes System
- Markdown files in `content/obsidian-vault/`
- Automatic processing and indexing
- Search and filter capabilities
- Nested folder structure support

### Blog Posts
- React component-based posts in `src/components/posts/`
- Metadata-driven rendering
- Dynamic routing

### Kanban Board
- Persistent storage in Supabase
- Drag-and-drop functionality
- Tag system with predefined options
- Priority and due date tracking

## 🎨 Design System

The project uses a consistent design system built on:
- **shadcn/ui** components
- **Custom color palette** via CSS variables
- **Consistent spacing** using Tailwind classes
- **Accessible components** with proper ARIA attributes
- **Responsive breakpoints** for all screen sizes

### Key Components
- `CardWithHover` - Reusable card with consistent hover effects
- `BrandLogo` - Flexible brand/logo component
- `Navigation` - Responsive navigation with mobile support

## 🔌 Integrations

- **Supabase**: Database for Kanban board persistence
- **UploadThing**: File upload and storage service
- **Obsidian Vault**: Git submodule for notes content
- **Vercel**: Deployment and hosting

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the existing code style
4. Add appropriate TypeScript types
5. Test your changes
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing component patterns
- Add proper JSDoc comments for complex functions
- Use consistent naming conventions
- Keep components focused and reusable

## 📄 License

This project is personal and proprietary. All rights reserved.

## 🤝 Contact

- **Website**: [tomfrench.org](https://tomfrench.org)
- **GitHub**: [@tom-h-f](https://github.com/tom-h-f)

---

Built with ❤️ using Next.js and modern web technologies.

## TODOs
- MathJax integration when rendering the markdown files. $x$ would work, etc.
- Make mobile work better
- Add picture to homepage
- Add CV page and link to it from home page
- Make the links go to my accounts on the social links
- Flesh out the full 'quick links' links
- Make the noise thing work in all pages, works as a mini player that shows up in the bottom right.
-