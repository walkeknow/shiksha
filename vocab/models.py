from django.db import models


# Create your models here.
class Word(models.Model):
    word = models.CharField(max_length=45)
    test_id = models.CharField(max_length=2)
    starred = models.BooleanField(default=False)
