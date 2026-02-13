# Yun's Corner

A modern, minimalist blog built with React and Vite, featuring a Pinterest-style masonry layout and automatic deployment to GitHub Pages.

**Live Site:** [yun505.github.io/blog_2.0](https://yun505.github.io/blog_2.0)


## Project Overview

This is a personal blog I redesigned from my high school HTML version. The original was laggy and honestly, some of those old posts made me cringe looking back. I wanted a fresh start with a modern tech stack and a clean aesthetic that actually performs well.

### Why I Rebuilt It

- **Performance**: The old HTML/CSS version was sluggish
- **Fresh Start**: Removed cringeworthy old content (we all have that phase)
- **Modern Stack**: Wanted to learn and showcase React 19 + Vite 7
- **Better UX**: Implemented proper modals, filtering, and responsive design
- **Automated Deployment**: Set up CI/CD so I can just push to main and it deploys automatically

## Features

- **Masonry Layout**: Pinterest-style responsive grid using CSS columns
- **Category Filtering**: Filter posts by `all`, `food`, `book`, or `misc`
- **Modal Viewing**: Click any post card to view full content in a modal
- **Glass Morphism UI**: Modern frosted glass aesthetic with backdrop blur
- **Fully Responsive**: Works beautifully on mobile, tablet, and desktop
- **Automatic Deployment**: GitHub Actions workflow deploys to Pages on every push
- **Multiple Layout Types**: Support for Article, Image, and Post layouts

## Tech Stack

### Frontend
- **React 19.2.0**: Latest React with improved hooks and performance
- **Vite 7.2.4**: Lightning-fast build tool and dev server
- **Tailwind CSS 3.4.19**: Utility-first CSS framework
- **Lucide React**: Beautiful, consistent icons

### Development Tools
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing with Autoprefixer
- **GitHub Actions**: CI/CD pipeline

## Project Structure

```
blog2.0/
├── src/
│   ├── components/
│   │   ├── PostCard.jsx       # Individual post card component
│   │   ├── PostModal.jsx      # Modal for full post view
│   │   └── layouts/
│   │       ├── ArticlePost.jsx    # Layout for article-style posts
│   │       ├── ImagePost.jsx      # Layout for image-focused posts
│   │       └── QuotePost.jsx       # Layout for quote-focused posts
│   ├── data/
│   │   └── posts.json         # All post content and metadata
│   ├── App.jsx                # Main app component with filtering logic
│   └── main.jsx               # React entry point
├── .github/
│   └── workflows/
│       └── pages-build-deployment.yml  # GitHub Actions workflow
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

### Component Architecture

**App.jsx**: Main container handling:
- State management for selected post and active category
- Category filtering logic
- Masonry grid layout rendering

**PostCard.jsx**: Reusable card component displaying:
- Post thumbnail/preview
- Title and metadata
- Click handler to open modal

**PostModal.jsx**: Full-screen modal featuring:
- Close button and backdrop
- Dynamic layout rendering based on post type
- Smooth animations and transitions

**Layout Components**:
- `ArticlePost.jsx`: For long-form written content
- `ImagePost.jsx`: For photo-focused posts
- `QuotePost.jsx`: For quotes

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd blog2.0

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server will start at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Deployment Workflow

The project uses GitHub Actions for automatic deployment to GitHub Pages. Every push to the `main` branch triggers the deployment process.

### Workflow Breakdown

The workflow file (`.github/workflows/pages-build-deployment.yml`) consists of two jobs:

#### Job 1: Build

```yaml
build:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout
      uses: actions/checkout@v4
```
**What it does**: Clones your repository code into the GitHub Actions runner (Ubuntu virtual machine)

```yaml
    - name: Setup Node
      uses: actions/setup-node@v4
      with:
        node-version: 20
```
**What it does**: Installs Node.js version 20 on the runner

```yaml
    - name: Verify package files
      run: |
        if [ ! -f ./blog2.0/package.json ]; then
          echo "ERROR: package.json not found"
          exit 1
        fi
        if [ ! -f ./blog2.0/package-lock.json ]; then
          echo "ERROR: package-lock.json not found"
          exit 1
        fi
```
**What it does**: Safety check to ensure both `package.json` and `package-lock.json` exist before proceeding. If either is missing, the workflow fails with a clear error message.

```yaml
    - name: Install deps
      run: npm install || { echo "ERROR: npm install failed"; exit 1; }
      working-directory: ./blog2.0
```
**What it does**: 
- Runs `npm install` to install all dependencies from `package.json`
- `working-directory` ensures commands run inside the `blog2.0` folder
- The `|| { ... }` part means "if npm install fails, print error and exit"

```yaml
    - name: Build
      run: npm run build || { echo "ERROR: npm run build failed"; exit 1; }
      working-directory: ./blog2.0
```
**What it does**: 
- Runs the Vite build process (`npm run build`)
- Vite compiles your React app, bundles JavaScript, processes CSS, optimizes images
- Creates the `dist/` folder with production-ready static files
- Fails with error message if build has issues

```yaml
    - name: Upload Pages artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: ./blog2.0/dist
```
**What it does**: 
- Takes the entire `dist/` folder (your built website)
- Packages it as an "artifact" (a compressed file)
- Stores it temporarily so the next job can access it
- This is necessary because different jobs run in isolated environments

#### Job 2: Deploy

```yaml
deploy:
  needs: build
  runs-on: ubuntu-latest
```
**What it does**: 
- `needs: build` means this job only runs if the build job succeeds
- Ensures we never deploy a broken build

```yaml
  steps:
    - name: Deploy to GitHub Pages
      uses: actions/deploy-pages@v4
```
**What it does**: 
- Takes the artifact from the build job
- Uploads it to GitHub Pages
- GitHub Pages then serves your static site at `https://yourusername.github.io/repo-name`

### Permissions Explained

```yaml
permissions:
  contents: read      # Can read repository contents
  pages: write        # Can write to GitHub Pages
  id-token: write     # Can generate authentication tokens
```

These permissions allow the workflow to:
- Access your code (`contents: read`)
- Deploy to GitHub Pages (`pages: write`)
- Authenticate securely (`id-token: write`)

### Why This Workflow Rocks

1. **Automatic**: Push to main → instant deployment
2. **Error Handling**: Each step checks for failures and provides clear error messages
3. **Separation of Concerns**: Build and deploy are separate jobs for better error isolation
4. **Safe**: Verifies files exist before running expensive operations
5. **Fast**: Only rebuilds what changed thanks to Vite's optimization

## Customization

### Adding a New Post

Edit `src/data/posts.json`:

```json
{
  "id": "unique-id",
  "template": "article",
  "category": "food",
  "title": "Post Title",
  "thumbnail": "image source",
  "content": "Post content here...",
  "readTime": "4 min",
}
```

### Adding a New Category

1. Add category to `CATEGORIES` array in `App.jsx`
2. Update Tailwind classes for the new category if needed
3. Add posts with the new category to `posts.json`

### Styling

All styling uses Tailwind CSS. Key design decisions:
- **Black background**: `bg-black` for dark mode aesthetic
- **Glass morphism**: `backdrop-blur-md` with `bg-white/5` for frosted glass effect
- **Masonry layout**: `columns-1 sm:columns-2 lg:columns-3` for responsive grid
- **Smooth animations**: `transition-all duration-300` throughout

## Build Configuration

### Vite Config
- React plugin for Fast Refresh
- Build output to `dist/`
- Modern ES modules output

### Tailwind Config
- Custom color scheme
- Responsive breakpoints
- PostCSS for processing

## License

This is a personal project. Feel free to fork and customize for your own use!

## Acknowledgments

Built while learning React 19 and modern web development practices. Special thanks to:
- The Vite team for the amazing build tool
- Tailwind CSS for making styling actually enjoyable
- GitHub Actions for free CI/CD
