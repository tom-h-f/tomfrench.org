# Copilot Context Guide for tomfrench.org

This document provides comprehensive context for any AI assistant (GitHub Copilot, Claude, GPT, etc.) working on this personal website project.

## 🎯 Project Overview

**tomfrench.org** is a modern personal website built with Next.js 15, serving as both a blog and productivity workspace. The site combines content management, task organization, and ambient productivity tools in a clean, responsive interface.

### Core Philosophy
- **Clean & Minimal**: Focus on content over clutter
- **Productivity-First**: Built-in tools for personal workflow
- **Performance**: Fast loading, optimized for user experience
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Type Safety**: Full TypeScript implementation

## 🏗️ Architecture Overview

### Tech Stack
```
Frontend: Next.js 15 (App Router) + React 19
Styling: TailwindCSS + shadcn/ui components
Database: Supabase (PostgreSQL)
Storage: Supabase
Content: Markdown + Gray Matter + Obsidian vault repo integration via submodule
Type Safety: TypeScript throughout
Package Manager: Bun
Deployment: Netlify
```

### File Structure Deep Dive

```
src/
├── app/                           # Next.js App Router
│   ├── api/uploadthing/          # UploadThing API integration
│   ├── files/page.tsx            # File management interface
│   ├── kanban/page.tsx           # Kanban board page
│   ├── noise/page.tsx            # Ambient sound player
│   ├── notes/                    # Notes system
│   │   ├── page.tsx             # Notes browser
│   │   └── [...slug]/page.tsx   # Individual note viewer
│   ├── posts/                    # Blog system
│   │   ├── page.tsx             # Posts listing
│   │   └── [slug]/page.tsx      # Individual post
│   ├── globals.css               # Global styles + CSS variables
│   ├── layout.tsx               # Root layout with theme provider
│   └── page.tsx                 # Homepage with tabbed interface
├── components/                   # React components
│   ├── audio/                   # Audio player components
│   │   ├── audio-player.tsx     # Multi-track player
│   │   ├── individual-audio-player.tsx # Single track player
│   │   └── index.ts            # Barrel exports
│   ├── auth/                    # Authentication (future use)
│   ├── kanban/                  # Kanban board components
│   │   ├── kanban-board.tsx     # Main board container
│   │   ├── kanban-column.tsx    # Column component
│   │   ├── task-card.tsx        # Individual task card
│   │   ├── task-form.tsx        # Task creation/editing
│   │   └── task-list-view.tsx   # Alternative list view
│   ├── posts/                   # Blog post components
│   │   ├── art-of-clean-code.tsx
│   │   ├── building-modern-web-apps.tsx
│   │   └── typescript-tips-tricks.tsx
│   ├── ui/                      # shadcn/ui components
│   │   ├── card-with-hover.tsx  # Custom hover card
│   │   └── [other shadcn components]
│   ├── brand-logo.tsx           # Reusable brand component
│   ├── navigation.tsx           # Main navigation with mobile support
│   ├── notes-page-client.tsx    # Notes browser client component
│   ├── notes-tree.tsx           # Notes folder structure
│   └── theme-provider.tsx       # Dark/light theme context
├── content/obsidian-vault/      # Git submodule - Obsidian notes
├── hooks/                       # Custom React hooks
│   ├── use-auth.ts             # Authentication hook
│   ├── use-mobile.ts           # Mobile detection
│   └── use-navigation.ts       # Navigation logic
├── lib/                        # Core utilities
│   ├── kanban-storage.ts       # Local storage utilities
│   ├── kanban-types.ts         # Kanban type definitions
│   ├── notes.ts               # Notes processing utilities
│   ├── posts.ts               # Posts metadata handling
│   ├── supabase-kanban-adapter.ts # Supabase integration
│   └── utils.ts               # General utilities (cn, etc.)
├── types/                      # TypeScript type definitions
│   └── index.ts               # Centralized type exports
└── utils/                     # Additional utilities
    ├── uploadthing.ts         # UploadThing configuration
    └── supabase/             # Supabase client setup
```

## 🧩 Key Components & Patterns

### Design System Components

#### CardWithHover
```tsx
// Reusable card with consistent hover effects
<CardWithHover enableHover={true} hoverShadowColor="var(--border)">
  {content}
</CardWithHover>
```

#### BrandLogo
```tsx
// Flexible brand component with variants
<BrandLogo variant="header" /> // header | footer | minimal
```

#### Navigation
```tsx
// Responsive navigation with mobile support
// Uses useNavigation hook for state management
// Includes accessibility attributes
```

### Content Management

#### Notes System
- **Source**: Obsidian vault as Git submodule at `content/obsidian-vault/`
- **Processing**: Gray matter for frontmatter, recursive directory scanning
- **Features**: Search, filtering, nested folder support
- **Sync**: `bun run sync-obsidian` command

#### Blog Posts
- **Approach**: React components in `src/components/posts/`
- **Metadata**: Embedded in component exports
- **Routing**: Dynamic `[slug]` routes
- **Content**: JSX for rich formatting

#### Kanban Board
- **Storage**: Supabase PostgreSQL
- **Features**: Drag-and-drop, tags, priorities, due dates
- **Local Backup**: Browser localStorage as fallback
- **Schema**: See `supabase/migrations/` for database structure

