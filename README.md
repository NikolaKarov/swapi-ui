# SWAPI Explorer

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd swapi-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   # Make sure the backend server is running on http://localhost:3333
   # This should provide the Star Wars API endpoints
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

6. **Login to access data**
   ```
   Use the login page to authenticate and access the Star Wars data
   ```

## Project Functionality

**SWAPI Explorer** is a comprehensive Star Wars API interface built with Next.js and Material-UI. The application provides an intuitive way to explore the Star Wars universe through organized data sections.

### Core Features

- **Authentication System**: Secure login/logout functionality with token-based authentication
- **People Explorer**: Browse Star Wars characters with detailed profiles including species, homeworld, and film appearances
- **Planets Database**: Explore planetary systems with comprehensive information about climate, terrain, and inhabitants
- **Starships Catalog**: Discover the galaxy's vessels with technical specifications, crew capacity, and operational details
- **Films Archive**: Access complete movie information including cast, crew, and production details

### Advanced Functionality

- **Smart Search & Filtering**: Real-time search with debounced input and dropdown filters for precise data discovery
- **Multi-Column Sorting**: Organize data by various attributes with ascending/descending order options
- **Server-Driven Pagination**: Efficient navigation through large datasets with previous/next controls
- **Responsive Design**: Optimized experience across desktop and mobile devices using Material-UI components
- **Client-Side Routing**: Seamless navigation between sections and detailed views without page reloads

### Technical Architecture

- **Modular Component System**: Reusable UI components (DetailsTable, MainTable, Pagination, Sort, Filter) for consistent user experience
- **Organized File Structure**: Clean separation of concerns with dedicated folders for table pages, detail pages, types, and constants
- **Type-Safe Development**: Full TypeScript implementation ensuring robust code quality and developer experience