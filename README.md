# Invoice App

A full-stack invoicing application built within a 12-hour timeframe. This project demonstrates end-to-end functionality, thoughtful design trade-offs, and a clean, extensible codebase.

## Tech Stack

- Frontend: React + TailwindCSS
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- PDF Export: jsPDF + jspdf-autotable

**Why this stack?**  
The MERN stack allows for rapid development and a clean separation of concerns. React handles component-based UI efficiently, while Express and MongoDB simplify server-side logic and data persistence. TailwindCSS ensures responsive and consistent design with minimal effort.

## Project Setup

### Server

```bash
cd server
npm install
npm run dev
```

### Client

```bash
cd client
npm install
npm run dev
```

Create a `.env` file inside the `server/` folder with your MongoDB URI:

```
MONGODB_URI=your_mongodb_connection_string
```
## Environment Configuration

- For security reasons, the actual MongoDB URI is not included in the public repository.  
- If you are a reviewer: a working `.env` file with demo credentials is shared privately for testing.  
- You may also use the provided seed scripts to populate sample data for invoices and clients.


## Time Spent

| Task | Duration |
|------|----------|
| Initial setup, Tailwind, DB connection | 1 hr |
| Core features (form, list view, status toggle) | 3 hrs |
| Advanced features (pagination, dark mode, client list, responsive UI, validation, overdue handling) | 2 hrs |
| Mock authentication + login page | 1.5 hr |
| PDF export and formatting | 0.5 hrs |
| Documentation and cleanup | 0.5 hr |
| **Total** | **8.5 hours** |

## Features Completed

### Core Objectives

- Invoice creation form with validation and automatic total calculation
- Invoice list view showing invoice number, client, due date, amount, and status
- Ability to toggle status between Paid and Unpaid

### Advanced Objectives

- Client management (add and associate clients)
- Client editing or deletion
- Overdue invoice detection with visual cues
- Mock authentication with theme toggle persistence
- Invoice PDF generation and download
- Responsive UI using TailwindCSS
- Dark mode toggle
- Modals for confirmation
- Toasts for notification
- Pagination
- Tabs

## Features Not Implemented

- Real authentication (currently using mock)
- Multi-criteria filtering or search bar

## Prioritization Strategy

The development focused first on achieving full-stack functionality for all core objectives, ensuring that each step (form → validation → storage → listing) was functional and clean. Once the foundation was stable, advanced features were layered in based on impact and feasibility. Features like real authentication and multi-criteria filtering for searching were deprioritized due to time constraints but could be added with minimal restructuring.

## If Given More Time

- Replace mock auth with JWT-based authentication
- Implement invoice search and better filtering
- Add input persistence across refresh (optional)
- Deploy using Vercel (frontend) and Render or Railway (backend)
- Write unit and integration tests

## Known Limitations

- PDF generation is basic and does not support logos or branding
- Mock credentials are hardcoded in the frontend
- Filtering and pagination are handled client-side only
- UI/UX design is minimal and not highly polished, as the focus was primarily on system functionality, structure, and feature completeness within the time constraint
  
## GitHub Repository

[Invoice App Repo](https://github.com/c-kheilanthony/invoice-app.git)

## Loom link for features overview
[Features Overview Video](https://www.loom.com/share/e3af8fca8b2f4b828253f37945807395?sid=9314f331-81a3-4dbf-a9b9-2131ca84ca0b)


## Screenshots

### Mobile View

<details>
  <summary>Click to expand</summary>

<img width="426" height="799" alt="Mobile 1" src="https://github.com/user-attachments/assets/77244290-5fc7-45ad-9914-f3d42015b21c" />
<img width="414" height="807" alt="Mobile 2" src="https://github.com/user-attachments/assets/4b6b7e84-7501-4b74-b1f2-b77f6dff5579" />
<img width="407" height="800" alt="Mobile 3" src="https://github.com/user-attachments/assets/c08d8cbc-1f26-429f-abcf-547ab8a891ab" />
<img width="407" height="801" alt="Mobile 4" src="https://github.com/user-attachments/assets/5f3b6a5f-d5f9-4b23-abb0-b093e2f93ba2" />

</details>

---

### Desktop View

<details>
  <summary>Click to expand</summary>

<img width="1920" height="1080" alt="Desktop 1" src="https://github.com/user-attachments/assets/30696ac3-8c23-47a8-8411-9e947052afcd" />
<img width="1920" height="1080" alt="Desktop 2" src="https://github.com/user-attachments/assets/d106f2d4-08dc-43e9-88aa-023d8212b140" />
<img width="1920" height="1080" alt="Desktop 3" src="https://github.com/user-attachments/assets/cd74e9bf-d2f3-4a4b-9d12-99699e259297" />
<img width="1920" height="1080" alt="Desktop 4" src="https://github.com/user-attachments/assets/9119a5d3-5c6c-45ba-801c-f154d849e949" />
<img width="1920" height="1080" alt="Desktop 5" src="https://github.com/user-attachments/assets/b8a1ac0d-a911-40b4-a819-95d39225e34c" />
<img width="1920" height="1080" alt="Desktop 6" src="https://github.com/user-attachments/assets/39e682c9-c717-4a52-92ec-f60f1a7fb088" />

</details>
