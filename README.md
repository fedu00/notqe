Application designed to manage your own tasks, includes a user-friendly interface and user authentication to ensure data privacy and security. The backend is configured with MongoDB, to store data. You can access your tasks from any device with a web browser. Application created using Next.js14.1.3.

You can test the app using this adress: https://notqe.vercel.app

Key features

- Users can create accounts, log in, and securely manage their tasks.
- Some data is stored in the browser's memory and cookies, page reload or interruption of the Internet connection, which is not removed from the previous progress.
- The user can easily create, delete and edit tasks.
- Progress from completed tasks is available in the "experience" tab.

Frontend

- Next.js
- Typescript
- axios
- react icons
- react responsive
- react-spinners

Backend

- MongoDB
- Mongoose
- bcrypt.js
- jsonwebtoken
- Typescript

How to run the application locally:

1. clone repository : git clone (totaj wpisasz adres nie)
2. go to app folder: cd notqe
3. this app using free vercel hoisting, to run this app locally you need to change "notqe.vercel.app" to "localhost:3000" in project files
4. install project: npm install
5. run the app: npm run dev
