#  CodeLogic — Admin Control Panel

[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-3.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vuexy](https://img.shields.io/badge/UI_Architecture-Vuexy-7367F0?logo=bootstrap&logoColor=white)](#)
[![React Query](https://img.shields.io/badge/React_Query-5.90-FF4154?logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)

The CodeLogic Admin Panel is the centralized, high-performance command center for the CodeLogic educational platform. Engineered using React, Vite, and a heavily customized Vuexy architecture, it provides administrators with complete authority over every aspect of the Learning Management System (LMS) through an intuitive and data-rich interface.

 Live Dashboard: [CodeLogic Admin Workspace](https://codelogic-adminpanel-project.netlify.app/)



##  Core Management Modules

This dashboard is tightly integrated with a robust backend architecture, handling extensive CRUD operations and complex data relations across multiple domains:

###  Academic & LMS Management
- Course Management: Complete lifecycle control over courses, pricing, capacity, and syllabus details.
- Term Management: Define and organize academic terms and semesters.
- Schedule Management: Advanced timetables and event tracking using @fullcalendar.

###  Infrastructure Management
- Building & Department Management: Map out and manage physical campus locations and faculties.
- Classroom Management: Allocate rooms, track capacities, and manage physical teaching spaces.

###  Community & Engagement
- User Management: Role-based access control (RBAC), student/teacher profiles, and activity monitoring.
- Comments Management: Moderation tools for course reviews and user feedback.
- News Management: Built-in CMS with rich text editing for platform announcements and tech blogs.
- Notification Management: Dispatch targeted or system-wide alerts to users.


##  Tech Stack & Ecosystem

Built for scale and rapid data processing, the admin panel leverages a massive ecosystem of specialized libraries:

- Core & Build: React 18, Vite
- UI Foundation: Customized Vuexy Template, Reactstrap (Bootstrap 5), Styled Components
- State & Data Fetching: Redux Toolkit, @tanstack/react-query, Axios
- Forms & Validation: react-hook-form, Formik, Yup
- Data Visualization: Chart.js, Recharts
- Advanced UI Components: 
  - react-data-table-component (Grids & Tables)
  - react-hot-toast (Alerts)
  - react-dropzone (File Uploads)
  - leaflet (Maps)



##  Getting Started

Follow these steps to run the administrative dashboard locally.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Reza97312/CodeLogic-AdminPanel.git
cd CodeLogic-AdminPanel
```

2. Install dependencies

```bash  
npm install
```

(Note: If you encounter peer dependency issues due to the extensive package list, you may use ⁠npm install --legacy-peer-deps⁠).

3. Run the Development Server

```bash
npm run start
```

The dashboard will be available at:

```bash
⁠http://localhost:5173⁠
```

4. Build & Deployment
To compile the application for production deployment:

```bash
npm run build
```
