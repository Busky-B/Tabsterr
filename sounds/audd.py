import requests
data = {
    'return': 'apple_music,spotify',
    'api_token': 'test'
}

files = {
    'file': open("soundsample_test.mp3", 'rb'),
}


res = requests.post('https://api.audd.io/', data=data, files=files)



print(res.text)
