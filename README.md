# GT CV Builder — Nigeria Edition

A production-ready web application for Nigerian graduate students to optimize their CVs for specific industries (Banking, FMCG, Consulting, or Oil & Gas) using Gemini AI.

## Project Structure
- `server/`: Node.js + Express backend with Gemini SDK.
- `client/`: React + Vite frontend with premium inline styling.

## Deployment on Render

1. **Create a Web Service** on Render.
2. **Connect your Repo** (GitHub/GitLab).
3. **Environment Variables**:
   - `GEMINI_API_KEY`: Your Google AI Studio key.
   - `PORT`: (Render sets this automatically).
4. **Build Command**: `npm run build`
5. **Start Command**: `npm start`

The root `package.json` handles the client build and server launch automatically.

## Getting Started

### 1. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your Gemini API Key to the `.env` file:
   ```
   GEMINI_API_KEY=your_actual_key_here
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. In a new terminal, navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 3. Usage
- Open your browser to the URL shown by Vite (usually `http://localhost:5173`).
- Paste your raw CV text.
- Select your target industry.
- Click **Generate GT CV Now**.
- View the results in the three tabs: **Rewritten CV**, **Gap Analysis**, and **Certifications**.
