import os, datetime

from celery import Celery
from celery.schedules import crontab

# Set the default Django settings module for the 'celery' program
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'boxer.settings')

app = Celery('boxer')
app.conf.update(BROKER_URL=os.environ['REDIS_URL'],
                CELERY_RESULT_BACKEND=os.environ['REDIS_URL'])

# Using a string here means the worker doesn't have to serialize the
# configuration object to child processes. Namespace='CELERY' means all
# celery-related configuration keys should have a 'CELERY_' prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

import django
django.setup()

# Load task modeuls from all registered Django app configs.
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

# import models
from django.contrib.auth.models import User

@app.on_after_configure.connect
def setup_schedule(sender, **kwargs):
    sender.add_periodic_task(60.0, process.s(), name='Every 10s')

@app.task(bind=True)
def process(self):
    # print(models.Delivery.objects.all())
    current_time = datetime.datetime.now()
    # ended_auctions = AuctionEvent.objects.filter(end_time__lt=current_time, item__status=AUCTION_ITEM_STATUS_RUNNING)

    print(User.objects.all())
    print('Request: {0!r}'.format(self.request))

# import datetime
# import sys
# import hashlib

# def process_ended_auctions():

    # for auction_event in ended_auctions:
        # process_ended_auction(auction_event)

# if __name__ == "__main__":
    # process_ended_auctions()
