# TypeScript To-Do List Web App

## Repository Description

A simple, type-safe To-Do List web app built with TypeScript, HTML, and CSS. Features include adding, editing, and deleting tasks with inline editing, completion checkboxes, creation dates, and localStorage persistence. Ideal for learning TypeScript in a practical web development context.

## README

# TypeScript To-Do List Web App

A minimalist web application for managing tasks, built with TypeScript, HTML, and CSS. This project demonstrates TypeScript's type safety in a browser-based environment, with features like adding, editing, and deleting tasks, marking tasks as completed, displaying creation dates, and persisting data in localStorage. The app uses inline editing for a seamless user experience and is styled for responsiveness.

### Features

- **Add Tasks**: Create new tasks with a description and automatic creation date.
- **Edit Tasks**: Modify tasks inline using an input field (no popups).
- **Delete Tasks**: Remove tasks with a single click.
- **Complete Tasks**: Toggle task completion with checkboxes.
- **Creation Date**: Display when each task was created.
- **LocalStorage**: Persist tasks across browser sessions.
- **Type-Safe**: Built with TypeScript for robust type checking.
- **Responsive UI**: Clean, mobile-friendly design with CSS.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [TypeScript](https://www.typescriptlang.org/) (`npm install -g typescript`)
- A modern web browser (e.g., Chrome, Firefox)
- Optional: `live-server` for live reloading (`npm install --save-dev live-server`)

### Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/waleedahmad4015/Todo-typescript.git
   cd Todo-typescript
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Compile TypeScript**:

   - Ensure `tsconfig.json` is configured with:
     ```json
     {
       "compilerOptions": {
         "target": "ES6",
         "module": "ESNext",
         "outDir": "./dist",
         "lib": ["DOM", "ES6"],
         "strict": true
       }
     }
     ```
   - Run:
     ```bash
     tsc
     ```

4. **Run the App**:
   - Option 1: Use `live-server` for live reloading:
     ```bash
     npm start
     ```
     (Requires `package.json` script: `"start": "live-server --open=index.html"`)
   - Option 2: Open `index.html` directly in a browser.
   - Option 3: Run command `npx live-server` in terminal.

### Usage

1. Open the app in a browser.
2. **Add a Task**: Enter a task description in the input field and click "Add Task".
3. **Edit a Task**: Click the "Edit" button, modify the task in the inline input, and click "Save".
4. **Complete a Task**: Check the checkbox to mark a task as completed (strikethrough applied).
5. **Delete a Task**: Click the "Delete" button to remove a task.
6. **Persistence**: Tasks are saved in localStorage and persist after browser refresh.
7. View the creation date displayed with each task.

### Project Structure

```
typescript-todo-app/
├── dist/                # Compiled JavaScript files
├── src/
│   └── index.ts        # TypeScript logic (task management, DOM handling)
│   └── global.css       # CSS for styling the app
├── index.html          # HTML structure for the UI
├── package.json        # Node.js project configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

### Technologies Used

- **TypeScript**: For type-safe JavaScript with interfaces and DOM typing.
- **HTML/CSS**: For the UI and responsive styling.
- **localStorage**: For persistent task storage.
- **ES Modules**: For modern JavaScript module imports.

### Contributing

Contributions are welcome! Please:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

### License

This project is licensed under the MIT License.

### Acknowledgments

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) for type safety guidance.
- [MDN Web Docs](https://developer.mozilla.org/) for DOM and localStorage references.
