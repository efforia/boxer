""" Main app test module """
import json
from datetime import datetime
from django.test import TestCase, Client
from kombi.models import Delivery

class DeliveryTestCase(TestCase):
    """ Delivery test cases """
    def setUp(self):
        self.client = Client(HTTP_USER_AGENT='Mozilla/5.0')
        self.data = {
            "title":"Basic freight",
            "freighter":"0",
            "departure":"296 Antonio Joaquim Mesquita St",
            "arrival":"399/702 Vigario Jose Inacio St",
            "deadline":"12-04-1992 21:00",
            "volume":"3.0",
            "weight":"1.0",
            "description":"A simple freight to test"
        }
        self.freight = {
            "title":"New freight",
            "freighter":"0",
            "departure":"399/702 Vigario Jose Inacio St",
            "arrival":"296 Antonio Joaquim Mesquita St",
            "deadline":"01-01-2012 15:00",
            "volume":"6.0",
            "weight":"2.0",
            "description":"Modified freight to test"
        }
        self.delivery = Delivery.objects.create(
            title=self.data['title'],
            freighter=int(self.data['freighter']),
            departure=self.data['departure'],
            arrival=self.data['arrival'],
            deadline=datetime.strptime(self.data['deadline'], '%d-%m-%Y %H:%M'),
            volume=float(self.data['volume']),
            weight=float(self.data['weight']),
            description=self.data['description'])

    def test_delivery(self):
        """ Creates a delivery on the fly and tests detail API function """
        response = self.client.get('/kombi/deliveries/1')
        self.assertEqual(200, response.status_code)

    def test_deliveries(self):
        """ Get a list of deliveries and test if the API function is correct """
        response = self.client.get('/kombi/deliveries')
        self.assertEqual(200, response.status_code)

    def test_create_deliveries(self):
        """ Creates of deliveries by API request function """
        response = self.client.post('/kombi/deliveries', json.dumps(self.data),
                                    content_type='application/json')
        self.assertEqual(201, response.status_code)

    def test_update_deliveries(self):
        """ Updates detail of a delivery by API update function """
        response = self.client.put('/kombi/deliveries/1', json.dumps(self.freight),
                                   content_type='application/json')
        self.assertEqual(202, response.status_code)

    def test_delete_deliveries(self):
        """ Tests deletion of deliveries by API delete function """
        response = self.client.delete('/kombi/deliveries/1')
        self.assertEqual(204, response.status_code)
