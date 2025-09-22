# Matthew C. Brumagin - Portfolio

A professional portfolio website showcasing my experience as a Senior Software Engineer, built using my zero-dependency micro-js/micro-js-html framework.

# TODO before go-live
- remove server-side? host directly on s3?
- triple check wording and structure
- update sections to more directly reflect current resume
- downloadable pdf (other doc types?) of resume
- possibly remove or condense redundant or TMI sections
- add tooltips or color-codes explaining relative experience of skills?
- touchup README
- push up version 1 to git
- host on s3
- configure/test basic SEO
- wire up mcbrumagin.com and go-live
- configure google analytics to track landings, etc
  - track resume downloads and portfolio/project clicks as the main goals

## 🚀 What's under the hood?

- **Framework**: micro-js + micro-js-html
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Fast Loading**: Lightweight for optimal performance

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Access to micro-js and micro-js-html dependencies (npm)

### Setup & Run

1. Make sure Node.js is installed (v14 or higher)
2. Clone and navigate to the portfolio directory
3. Install server/client dependencies:
   ```bash
   ./install.sh
   ```
4. Start the server:
   ```bash
   ./run.sh
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:3000/portfolio/
   ```

The server will run on port 3000 (configured via SERVICE_REGISTRY_ENDPOINT).


## 🧪 Testing

Run the test suite to validate components:

```bash
# The test suite runs automatically when the page loads
# Check browser console for test results
```

Tests cover:
- Utility function validation
- Component structure verification
- Data integrity checks
- Route configuration validation

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Desktop (1200px+)
- Tablet (768px - 1199px)  
- Mobile (< 768px)
- Small Mobile (< 480px)

## 🔧 Customization

### Adding New Sections

1. Create a new component in `client/sections/`
2. Add the route in `client/app.js`
3. Include the script tag in `server/index.js`
4. Update navigation in `client/nav.js`

### Modifying Styles

- Main styles: `client/resources/styles.css`
- Mobile styles: `client/resources/mobile.css`
- CSS custom properties for easy theme customization

## 📈 Performance

- Lightweight framework with minimal dependencies
- Optimized CSS with efficient selectors
- Lazy loading of components
- Mobile-first responsive design
- Efficient DOM manipulation

## 🤝 Professional Focus

This portfolio demonstrates:
- **Full-Stack Development**: Complete application architecture
- **Modern Web Standards**: Semantic HTML, responsive CSS, progressive enhancement
- **Code Quality**: Clean, maintainable, and well-documented code
- **User Experience**: Professional design with accessibility considerations
- **DevOps Practices**: Structured project organization and deployment readiness
