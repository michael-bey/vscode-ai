# VSCode AI Tools Database

A searchable, taggable website comparing AI tools for Visual Studio Code. This project aims to provide developers with a comprehensive resource to discover and compare various AI-powered extensions and forks for VSCode.

![VSCode AI Tools](bubble.gif)

## 🚀 Features

- **Searchable Database**: Find AI tools by name, description, or specific features
- **Filtering Options**: Filter tools by type (VSCode Extension or VSCode Fork), pricing, and open/closed source
- **Interactive Views**:
  - Card View: Detailed information about each tool
  - Bubble View: Interactive visualization of tools with animated logos
- **Comprehensive Information**: Each tool entry includes:
  - Description
  - Links (Marketplace, Homepage, Demo)
  - Pricing model
  - Features and capabilities
  - Open source status


## 📊 Project Structure

```
vscode-ai-tools/
├── public/                # Static assets
│   └── logos/             # Tool logos
├── src/
│   ├── components/        # React components
│   ├── data/              # Data files
│   │   └── tools.json     # Main database of AI tools
│   ├── pages/             # Page components
│   └── App.jsx            # Main application component
└── ...
```

## 🤝 Contributing

We welcome contributions to expand and improve the database of AI tools! The main way to contribute is by adding or updating tools in the `tools.json` file.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions on how to contribute.

## 📝 Adding a New Tool

The easiest way to contribute is by adding a new AI tool to the database. Each tool entry should include:

```json
{
  "id": 123,
  "name": "Tool Name",
  "description": "A concise description of the tool.",
  "marketplaceLink": "https://marketplace.visualstudio.com/items?itemName=publisher.extension",
  "homepageLink": "https://tool-homepage.com",
  "demoLink": "https://link-to-demo.com",
  "githubLink": "https://github.com/repo/tool",
  "company": "Company Name",
  "tags": ["tag1", "tag2", "tag3"],
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "pricing": "Free/Freemium/Paid",
  "logoUrl": "/logos/ToolLogo.png",
  "type": "VSCode Extension",
  "isOpenSource": true
}
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for more detailed information.

## 🛠️ Built With

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Material-UI](https://mui.com/) - Component library
- [React Router](https://reactrouter.com/) - Routing

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🚀 Deployment

This project is deployed to Netlify and accessible at [vscode.ai](https://vscode.ai).

### Automatic Deployment

The site is automatically deployed using Netlify's continuous deployment whenever changes are pushed to the main branch. The deployment workflow:

1. Builds the React application using Vite
2. Deploys the built files to Netlify's global CDN
3. Configures the custom domain (vscode.ai)

### Deployment Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/b2e24ab0-ed54-483b-9e82-4c84561c9e68/deploy-status)](https://app.netlify.com/sites/vscode-ai/deploys)


## 🙏 Acknowledgments

- All the amazing developers of VSCode AI tools
- The open source community
