# Contributing to VSCode AI Tools Database

Thank you for your interest in contributing to the VSCode AI Tools database! This project aims to create a comprehensive, searchable database of AI tools available for Visual Studio Code.

## How to Contribute

There are several ways to contribute to this project:

1. **Add new tools** to the database
2. **Update existing tool information**
3. **Fix bugs** or improve the website functionality
4. **Enhance documentation**

## Adding or Updating Tools in the Database

The main database is stored in `src/data/tools.json`. This is the primary file that contributors will work with.

### Tool Data Structure

Each tool in the database should follow this structure:

```json
{
  "id": 123,
  "name": "Tool Name",
  "description": "A concise description of the tool (1-2 sentences).",
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

### Field Guidelines

- **id**: A unique numeric identifier. Check the existing tools and use the next available number.
- **name**: The official name of the tool.
- **description**: A concise description (1-2 sentences) explaining what the tool does.
- **marketplaceLink**: Link to the VS Code marketplace page (if available). Use `null` if not applicable.
- **homepageLink**: Link to the tool's official homepage.
- **demoLink**: Link to a demo, tutorial, or video showcasing the tool. Use `null` if not available.
- **githubLink**: Link to the GitHub repository (for open source tools). Include this only for open source tools.
- **company**: The company or organization that develops the tool.
- **tags**: An array of keywords that describe the tool's category or purpose.
- **features**: An array of specific features the tool offers.
- **pricing**: One of: "Free", "Freemium", "Paid", or "Varies" for tools with multiple pricing models.
- **logoUrl**: Path to the tool's logo in the format `/logos/ToolLogo.png`. Place the logo file in the `/public/logos/` directory.
- **type**: Either "VSCode Extension" or "VSCode Fork".
- **isOpenSource**: Boolean value (`true` or `false`) indicating if the tool is open source.

### Adding a New Tool

1. **Fork this repository**
2. **Clone your fork** to your local machine
3. **Add the tool information** to `src/data/tools.json`:
   - Use the next available ID number
   - Follow the data structure outlined above
   - Ensure all required fields are filled
4. **Add the tool's logo**:
   - Save the logo image in the `/public/logos/` directory
   - Use a transparent PNG or SVG format if possible
   - Keep the file size reasonable (< 100KB)
   - Name the file consistently (e.g., `ToolName.png`)
5. **Test your changes** by running the project locally
6. **Commit and push** your changes to your fork
7. **Submit a pull request** to the main repository

### Updating an Existing Tool

Follow the same process as adding a new tool, but modify the existing entry instead of adding a new one. Make sure to:

1. Keep the same `id` for the tool
2. Update only the fields that need changing
3. Provide a clear explanation in your PR about what information was updated and why

## Running the Project Locally

To test your changes locally:

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Pull Request Process

1. Ensure your PR includes only changes related to a single tool or feature
2. Update the README.md if necessary
3. Your PR should pass all automated checks
4. A maintainer will review your PR and may request changes
5. Once approved, your changes will be merged

## Style Guidelines

### JSON Formatting

- Use 2 spaces for indentation
- Use double quotes for strings
- Ensure the JSON is valid (you can use tools like JSONLint to validate)
- Keep descriptions concise but informative

### Commit Messages

- Use clear, descriptive commit messages
- Start with a verb in the present tense (e.g., "Add", "Update", "Fix")
- Reference issue numbers if applicable

Example: `Add Tabnine AI tool (#42)`

## Code of Conduct

Please be respectful and constructive in all interactions. We aim to foster an inclusive and welcoming community.

## Questions?

If you have any questions or need help with your contribution, please open an issue or reach out to the maintainers.

Thank you for contributing to the VSCode AI Tools Database!
