# Design Guidelines: Product Search Test Results Dashboard

## Design Approach
**Selected Approach:** Design System (Data-Focused Dashboard)

Drawing inspiration from Linear's clean data presentation, Stripe Dashboard's analytics clarity, and modern BI tools' visual hierarchy. This utility-focused interface prioritizes efficient data consumption and quick insights extraction.

**Core Principles:**
- Data clarity over decorative elements
- Efficient information density without overwhelming
- Quick pattern recognition through consistent visual language
- Actionable insights highlighted prominently

## Color Palette

**Dark Mode (Primary)**
- Background: 222 15% 8%
- Surface: 222 15% 12%
- Surface Elevated: 222 15% 16%
- Border: 222 10% 24%
- Text Primary: 222 5% 95%
- Text Secondary: 222 5% 70%
- Text Muted: 222 5% 50%

**Status Colors**
- Success: 142 76% 45% (green for successful queries)
- Warning: 38 92% 50% (amber for timeouts)
- Error: 0 84% 60% (red for errors)
- Info: 217 91% 60% (blue for in-progress)

**Accent Colors**
- Primary: 217 91% 60% (blue for interactive elements)
- Primary Hover: 217 91% 55%

## Typography

**Font Families:**
- Primary: 'Inter', system-ui, sans-serif (for UI and data)
- Monospace: 'JetBrains Mono', monospace (for JSON snippets, IDs)

**Hierarchy:**
- Page Title: text-3xl font-semibold
- Section Headers: text-xl font-semibold
- Card Titles: text-base font-medium
- Body Text: text-sm font-normal
- Metadata: text-xs text-muted-foreground
- Numbers/Stats: font-mono for precision

## Layout System

**Spacing Units:** Use Tailwind units of 2, 4, 6, 8, 12, and 16 for consistent rhythm

**Container Structure:**
- Max width: max-w-7xl mx-auto
- Page padding: px-4 md:px-6 lg:px-8
- Section spacing: space-y-8
- Card padding: p-6
- Dense sections: p-4

**Grid System:**
- Stats Grid: grid-cols-2 md:grid-cols-4 gap-4
- Product Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Query Results: Single column with expandable rows

## Component Library

### Dashboard Header
- File upload zone with drag-drop and click functionality
- Test run metadata displayed prominently (date, queries completed, status)
- Progress indicator for in-progress tests

### Statistics Overview Cards
- 4-column grid showing key metrics
- Large numbers with labels
- Visual indicators (icons/colors) for metric type
- Subtle background differentiation

### Query Results List
- Accordion/expandable rows for each query
- Query text prominently displayed
- Status badge (success/timeout/error) with appropriate color
- Timestamp and product count as metadata
- Expand to reveal products

### Product Cards (within query results)
- Product image (left side, fixed aspect ratio 4:5)
- Product details (right side):
  - Name (font-medium)
  - Brand/Retailer (text-sm text-muted)
  - Price (font-mono font-semibold)
- Score visualization:
  - Progress bar showing match percentage
  - Numerical score displayed
  - Color-coded (gradient from red to green)
- Key strengths as badges/pills
- Expandable reasoning section

### Data Visualization
- Horizontal bar charts for score comparisons
- Donut chart for success rate visualization
- Line indicators for progress tracking

### Search & Filter Controls
- Search bar for query filtering
- Status filter chips (All, Success, Timeout, Error)
- Sort options (Score, Price, Date)

### Status Indicators
- Color-coded badges for query status
- Icon + text combination
- Consistent sizing: px-3 py-1 rounded-full text-xs

## Animations
Use sparingly for functional feedback only:
- Accordion expand/collapse: transition-all duration-200
- Hover states: transition-colors duration-150
- Loading states: subtle pulse animation
- No decorative or scroll-triggered animations

## Images
**Product Images:**
- Display within product cards
- Aspect ratio: 4:5 (product photography standard)
- Object-fit: cover
- Rounded corners: rounded-lg
- Lazy loading for performance
- Placeholder during load: bg-surface-elevated

**No Hero Image:** This is a dashboard application - lead immediately with data and functionality, not marketing visuals.

## Special Considerations

**JSON Display:**
- Code blocks with syntax highlighting
- Copy-to-clipboard functionality
- Collapsible for long content
- Monospace font with line numbers

**Responsive Behavior:**
- Mobile: Stack all elements, full-width cards
- Tablet: 2-column grids where appropriate
- Desktop: Full multi-column layouts, side-by-side comparisons

**Data Density:**
- Desktop: High information density with detailed views
- Mobile: Condensed cards, tap to expand for details
- Progressive disclosure pattern throughout

**Empty States:**
- Clear upload instructions when no data loaded
- "No results" messaging with helpful actions
- Loading skeletons during data processing