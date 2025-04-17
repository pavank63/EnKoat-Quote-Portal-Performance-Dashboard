# EnKoat Quote Portal & Performance Dashboard

## Summary
This is a full-stack web application built to help contractors easily submit project quotes and for company managers to track, visualize, and analyze roofing project performance.

The application consists of two key interfaces:

1. **Quote Submission Portal**  
   A responsive React-based form where contractors can submit quotes, including details like contractor name, company, roof size, roof type, city, state, and project date. The form is styled with Tailwind CSS and posts data to a Node.js/Express API that stores submissions in a PostgreSQL database using Sequelize ORM.

2. **Performance Dashboard**  
   A visual analytics dashboard built with Recharts, featuring:  
   - **Bar Chart** for number of projects by state  
   - **Pie Chart** for average roof size by roof type  
   - **Line Chart** for monthly trend of project submissions  
   - **Dynamic Filters** to view specific subsets of data by state and roof type  
   - **Export to CSV** button to download current filtered data  
   - **Bonus Heatmap** using Google Maps to visualize estimated energy savings by location based on roof size and geographic spread

This application helps streamline the workflow from quote submission to performance tracking, making project analysis intuitive and visual for decision makers.

---

## Tools Used & How to Run Locally

### Backend
- **Node.js** with **Express**
- **PostgreSQL** + **Sequelize** ORM
- **dotenv** for environment config
- **Faker.js** to seed mock data

#### Run Backend
```bash
cd server
npm install

# .env example
DB_NAME=enkoat_dashboard
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

createdb enkoat_dashboard -U your_user
npm run seed     # inserts 1000 mock quotes
npm start        # runs backend at http://localhost:5000
```

---

### Frontend
- **React** (with **Vite** for fast bundling)
- **Tailwind CSS** for styling
- **Recharts** for interactive data visualizations
- **@react-google-maps/api** for heatmap

#### Run Frontend
```bash
cd client
npm install

# .env file
GOOGLE_MAPS_API_KEY=your_api_key_here

npm run dev      # opens at http://localhost:5173
```

---

## Mock Data
- `server/seed.js` generates 1000 project quotes using Faker
- Fields include:
  - Contractor name & company
  - Random roof size (500–5000 sqft)
  - Roof type (Metal, TPO, Foam, Asphalt)
  - City and state from 5 major U.S. regions
  - Random date between Jan 2023 and Mar 2025

---

## What I’d Improve With More Time
- First I'd like to improve the UI with more time, the quote submission form escpecially and the dashboard too.
- We can add some authentication to it, that we each contractor will login and can manage their own quotes
- Improve the code readability.
