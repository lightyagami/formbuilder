# Dynamic Form Builder

This project is a dynamic form builder built with React and TypeScript, utilizing Material-UI for the user interface. It allows users to create, preview, and manage forms with customizable fields and validations. The form configurations are stored in localStorage, enabling persistence across sessions.

## Features

- Create dynamic forms with customizable fields
- Preview forms as they would appear to end users
- Configure individual fields with labels and validation rules
- Reorder and delete fields in the form
- Validate user input based on configured rules
- Persistent storage of form configurations using localStorage

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/lightyagami/formbuilder.git
   ```

2. Navigate to the project directory:

   ```
   cd dynamic-form-builder
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the development server, run:

```
npm run-script start
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build, run:

```
npm run build
```

This will generate a `build` directory with the optimized application.

## Usage

Once the application is running, you can:

- Use the Form Builder to create new forms.
- Preview the forms to see how they will look to end users.
- Edit fields to customize labels and validation rules.
- Save your forms, which will be stored in localStorage for future access.

## License

This project is licensed under the MIT License.
