## 🛠️ Installation & Setup

Follow these steps sequentially to set up the project locally:

### 1. Clone the Repository

First, clone this repository to your local machine using Git:

```bash
git clone https://github.com/Vergeo/beebites-backend
cd beebites-backend
```

### 2. Install Dependencies

Install all the required Node.js packages and dependencies:

```bash
npm install
```

### 3. Environment Configuration

Create a local environment file by copying the template file:

```bash
cp .env.example .env
```

_Note: Open the newly created `.env` file and fill in the required environment variables (e.g., Supabase database keys, API credentials)._

### 4. Run the Application

Start the application in development mode with hot-reload enabled:

```bash
npm run start:dev
```

---

## ⚠️ Important Database Note

The database for this project is hosted using **Supabase**.

Because it is hosted externally, there is a chance the database database instance may occasionally go into an offline or paused state. If you experience connection timeouts or database errors while running the server, please **contact the developer** to wake up or resume the database instance.
