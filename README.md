# <TaskFlow>

<TaskFlow> is a single-page React task manager for adding, organizing, and tracking daily to-dos. Tasks can be grouped into categories, filtered by status, given due dates, and reordered by drag-and-drop. Everything is saved in your browser's localStorage, so nothing is lost on refresh.

## Features

- Add, edit, delete, and mark tasks as complete
- Filter tasks by status: All / Active / Completed
- Organize tasks by category: Work, Personal, Urgent
- Live count of remaining, completed, and total tasks
- Tasks persist with localStorage
- Due dates with an overdue indicator
- Drag-and-drop reordering
- Loading state and empty state
- Responsive layout for desktop and mobile

## Technologies Used

- React 19 (functional components and hooks)
- Vite
- Plain CSS (CSS variables, flexbox)
- Browser localStorage API

## Setup Instructions

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).

## Screenshots

![Main view](screenshots/Main_view.png)
![Filtered view](screenshots/Filtered_view.png)
![Mobile view](screenshots/Mobile_view.png)

## Known Limitations

- Single view only, so React Router is not used
- Drag-and-drop uses native browser events and works best with a mouse
- Categories are a fixed set (Work, Personal, Urgent)