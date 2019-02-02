# Finisher App

This is a simple Electron.js Application that uses Socket.io.

The goal is to use it in the classroom to allow the teachers to check which students have completed the tasks.

The app shows for the students a button to complete some task, when the student click on the button the app sends to "finisher-server" an event to update his status, so the teacher can continue the class when the all students have finished.

---

### Install 
After cloning the repo:
1. Install the dependencies:
```bash
npm install
```
2. Run the application
```bash
npm run start
```

### Build
Execute the following command in the app folder:
```bash
npm run build
```
It creates the folder `release-builds/installers` with the installers for Mac, Linux and Windows.