from django.db import models
from django.contrib.auth.models import User

class Apartments(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=1000)
    address = models.CharField(max_length=1000)
    space = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)



