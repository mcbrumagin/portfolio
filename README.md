# Matthew C. Brumagin - Portfolio

My portfolio website showcasing my experience as a Senior Software Engineer, built using my zero-dependency micro-js/micro-js-html framework.



## 🚘 What's under the hood?

- **Framework**: micro-js + micro-js-html
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Fast Loading**: Lightweight for optimal performance



## 🚦 Getting Started

### Setup & Run

1. Make sure Node.js is installed (v18+)
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

The server will run on port 3000 (configured via MICRO_REGISTRY_URL).



## 🚀 Infrastructure and CI/CD

This project uses **Terraform** for infrastructure-as-code and **GitHub Actions** for automated deployments.

### Infrastructure Overview

- **AWS**: All resources are provisioned in your AWS account.
- **EC2 Instances**: ARM-based t4g.nano for cost efficiency.
- **ECS Cluster**: Runs Docker containers for each environment.
- **Application Load Balancer (ALB)**: Routes traffic by hostname.
- **Route53**: Manages DNS records for your domain and subdomains.
- **SSL Certificate**: Single certificate covers all subdomains.

### Deployment Workflow

For detailed infrastructure steps, see [`terraform/README.md`](terraform/README.md).



## 🧪 Testing

Run the test suite to validate components:

- Uncomment `script({ src: '/assets/test.js' })` in server/index.js
- The test suite runs automatically in the console when the page loads

Tests cover:
- Utility function validation
- Component structure verification
- Data integrity checks
- Route configuration validation



## 🔧 Customization

### Adding New Sections

1. Create a new component in `client/sections/`
2. Add the route in `client/app.js`
3. Include the script tag in `server/index.js`
4. Update navigation in `client/nav.js`

