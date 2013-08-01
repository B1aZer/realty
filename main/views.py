from django.template import RequestContext
from django.shortcuts import render_to_response

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from models import Apartments
from django.contrib.auth.models import User
from serializers import ApartmentsSerializer

def home(request):
    return render_to_response(
            'main.html',
            {
            },
            RequestContext(request)
        )

def main(request):
    return render_to_response(
            'adv.html',
            {
            },
            RequestContext(request)
        )

class AccountViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Apartments.objects.all()
    serializer_class = ApartmentsSerializer




