# TAILORAI

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Python](https://img.shields.io/badge/python-3.11%2B-blue.svg)
![Node](https://img.shields.io/badge/node-20%2B-blue.svg)

## Project Overview

**TAILORAI** is an Agentic AI Resume Customization System designed to rewrite and optimize your LaTeX resume sections specifically for targeted job descriptions. 
By utilizing LangChain and LangGraph, the system intelligently adapts your impact statements to match the job requirements while strictly preserving factual integrity and preventing AI hallucinations.

**Target Audience:** Job seekers looking to tailor their applications, career coaches, and developers building ATS-friendly tools.

**Key Features:**
- **Smart Tailoring:** Dynamically adapts experience, projects, skills, and education sections.
- **Immutability Rules:** Strict preservation of the `certifications` section (never overwritten/modified).
- **Valid Output:** Guaranteed to output valid LaTeX syntax with fallback parsing for missing sections.
- **Provider Agnostic:** Easily switch between OpenAI, Anthropic, Google, and Groq using a single configuration file.
- **Full Workflow:** Built using a multi-agent LangGraph workflow.

---

## Prerequisites

Before installing the project, ensure you have the following ready:
- **Python:** `>=3.11`
- **Node.js:** `>=20`
- **Docker:** (Optional) For containerized environments
- **API Keys:** Obtain an API key from at least one LLM provider (OpenAI, Anthropic, Google, or Groq)

---

## Installation Instructions

### Option 1: Docker (Recommended)

The easiest way to run TAILORAI is using Docker Compose:

1. Copy the backend environment variables template:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Open `backend/.env` and add your chosen provider's API key.
3. Build and run the containers:
   ```bash
   docker compose up --build
   ```

### Option 2: Local Development

Follow these steps to run the servers locally.

**Backend Setup:**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Configure your environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and enter your API keys
   ```
3. Install dependencies using `uv` (or `pip`):
   ```bash
   uv sync
   # Or using pip in a virtual env: pip install -e .
   ```
4. Start the backend server:
   ```bash
   uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

**Frontend Setup:**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

Frontend will run at `http://localhost:3000` and the Backend will serve API traffic at `http://localhost:8000`.

---

## Production Deployment

This project is stateless and can be easily deployed in production using two primary methods.

### Method 1: Managed Cloud Services (Recommended & Lowest Effort)

The easiest setup is to host the Next.js frontend on **Vercel** and the FastAPI backend on **Render** or **Railway**.

#### 1. Deploy the Backend (Render/Railway)
* Log in to [Render](https://render.com) and create a new **Web Service** from your Git repo.
* Select the **Docker** runtime.
* Set the **Build Context** to `backend`.
* Add these **Environment Variables** in the Render dashboard:
  * `APP_ENV=production`
  * `CORS_ORIGINS=["https://your-frontend.vercel.app"]` (Replace with your actual Vercel URL once deployed)
  * Add the API key for your chosen LLM provider (e.g. `GROQ_API_KEY`, `GOOGLE_API_KEY`).
* Render will compile your container and host it securely. Note down your API URL (e.g. `https://tailorai-api.onrender.com`).

#### 2. Deploy the Frontend (Vercel)
* Log in to [Vercel](https://vercel.com) and import your Git repo.
* Set the **Root Directory** to `frontend`.
* Add this **Environment Variable**:
  * `NEXT_PUBLIC_API_BASE_URL=https://tailorai-api.onrender.com` (Your backend URL from Render).
* Deploy the project. Vercel automatically compiles your Next.js application and hosts it on their global CDN.

---

### Method 2: Self-Hosted VPS (Docker Compose + SSL)

If you have a Linux VPS (Ubuntu), you can use the production configuration provided in the repository to launch the entire stack with automatic SSL/TLS via Let's Encrypt.

#### 1. Configure the Domains
Point your domain and a subdomain (e.g. `yourdomain.com` and `api.yourdomain.com`) to your VPS IP address using `A` records.

#### 2. Configure Environment Variables
* Create `backend/.env` containing your LLM credentials and production environment config:
  ```env
  APP_ENV=production
  CORS_ORIGINS=["https://yourdomain.com"]
  GROQ_API_KEY=your-key
  ```
* Create a root `.env` file to configure Caddy proxy and Next.js build:
  ```env
  DOMAIN_NAME=yourdomain.com
  API_DOMAIN_NAME=api.yourdomain.com
  ACME_EMAIL=your-email@example.com
  ```

#### 3. Start the Stack
Build and deploy the application services in detached mode:
```bash
docker compose -f docker-compose.prod.yml up --build -d
```
Caddy will automatically provision SSL certificates and route traffic to the frontend and backend containers.

---

## Usage Examples

### Using the UI

Simply open [http://localhost:3000](http://localhost:3000) in your browser:
1. Paste your original LaTeX resume.
2. Provide the Job Description and desired Role.
3. Check "Generate cover letter" if desired.
4. Click **Forge Resume** and copy or download the results.

### Using the API (cURL)

Request a dynamically tailored resume natively through the API:

```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "resume_latex": "\\begin{document}\\section{Experience}\\begin{itemize}\\item Built APIs\\end{itemize}\\end{document}",
    "job_description": "We are seeking a senior engineer with strong API development skills.",
    "role": "Senior Backend Engineer",
    "generate_cover_letter": false
  }'
```

---

## Configuration

### Model & Provider Configuration
Switch out your LLM provider by editing the Configuration YAML at `backend/app/config/model_provider.yaml`:

```yaml
provider: openai
company: OpenAI
model: gpt-4o-mini
temperature: 0.2
```
Supported `provider` values: `openai`, `anthropic`, `google`, `groq`.

### Environment Variables
The application relies on `.env` files. Inside `backend/.env`, you can customize:
- `APP_PORT`
- `CORS_ORIGINS`
- Specific service keys: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_API_KEY`, `GROQ_API_KEY`

---

## Contributing

We welcome contributions to expand TAILORAI! 

1. **Bug Reports & Issues:** Please use the issue tracker to report missing rules or syntax breakages.
2. **Pull Requests:** 
   - Fork the repository and create a feature branch.
   - Run type checks and the formatter (using `ruff`) prior to submission.
   - Submit your PR with a clear summary of changes.

---

## License

This project is licensed under the [MIT License](LICENSE).
