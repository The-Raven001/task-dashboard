To run fron-end:

npm run dev

To run back-end:

-Make sure uvicorn is installed "pip install fastapi uvicorn[standard]"
-Run ".venv\Scripts\Activate.ps1"
-Run "uvicorn app.main:app" --reload or to force it "python -m uvicorn app.main:app --reload"