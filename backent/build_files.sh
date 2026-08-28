#!/bin/bash
# Vercel build step for the Django backend.
# Runs during deploy: installs deps, collects static files into
# staticfiles_build/static (served by Vercel), and applies migrations
# against the PostgreSQL database in DATABASE_URL.
set -e
python3 -m pip install --break-system-packages -r requirements.txt
python3 manage.py collectstatic --noinput --clear
python3 manage.py migrate --noinput