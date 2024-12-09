# Description
The application is designed to manage user tasks. It offers a user-friendly and intuitive interface along with authentication mechanisms to ensure data security and privacy. Thanks to MongoDB integration, data is stored efficiently and securely, and the application can be accessed from any device with a web browser. The project was developed using Next.js 14.2.15.

The application was created for educational purposes and to showcase the potential of various technologies and libraries. The implemented solutions may differ from optimal choices used in commercial production applications. The goal of this project is to facilitate learning and experimentation with modern frontend and backend technologies.

You can test the app using this adress: https://notqe.vercel.app

## Application Features
1. Database / MongoDB
* Contains two collections: users and tasks.
* Utilizes a reference pattern, linking users to their tasks.
* Indexing has been implemented to enhance task search performance.
  
2. Backend
* Uses route.js files available in Next.js to handle HTTP requests.
* User registration.
* User login and logout.
* Task management (adding, deleting, modifying).
* Authentication data is stored in two tokens (main and refresh).
* Automatic token refreshing. When both tokens expire, the user is logged out and redirected to the login panel.
* Tokens are stored in cookies for enhanced security.
  
3. Frontend
* Routing: Dynamic and static routing using Next.js capabilities.
* Next-Font - optimizing and managing fonts.
* `axios` – to create instances and use interceptors for token refreshing.
* `clsx` – to dynamically manage CSS classes.
* `react-icons` – for convenient icon additions to the interface.
* `react-responsive` – to ensure interface responsiveness.
* `react-spinners` – for adding loading animations.
* `redux/context` – for global state management.

4. Styling
* SCSS – A modular styling approach was implemented to ensure better code organization, reduced volume, and improved readability. The application includes dedicated style files, such as:
  * Typography – Defines styles for text elements.
  * Reset – Removes default browser styles for consistency.
  * Global styles – Contains general CSS rules applied throughout the application.
  * Variables – Stores style variables (e.g., colors, spacing).
* BEM – The Block-Element-Modifier methodology was applied to create a clear, modular, and easily scalable structure for CSS class naming.

### How to run the application locally:

1. Install Node.js (Node is required, skip this step if you already have).
   * Node website: https://nodejs.org/en
3.  Clone the repository:
```
 git clone https://github.com/fedu00/notqe.git
```
3. Navigae to app folder:
```
cd notqe
```
4. Set environment variable: 
   * this app using vercel hoisting, to run this app locally you need to set the constant `NEXT_PUBLIC_BASE_URL=http://localhost:3000` in `.env` file
 
5. Install dependencies: 
```
npm install
```
6. Start the application:
```
npm run dev
```
7. Access the app:
   Open your browser and go to http://localhost:3000.
