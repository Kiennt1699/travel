# Tripzy - Travel Booking Application

A modern, responsive travel booking web application built with Next.js, React, and Ant Design. Tripzy allows users to search and book bus tickets, hotels, and flights with an intuitive and clean user interface.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm, npm, or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd travel-booking

# Install dependencies
pnpm install
# or
npm install
# or
yarn install
```

### Running the Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

```bash
pnpm build
# or
npm run build
# or
yarn build
```

### Starting Production Server

```bash
pnpm start
# or
npm start
# or
yarn start
```

### Linting

```bash
pnpm lint
# or
npm run lint
# or
yarn lint
```

## 🏗️ Architecture & Technical Decisions

### Technology Stack

#### Core Framework
- **Next.js 16.0.3** - React framework with App Router for server-side rendering, routing, and optimization
- **React 19.2.0** - Modern React with latest features and performance improvements
- **TypeScript 5** - Type safety and better developer experience

#### UI Framework & Styling
- **Ant Design 5.21.0** - Comprehensive UI component library providing:
  - Form components with built-in validation
  - DatePicker with time selection
  - AutoComplete for location search
  - Consistent design system
- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development
- **Custom CSS** - Global styles and component-specific styling in `globals.css`

#### Date & Time Management
- **Day.js 1.11.13** - Lightweight date manipulation library (alternative to Moment.js)
  - Used for date formatting, parsing, and validation
  - Custom date picker configuration for travel booking needs

#### Icons
- **React Icons 5.5.0** - Icon library providing:
  - Bus icons (FaBusAlt)
  - Search icons (IoSearch)
  - Business/Hotel icons (IoIosBusiness)
  - Flight icons (RiFlightTakeoffFill)

### Key Technical Decisions

#### 1. **Component Architecture**
- **Modular Component Structure**: Components are organized by feature (HomePage, SearchPage) and type (common, form)
- **Custom Hooks**: `useBusSearchForm` encapsulates form logic and state management
- **Separation of Concerns**: 
  - Form logic in hooks
  - Validation in utils
  - Styling in lib/config files
  - Data in JSON files

#### 2. **Form State Management**
- **Ant Design Form**: Leverages Ant Design's Form component for built-in validation and state management
- **Controlled Components**: Location inputs use controlled state for filtering while Form.Item manages form state
- **Circular Reference Prevention**: 
  - Local state (`fromValue`, `toValue`) used only for filtering
  - Form state managed by Form.Item automatically
  - `onValuesChange` handler syncs local state when form values change (e.g., swap)

#### 3. **Validation Strategy**
- **Custom Validators**: Reusable validator functions in `utils/validators.ts`
- **Cross-field Validation**: Prevents same origin and destination
- **Date Validation**: Ensures departure date is in the future and return date is after departure
- **Passenger Validation**: Enforces min (1) and max (9) passenger limits

#### 4. **Routing & Navigation**
- **Next.js App Router**: File-based routing with `app/` directory
- **URL Query Parameters**: Search parameters passed via URL for shareable links
  - Format: `/search?mode=bus&from=Location&to=Location&dep=YYYY-MM-DD HH:mm&ret=...&pax=N`

#### 5. **Performance Optimizations**
- **React Compiler**: Enabled in `next.config.ts` for automatic optimization
- **useCallback**: Memoized handlers to prevent unnecessary re-renders
- **Code Splitting**: Next.js automatic code splitting
- **Suspense**: Used for search results page with loading skeleton

#### 6. **Styling Approach**
- **CSS Classes over Inline Styles**: Search results use CSS classes for maintainability
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Custom CSS Variables**: Theme colors and styles centralized in `lib/theme.ts` and `lib/styles.config.ts`

## 📁 Project Structure

```
travel-booking/
├── app/                          # Next.js App Router
│   ├── data/
│   │   └── location.json        # Location data (cities, countries)
│   ├── search/
│   │   └── page.tsx             # Search results page
│   ├── globals.css              # Global styles and component styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page with search form
├── components/
│   ├── common/
│   │   └── SearchSkeleton.tsx   # Loading skeleton component
│   ├── HomePage/
│   │   ├── form/                # Form field components
│   │   │   ├── DatePickerField.tsx
│   │   │   ├── LocationInput.tsx
│   │   │   ├── PassengerInput.tsx
│   │   │   └── SwapButton.tsx
│   │   ├── BusSearchForm.tsx    # Main search form
│   │   ├── CustomTabs.tsx       # Tab navigation (Bus/Hotel/Flight)
│   │   ├── Header.tsx           # Page header with logo and title
│   │   ├── Logo.tsx             # Tripzy logo component
│   │   ├── NoDataPlaceholder.tsx
│   │   └── TravelContain.tsx    # Hero section with title
│   └── SearchPage/
│       └── SearchResults.tsx    # Search results display
├── hooks/
│   └── useBusSearchForm.ts      # Custom hook for form logic
├── lib/
│   ├── datepicker.config.tsx    # DatePicker configuration
│   ├── styles.config.ts         # Style constants
│   └── theme.ts                 # Theme colors and configuration
├── utils/
│   ├── dateHelpers.ts           # Date utility functions
│   └── validators.ts            # Form validation functions
└── public/                      # Static assets
```

## ✨ Features Implemented

### 1. **Multi-Tab Search Interface**
- Three tabs: Bus & Shuttle, Hotel & Accommodation, Flight
- Active tab highlighting with custom styling
- Smooth tab transitions

### 2. **Bus Search Form**
- **Location Selection**:
  - AutoComplete with searchable location list
  - Full location names displayed in dropdown (with multiline support)
  - Tooltip on hover for long location names
  - Validation to prevent same origin and destination
  - Swap button to exchange From/To locations
  
- **Date Selection**:
  - DatePicker with time selection
  - Departure date validation (must be in future)
  - Optional return date (for round trips)
  - Return date validation (must be after departure)
  - Custom date formatting and display
  
- **Passenger Selection**:
  - Number input with increment/decrement buttons
  - Validation (1-9 passengers)
  
- **Round Trip Option**:
  - Checkbox to enable/disable return date field

### 3. **Search Results Page**
- Displays all search parameters:
  - From/To locations
  - Departure date (formatted: "Month DD, YYYY at HH:mm")
  - Return date or "One way trip"
  - Number of passengers
- Clean, professional layout with:
  - No dividers between rows
  - Generous spacing (20px padding per row)
  - Close label-value spacing (12px gap)
  - Responsive design
- Loading skeleton that matches the final layout

### 4. **Form Validation**
- Required field validation
- Cross-field validation (origin ≠ destination)
- Date validation (future dates, logical ordering)
- Passenger count validation (1-9 range)

### 5. **User Experience Enhancements**
- Loading states with skeleton screens
- Smooth animations and transitions
- Responsive design (mobile, tablet, desktop)
- Accessible form labels and inputs
- Clear visual feedback on interactions

## 🎨 Design System

### Color Palette
- **Primary**: Cyan (#06b6d4) - Main brand color
- **Text Primary**: Dark gray (#1e293b)
- **Text Secondary**: Medium gray (#64748b)
- **Background**: Light blue gradient (sky-100 to white)

### Typography
- Font family: Geist Sans (via Next.js font optimization)
- Headings: Bold, large sizes
- Body text: Regular weight, readable sizes

### Component Styling
- Rounded corners (10-16px border-radius)
- Subtle shadows for depth
- Smooth transitions (0.3s cubic-bezier)
- Hover effects on interactive elements

## 🔧 Configuration Files

### `next.config.ts`
- React Compiler enabled for automatic optimizations

### `tsconfig.json`
- Strict TypeScript configuration
- Path aliases (`@/*` for root imports)
- ES2017 target with modern module resolution

### `globals.css`
- Tailwind CSS imports
- Custom component styles
- Responsive breakpoints
- Animation keyframes


## 📄 License

This project is private test for FE test only.


