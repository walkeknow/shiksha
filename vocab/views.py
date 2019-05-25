from django.shortcuts import render
import os
from django.conf import settings
import urllib.parse
import requests
import re


# Create your views here.
def index(request):
    return render(request, 'index.html')


def test(request, test_id):
    if request.method == 'POST':
        word = request.POST['current_word']
        key = 'f97dc13c-a75e-4a85-b40e-76e2c3552a5a'
        syn_key = '0baeb92e-a2d9-455d-a678-aa0586a53e95'
        main_api = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'
        syn_api = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/'
        url = main_api + word + '?' + urllib.parse.urlencode({
            'key': key
        })
        syn_url = syn_api + word + '?' + urllib.parse.urlencode({
            'key': syn_key
        })
        print(url)
        print(syn_url)
        json = requests.get(url).json()
        syn_json = requests.get(syn_url).json()
        definitions = json[0]['shortdef']
        synonyms = syn_json[0]['meta']['syns'][0]
        antonyms = syn_json[0]['meta']['ants'][0]
        print(definitions)
        print(synonyms)
        print(antonyms)
    word_file = open(os.path.join(settings.BASE_DIR, 'staticfiles/' + 'temp.txt'))
    word_list = word_file.read().splitlines()
    print(word_list)
    context = {
        "test": test_id,
        "words": word_list
    }
    return render(request, 'test.html', context)
