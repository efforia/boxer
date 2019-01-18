"""helloworld URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url, include
from django.views.generic import TemplateView, RedirectView
from django.contrib import admin
# from boxer.api import DeliveryResource, FreighterResource, ClientResource, ScheduleResource, OfferResource, PhotoResource, TokensResource
from rest_framework import routers
from rest_framework.authtoken import views
from boxer.views import *

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'deliveries', DeliveryViewSet)
router.register(r'offers', OfferViewSet)
router.register(r'schedules', ScheduleViewSet)
router.register(r'pictures', PictureViewSet)

urlpatterns = [
    url(r'^$', SputnikView.as_view()),
    url(r'^dashboard/', admin.site.urls),
    # url(r'^authenticate/', token, name='authenticate'),
    url(r'^api/', include(router.urls)),
    url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/auth/token/', views.obtain_auth_token),
    url(r'^thanks/', ThanksPageView.as_view(), name='advantages'),
    # url(r'^tokens/', TokensResource.as_detail(), name='tokens'),
    # url(r'^deliveries/', include(DeliveryResource.urls()), name='deliveries'),
    # url(r'^clients', include(ClientResource.urls()), name='clients'),
    # url(r'^freighters', include(FreighterResource.urls()), name='freighters'),
    # url(r'^schedules', include(ScheduleResource.urls()), name='schedules'),

    # url(r'^register/$', RegisterView.as_view(), name='login'),
    # url(r'^signin/$', RedirectView.as_view(url="/"), name='signin'),
    # url(r'^$', lebay_views.index, name='lebay_index'),
    # url(r'^home/$', lebay_views.view_user_home, name='lebay_user_home'),
    # url(r'^register/$', lebay_views.register_user, name='lebay_register_user'),
    # url(r'^search/$', lebay_views.search_auction_events, name='lebay_search_auction_events'),
    #
    # url(r'^categories/$', lebay_views.view_categories, name='lebay_view_categories'),
    # url(r'^categories/(?P<category_id>\d+)/$', lebay_views.view_category, name='lebay_view_category'),
    #
    # url(r'^item/sell/$', lebay_views.list_item, name='lebay_list_item'),
    # url(r'^item/buy/$', lebay_views.view_auction_events, name='lebay_view_auction_events'),
    # url(r'^item/(?P<item_id>\d+)/view/$', lebay_views.view_item, name='lebay_view_item_detail'),
    # url(r'^item/(?P<item_id>\d+)/edit/$', lebay_views.edit_item, name='lebay_edit_item_detail'),
    # url(r'^item/(?P<item_id>\d+)/sell/$', lebay_views.list_existing_item, name='lebay_list_existing_item'),
    # url(r'^item/auction/(?P<auction_event_id>\d+)/$', lebay_views.view_auction_event, name='lebay_view_auction_event'),
    # url(r'^item/auction/(?P<auction_event_id>\d+)/ended/$', lebay_views.view_ended_auction_event, name='lebay_view_ended_auction_event'),
    # url(r'^item/auction/(?P<auction_event_id>\d+)/bids/$', lebay_views.view_bid_history, name='lebay_view_bid_history'),
    # url(r'^item/auction/payments/(?P<auction_event_id>\d+)/pay/$', lebay_views.pay_for_item, name='lebay_pay_for_item'),
    # url(r'^item/auction/payments/manage/$', lebay_views.manage_payments, name='lebay_manage_payments'),
    #
    # url(r'^profile/password/change/$', lebay_views.change_password, name='lebay_change_password'),
    # url(r'^profile/user/edit/$', lebay_views.edit_user_profile, name='lebay_edit_user_profile'),
    # url(r'^profile/user/(?P<user_id>\d+)/$', lebay_views.view_user_profile, name='lebay_view_user_profile'),
    # url(r'^profile/seller/create/$', lebay_views.edit_seller_profile, name='lebay_create_seller_profile'),
    # url(r'^profile/seller/edit/$', lebay_views.edit_seller_profile, name='lebay_edit_seller_profile'),
]
