from django.contrib.auth.models import User, Group
from rest_framework import serializers
from boxer.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('city', 'state', 'region', 'zipcode', 'phone', 'ranking', 'description', 'logo', 'side', 'token')

class DeliverySerializer(serializers.HyperlinkedModelSerializer):
    freighter = serializers.HyperlinkedRelatedField(
        view_name='profile-detail',
        read_only=True
    )
    image = serializers.HyperlinkedRelatedField(
        view_name='picture-detail',
        read_only=True
    )
    class Meta:
        model = Delivery
        fields = ('freighter', 'departure_lat', 'departure_lon', 'arrival_lat', 'arrival_lon', 'deadline', 'volume', 'weight', 'image', 'title', 'description', 'value')

class OfferSerializer(serializers.HyperlinkedModelSerializer):
    bidder = serializers.HyperlinkedRelatedField(
        view_name='profile-detail',
        read_only=True
    )
    delivery = serializers.HyperlinkedRelatedField(
        view_name='delivery-detail',
        read_only=True
    )
    class Meta:
        model = Offer
        fields = ('bidder', 'delivery', 'amount')

class ScheduleSerializer(serializers.ModelSerializer):
    delivery = serializers.HyperlinkedRelatedField(
        view_name='delivery-detail',
        read_only=True
    )
    class Meta:
        model = Offer
        fields = ('delivery', 'schedule_detail', 'payment_detail', 'start_time', 'end_time')

class PictureSerializer(serializers.ModelSerializer):
    delivery = serializers.HyperlinkedRelatedField(
        view_name='delivery-detail',
        read_only=True
    )
    owner = serializers.HyperlinkedRelatedField(
        view_name='profile-detail',
        read_only=True
    )
    class Meta:
        model = Picture
        fields = ('delivery', 'owner', 'image')
