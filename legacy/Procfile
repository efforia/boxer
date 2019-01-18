web: gunicorn boxer.wsgi --log-file -
worker: celery worker --app=boxer.worker.app -B