### Audio System
- **Purpose**: Ambient productivity sounds (brown noise, coffee shop, office)
- **Storage**: Static files in `public/audio/`
- **Components**: Multi-track and single-track players
- **Controls**: Play/pause, volume, progress tracking

## 🔄 Data Flow Patterns

### State Management
```
Local State (useState) → Component UI
Global State (Context) → Theme, Auth status
Server State (Supabase) → Kanban data
File System → Notes content
Static → Blog posts, audio files
```

### Content Processing
```
Obsidian Vault → Sync Script → File System → Notes API → UI
React Components → Metadata → Posts API → UI
Supabase → Kanban API → Local Storage → UI
```

## 🎨 Styling & Theme System

### CSS Variables (globals.css)
```css
--background: /* Main background */
--foreground: /* Main text color */
--main: /* Primary accent color */
--border: /* Border color */
/* ... additional semantic color variables */
```

### Component Styling Patterns
- **Consistency**: Use `cn()` utility for conditional classes
- **Hover Effects**: Consistent shadow patterns via CardWithHover
- **Responsive**: Mobile-first approach with Tailwind breakpoints
- **Dark Mode**: CSS variable switching via theme provider

### Design Tokens
- **Spacing**: Tailwind scale (4, 6, 8, etc.)
- **Typography**: Custom font stack defined in Tailwind config
- **Colors**: Semantic color system via CSS variables
- **Borders**: 2px borders with rounded corners (`rounded-base`)

## 🔧 Development Workflows

### Common Commands
```bash
bun run dev          # Development server
bun run build        # Production build
bun run sync-obsidian # Sync notes content
bun add <package>    # Add dependency
npx tsc --noEmit     # Type checking
```

### Code Patterns

#### Component Creation
```tsx
// Always use TypeScript interfaces
interface ComponentProps {
  required: string;
  optional?: boolean;
  children?: React.ReactNode;
}

// Export as named export
export function Component({ required, optional = false }: ComponentProps) {
  // Use custom hooks for logic
  // Follow existing styling patterns
  return <div>...</div>;
}
```

#### Hook Pattern
```tsx
// Custom hooks start with 'use'
export function useFeature() {
  const [state, setState] = useState();
  
  // Include cleanup effects
  useEffect(() => {
    // setup
    return () => {/* cleanup */};
  }, []);
  
  return { state, actions };
}
```

### File Organization Rules
- **Barrel Exports**: Use index.ts files for clean imports
- **Co-location**: Keep related files together
- **Naming**: kebab-case for files, PascalCase for components
- **Types**: Centralize in `/types` directory when shared

## 🔌 External Integrations

### Supabase Setup
```typescript
// Database schema (kanban system)
- tasks table: id, title, description, status, priority, due_date, tags, etc.
- Real-time subscriptions for live updates
- Row Level Security (RLS) for user isolation
```

### UploadThing Configuration
```typescript
// File upload handling
- Image uploads with size limits
- Automatic URL generation
- Integration with Next.js API routes
```

### Obsidian Vault Integration
```bash
# Git submodule workflow
git submodule add <vault-repo> content/obsidian-vault
git submodule update --remote # Sync latest changes
```

## 🚨 Common Issues & Solutions

### Build Issues
- **Missing Dependencies**: Check package.json, run `bun install`
- **Type Errors**: Ensure all imports use correct paths
- **CSS Issues**: Verify Tailwind config and CSS variable definitions

### Content Issues
- **Notes Not Loading**: Run `bun run sync-obsidian`
- **Images Not Displaying**: Check public/ directory structure
- **Routing Issues**: Verify file-based routing in app/ directory

### Development Issues
- **Hot Reload**: Restart dev server if changes not reflecting
- **Environment Variables**: Ensure .env.local is configured
- **Database Connection**: Verify Supabase credentials and network

## 🎯 Current Priorities & TODOs

### Immediate
- MathJax integration for mathematical notation in notes
- Mobile responsive improvements
- Homepage image addition
- CV page creation and linking

### Medium Term
- Authentication system implementation
- Enhanced note-taking features
- Performance optimizations
- SEO improvements

### Long Term
- Advanced search capabilities
- Content collaboration features
- Progressive Web App (PWA) support
- Analytics integration

## 🤝 Development Guidelines

### When Adding Features
1. **Type Safety First**: Add TypeScript interfaces
2. **Accessibility**: Include proper ARIA attributes
3. **Mobile Support**: Test on smaller screens
4. **Performance**: Consider bundle size impact
5. **Consistency**: Follow existing patterns and styling

### When Debugging
1. **Check Console**: Browser dev tools for client-side issues
2. **Network Tab**: API calls and resource loading
3. **Build Locally**: `bun run build` to catch build-time issues
4. **Type Check**: `npx tsc --noEmit` for type errors

### When Refactoring
1. **Small Changes**: Make incremental improvements
2. **Test Thoroughly**: Verify all functionality still works
3. **Update Types**: Keep TypeScript definitions current
4. **Document Changes**: Update relevant documentation

This context guide should provide any AI assistant with comprehensive understanding of the project structure, patterns, and development workflows for effective collaboration.
