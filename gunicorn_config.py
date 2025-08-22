# Gunicorn configuration
workers = 4
worker_class = 'gthread'
threads = 2
timeout = 120
bind = '0.0.0.0:10000'  # Render's default port for Python apps
