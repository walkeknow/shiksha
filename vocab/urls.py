from django.urls import path

from . import views

app_name = 'vocab'

urlpatterns = [
    path('', views.index, name='index'),
    #   vocab/test_id/
    path('<slug:test_id>/', views.test, name='test'),
]