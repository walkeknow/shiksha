from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'index.html')


def test(request, test_id):
    return render(request, 'test.html', {'test': test_id})
