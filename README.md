<div align="center">
  <img src="./src/assets/logo.svg" alt="JAM Codec Logo" width="400" height="113" />

  # JAM Codec

  **A web-based codec tool for JAM (Join-Accumulate Machine) data structures**

  [![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
  [![Tests](https://img.shields.io/badge/tests-28%20passing-brightgreen)](#)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](#)
  [![React](https://img.shields.io/badge/React-19-blue)](#)
  [![Vite](https://img.shields.io/badge/Vite-7.1-yellow)](#)
</div>

## 🚀 Overview

JAM Codec is a web application that provides live encoding and decoding capabilities for JAM (Join-Accumulate Machine) data structures directly in your browser.

### ✨ Key Features

- **🔄 Live Encoding/Decoding**: Real-time conversion between raw bytes and structured JAM objects
- **📊 Multiple Object Types**: Support for Blocks, Headers, Extrinsics, and many more JAM data structures
- **⚙️ Chain Specification Support**: Compatible with different protocol parameters (Tiny, Full)
- **📁 File Import**: Load binary data directly from files
- **🎯 Auto-Detection**: Intelligent type detection for unknown data

### 🏗️ Supported JAM Object Types

The codec supports a comprehensive range of JAM data structures:

- **Core Objects**: Block, Header, Extrinsic, EpochMarker
- **Assurances**: AvailabilityAssurance, AssurancesExtrinsic
- **Disputes**: Culprit, Fault, Judgement, Verdict, DisputesExtrinsic
- **Guarantees**: Credential, ReportGuarantee, GuaranteesExtrinsic
- **Preimages**: Preimage, PreimageExtrinsic
- **Tickets**: SignedTicket, Ticket, TicketExtrinsic
- **Work Items**: ImportSpec, WorkItem, WorkItemExtrinsicSpec
- **Work Results**: WorkPackage, WorkReport, WorkResult, WorkExecResult
- **Primitive Types**: u8, u16, u24, u32, i8, i16, i24, i32, Bytes, BitVec

## 🛠️ Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7.1
- **Styling**: Tailwind CSS 4.1
- **Testing**: Vitest with Testing Library
- **Code Quality**: Biome for linting and formatting
- **JAM Library**: @typeberry/lib for codec operations
- **UI Components**: Custom components with Lucide React icons

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Development

```bash
# Clone the repository
git clone <repository-url>
cd codec

# Install dependencies
npm ci

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🧪 Testing

The project includes comprehensive test coverage with 28 test cases across all components.

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Coverage

- **Component Tests**: All React components have rendering tests
- **Mock Integration**: Proper mocking of external dependencies
- **Type Safety**: Full TypeScript coverage in tests
- **Build Verification**: Automated build testing

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run test suite
npm run lint         # Run linter and apply fixes
npm run format       # Format code
npm run qa           # Run quality assurance checks
npm run qa-fix       # Fix QA issues automatically
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── Resizable/      # Resizable panel component
│   ├── examples/       # Example data
│   └── *.test.tsx      # Component tests
├── assets/             # Static assets (logo, etc.)
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## 🎯 Usage

1. **Select Object Type**: Choose the JAM object type you want to decode from the dropdown
2. **Choose Chain Spec**: Select the appropriate protocol parameters (Tiny/Full)
3. **Input Data**:
   - Paste hex-encoded bytes directly into the text area
   - Use "From file" to load binary data from a file
   - Try the example buttons for sample data
4. **View Results**: The decoded JSON structure appears in the right panel
5. **Auto-Detection**: If decoding fails, the tool suggests alternative object types

## ⚙️ Configuration

The application supports different chain specifications:

- **Tiny**: Minimal protocol parameters for testing
- **Full**: Complete protocol parameters for production use

## 🔍 Error Handling

- **Invalid Input**: Clear error messages for malformed data
- **Type Detection**: Automatic suggestions for correct object types
- **Validation**: Real-time validation of input data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run qa`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain test coverage for new components
- Use the provided linting and formatting rules
- Ensure all builds pass before submitting PRs

## 📄 License

This project is part of the JAM ecosystem. Please refer to the project's license file for details.

## 🆘 Support

For issues, questions, or contributions:

1. Check existing GitHub issues
2. Create a new issue with detailed information
3. Follow the contribution guidelines

---

<div align="center">
  <p>Built with ❤️ for the JAM ecosystem</p>
  <p>
    <a href="#-quick-start">Get Started</a> •
    <a href="#-testing">Testing</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</div>
