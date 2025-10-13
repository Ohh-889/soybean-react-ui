# Skyroc UI

<div align="center">

![npm version](https://img.shields.io/npm/v/skyroc-ui.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)
![React](https://img.shields.io/badge/React-19.1.0-blue.svg)

A modern React UI component library built on Radix UI and Tailwind CSS, providing 50+ high-quality components with excellent accessibility and type safety.

[English](./README.md) | [简体中文](./README.zh.md)

</div>

## ✨ Features

- 🎨 **Modern Design** - Beautiful and clean design with support for light and dark themes
- 🧩 **50+ Components** - Comprehensive collection of high-quality React components
- 🔧 **Highly Customizable** - Built with Tailwind CSS, supports theme customization
- 📱 **Responsive** - Mobile-first design that works on all devices
- ♿ **Accessible** - Built on Radix UI, follows WAI-ARIA standards
- 🚀 **TypeScript** - Full TypeScript support with excellent DX
- 📋 **Powerful Forms** - Built-in form system with validation and state management
- 🎯 **Tree Shaking** - Optimized bundle size with tree-shaking support
- 🔄 **SSR Ready** - Perfect support for Next.js and other SSR frameworks

## 📦 Installation

```bash
# npm
npm install skyroc-ui

# pnpm
pnpm add skyroc-ui

# yarn
yarn add skyroc-ui
```

### Tailwind CSS Setup

Install the Tailwind CSS plugin:

```bash
npm install @skyroc/tailwind-plugin
```

Configure in your `tailwind.config.js`:

```js
import { skyroc } from '@skyroc/tailwind-plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/skyroc-ui/dist/**/*.{js,ts,jsx,tsx}'
  ],
  plugins: [skyroc()]
}
```

## 🚀 Quick Start

```tsx
import { Button, Card, Input } from 'skyroc-ui'

function App() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Welcome to Skyroc UI</Card.Title>
      </Card.Header>
      <Card.Content className="space-y-4">
        <Input placeholder="Enter your text" />
        <Button>Submit</Button>
      </Card.Content>
    </Card>
  )
}
```

## 🧩 Components

### Basic Components
- **Button** - Button with various styles and states
- **Input** - Text input with multiple types
- **Card** - Container component
- **Badge** - Status indicators
- **Avatar** - User avatar display
- **Chip** - Compact element for tags
- **Icon** - Icon component with Iconify support

### Layout Components
- **Divider** - Visual separator
- **Breadcrumb** - Navigation breadcrumbs
- **Tabs** - Tabbed interface
- **Collapsible** - Expandable content panels
- **Resizable** - Resizable panel layouts
- **Aspect Ratio** - Maintain aspect ratios
- **Scroll Area** - Custom scrollable areas

### Form Components
- **Form** - Powerful form system
- **Checkbox** - Checkbox input
- **Radio** - Radio button groups
- **Select** - Dropdown select
- **Switch** - Toggle switch
- **Slider** - Range slider
- **Textarea** - Multi-line text input
- **Input OTP** - One-time password input
- **Label** - Form labels

### Feedback Components
- **Alert** - Alert messages
- **Dialog** - Modal dialogs
- **Drawer** - Slide-out panels
- **Sheet** - Bottom sheets
- **Popover** - Floating content
- **Tooltip** - Contextual tooltips
- **Progress** - Progress indicators
- **Skeleton** - Loading placeholders
- **Sonner** - Toast notifications
- **Alert Dialog** - Confirmation dialogs
- **Hover Card** - Hover-triggered cards

### Navigation Components
- **Menu** - Menu component
- **Menubar** - Menu bar
- **Navigation Menu** - Navigation menus
- **Context Menu** - Right-click menus
- **Dropdown Menu** - Dropdown menus

### Data Display
- **Carousel** - Image/content carousel
- **Command** - Command palette
- **Accordion** - Collapsible sections
- **Keyboard Key** - Keyboard shortcut display

### Utility Components
- **ConfigProvider** - Global configuration
- **If** - Conditional rendering helper
- **Toggle** - Toggle button
- **Toggle Group** - Toggle button groups
- **Segment** - Segmented control

## 📖 Documentation

For detailed documentation and live examples, visit:

- **Documentation**: [https://github.com/Ohh-889/skyroc-ui](https://github.com/Ohh-889/skyroc-ui)
- **GitHub**: [https://github.com/Ohh-889/skyroc-ui](https://github.com/Ohh-889/skyroc-ui)

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build the library
pnpm build

# Run linter
pnpm lint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) - For providing excellent headless components
- [Tailwind CSS](https://tailwindcss.com/) - For the powerful styling system
- [shadcn/ui](https://ui.shadcn.com/) - For design inspiration
- [Lucide React](https://lucide.dev/) - For beautiful icons

## 📞 Contact

- Author: Ohh
- Email: 1509326266@qq.com
- GitHub: [@Ohh-889](https://github.com/Ohh-889)

---

<div align="center">

Made with ❤️ by [Ohh](https://github.com/Ohh-889)

If this project helps you, please give it a ⭐️!

</div>

