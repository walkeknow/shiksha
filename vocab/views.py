from django.shortcuts import render
import os
from django.conf import settings
import urllib.parse
import requests
import random
from django.http import JsonResponse

# Create your views here.
def index(request):
    return render(request, 'index.html')


def test(request, test_id):
    if request.method == 'POST':
        word = request.POST['current_word']
        print(word)
        # key = 'f97dc13c-a75e-4a85-b40e-76e2c3552a5a'
        syn_key = '0baeb92e-a2d9-455d-a678-aa0586a53e95'
        # main_api = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'
        syn_api = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/'
        # url = main_api + word + '?' + urllib.parse.urlencode({
        #     'key': key
        # })
        syn_url = syn_api + word + '?' + urllib.parse.urlencode({
            'key': syn_key
        })
        # print(url)
        print(syn_url)
        # json = requests.get(url).json()
        syn_json = requests.get(syn_url).json()
        # definitions = json[0]['shortdef']
        definitions = syn_json[0]['shortdef']
        definitions = [word.capitalize() for word in definitions]
        definitions = ";".join(definitions)
        synonyms = ['No Synonyms Found']
        if syn_json[0]['meta']['syns'][0] is not None:
            all_synonyms = syn_json[0]['meta']['syns'][0]
            synonyms = all_synonyms[:5]
            synonyms = [word.capitalize() for word in synonyms]
        print(definitions)
        print(synonyms)
        context = {
            "meanings": definitions,
            "synonyms": synonyms
        }
        return JsonResponse(context)
    word_file = open(os.path.join(settings.BASE_DIR, 'staticfiles/' + test_id + '.txt'))
    lower_word_list = word_file.read().splitlines()
    word_list = [word.capitalize() for word in lower_word_list]
    random.shuffle(word_list)
    if test_id[0] == 'b':
        word_list = word_list[:10]
    print(word_list)
    word = word_list[0]
    print(word)
    syn_key = '0baeb92e-a2d9-455d-a678-aa0586a53e95'
    syn_api = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/'
    syn_url = syn_api + word + '?' + urllib.parse.urlencode({
        'key': syn_key
    })
    print(syn_url)
    syn_json = requests.get(syn_url).json()
    definitions = syn_json[0]['shortdef']
    definitions = [word.capitalize() for word in definitions]
    definitions = ";".join(definitions)
    synonyms = ['No Synonyms Found']
    if syn_json[0]['meta']['syns'][0] is not None:
        all_synonyms = syn_json[0]['meta']['syns'][0]
        synonyms = all_synonyms[:5]
        synonyms = [word.capitalize() for word in synonyms]
    print(definitions)
    print(synonyms)
    context = {
        "test": test_id,
        "words": word_list,
        "first_meanings": definitions,
        "first_synonyms": synonyms
    }
    return render(request, 'test.html', context)
