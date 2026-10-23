# Milestone 1: Local setup

Open this repository folder in VS Code and open Terminal > New Terminal.

## 1. Frontend (Node.js LTS required)
```bash
cd frontend
npm create vite@latest . -- --template react
npm install
npm run dev
```
Stop the development server before using the same terminal for another command.

## 2. Backend (Python 3 required)
Open a second terminal at the repository root.

Windows PowerShell:
```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
django-admin startproject config .
python manage.py migrate
python manage.py runserver
```
macOS/Linux: replace the virtual environment activation with `source .venv/bin/activate` and use `python3 -m venv .venv` if needed.

## 3. GitHub
Create a new empty public repository named `BudgetBuddy` on GitHub (do not initialize it with a README). At the project root:
```bash
git init
git add .
git commit -m "Initial BudgetBuddy project scaffold"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/BudgetBuddy.git
git push -u origin main
```
Replace YOUR_USERNAME with your GitHub username. Do not commit real credentials, .env files, or virtual environments.

## Next
Create the Django apps/models and authentication endpoints, then design React Login and Register screens and integrate the APIs.
