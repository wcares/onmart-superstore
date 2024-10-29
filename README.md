# OnMart Superstore - Phase 2 Documentation

## Design Patterns Implementation

### 1. Layout of Screen Elements Design Patterns
Our implementation uses the following layout patterns:

a) **Z-Pattern Layout** (implemented in Header.tsx)
- Why: Used for the main navigation to follow natural eye movement patterns
- Elements are placed in a Z-shaped pattern: logo (top left), navigation links (top right), main content
- Enhances scanability and usability of the interface

b) **Two-Panel Selector** (implemented in Home.tsx)
- Why: Creates clear separation between filtering options and main content
- Left panel: Filters and categories
- Right panel: Product display and interactive elements
- Helps users focus on either browsing or refining their selection

c) **Card Grid Layout** (implemented in ProductGrid.tsx)
- Why: Provides consistent and organized presentation of products
- Makes scanning and comparing products easier
- Maintains visual hierarchy and spacing

### 2. Chunking Information Design Patterns
Implemented various chunking patterns to organize information effectively:

a) **Card-Based Chunking** (ProductCard.tsx)
- Why: Breaks down product information into digestible chunks
- Each card contains: image, name, price, and action button
- Makes information easier to scan and comprehend

b) **Category Groups** (Sidebar.tsx)
- Why: Organizes filters into logical groups
- Separates price filters from category filters
- Reduces cognitive load when filtering products

c) **Progressive Disclosure** (implemented in layout structure)
- Why: Prevents information overload
- Shows detailed product information only when necessary
- Maintains clean and uncluttered interface

### 3. Lists and Commands/Actions Design Patterns
Implemented several patterns for displaying lists and actions:

a) **Action Buttons** (Button.tsx)
- Why: Provides clear and consistent interaction points
- Primary actions (Add to Cart) are prominently displayed
- Secondary actions are visually distinct

b) **Sortable Lists** (ProductGrid.tsx)
- Why: Allows users to organize information according to their needs
- Consistent layout for product listings
- Clear visual hierarchy

c) **Command Patterns** (QuickOrderForm.tsx)
- Why: Makes actions obvious and accessible
- Consistent button placement and styling
- Clear feedback for user actions

### 4. Interactive Information Graphic Design Patterns
Implemented visual feedback and interactive elements:

a) **Progress Indicators** (StockLevelIndicator.tsx)
- Why: Provides visual representation of stock levels
- Makes it easy to quickly assess product availability
- Uses color and size to convey information

b) **Interactive Filters** (Sidebar.tsx)
- Why: Provides immediate visual feedback
- Makes the filtering process more intuitive
- Helps users understand available options

### 5. Forms and Controls Design Patterns
Implemented user-friendly form patterns:

a) **Form Layout Pattern** (QuickOrderForm.tsx)
- Why: Creates a logical flow for data entry
- Groups related fields together
- Clear labels and input fields

b) **Input Controls** (throughout forms)
- Why: Provides appropriate input methods for different data types
- Uses select dropdowns for predefined options
- Number inputs for quantity
- Text areas for addresses

c) **Feedback Patterns**
- Why: Helps users understand system status
- Clear button states (hover, active)
- Visual feedback for interactions

## Implementation Notes
This is a low-fidelity prototype focusing on structure and interaction patterns. The implementation:
- Uses placeholder images and mock data
- Implements basic interactivity
- Focuses on layout and organization
- Demonstrates key design patterns
- Prepares for full implementation in Phase 3