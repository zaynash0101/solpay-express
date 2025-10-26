# Contributing to SolPay Express

Thank you for your interest in contributing to SolPay Express! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/solpay-express.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit: `git commit -m 'Add some feature'`
7. Push: `git push origin feature/your-feature-name`
8. Open a Pull Request

## 📝 Code Style

### TypeScript
- Use TypeScript strict mode
- No `any` types (use proper typing)
- Use interfaces for object types
- Document complex functions with JSDoc comments

### React
- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use proper prop types

### Naming Conventions
- Components: PascalCase (e.g., `SendPayment.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useBalance.ts`)
- Utilities: camelCase (e.g., `formatWalletAddress`)
- Constants: UPPER_SNAKE_CASE (e.g., `USDC_MINT_ADDRESS`)

### File Organization
```
components/
  ├── features/     # Feature-specific components
  ├── ui/          # Reusable UI components
  ├── wallet/      # Wallet-related components
  └── layout/      # Layout components

hooks/             # Custom React hooks
lib/              # Utility functions
types/            # TypeScript type definitions
```

## 🧪 Testing

Before submitting a PR, ensure:
- [ ] Code compiles without errors
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] All features work on devnet
- [ ] Mobile responsive
- [ ] Tested on multiple browsers

## 🎨 Design Guidelines

- Follow the existing design system
- Use Solana brand colors
- Maintain glassmorphism aesthetic
- Ensure accessibility (ARIA labels, keyboard navigation)
- Test on mobile devices

## 📦 Pull Request Process

1. Update README.md if needed
2. Update documentation for new features
3. Ensure PR description clearly describes changes
4. Link related issues
5. Request review from maintainers

## 🐛 Bug Reports

Use GitHub Issues with:
- Clear title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (browser, OS, wallet)

## 💡 Feature Requests

- Check existing issues first
- Clearly describe the feature
- Explain the use case
- Consider implementation approach

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions make SolPay Express better for everyone!
