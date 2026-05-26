# Portfolio Backend

This backend provides a REST API for the portfolio frontend using Django and PostgreSQL.

## Setup

1. Copy the example env file:

   ```bash
   cp .env.example .env
   ```

2. Fill in the production values in `.env`:

   - `SECRET_KEY`
   - `DEBUG=False`
   - `ALLOWED_HOSTS`
   - `DATABASE_URL` or the individual DB settings
   - `CORS_ALLOWED_ORIGINS`

3. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Apply database migrations:

   ```bash
   python manage.py migrate
   ```

5. Run in development:

   ```bash
   python manage.py runserver 8000
   ```

## Production checklist

- Set `DEBUG=False`
- Use a strong `SECRET_KEY`
- Configure `ALLOWED_HOSTS` for your domain
- Set `CORS_ALLOWED_ORIGINS` to your frontend origin
- Run the app with a production server such as Gunicorn

## API Endpoints

- `GET /api/profile/`
- `PUT /api/profile/`
- `GET /api/projects/`
- `GET /api/projects/:id/`
- `POST /api/projects/`
- `PUT /api/projects/:id/`
- `DELETE /api/projects/:id/`
- `GET /api/skills/`
- `POST /api/skills/`
- `PUT /api/skills/:id/`
- `DELETE /api/skills/:id/`
- `GET /api/contact/`
- `POST /api/contact/`
- `POST /api/login/`
