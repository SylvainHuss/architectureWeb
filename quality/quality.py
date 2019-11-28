#!/usr/bin/env python

import requests
import json
from random import *

try:
    r = requests.get("http://172.16.0.6:3000/api/radios", timeout=5, verify=False, stream=True)
    length = len(r.json())

    id = randint(0,length)
    r = requests.get("http://172.16.0.6:3000/api/radios/" + str(id), timeout=5, verify=False, stream=True)
    radioUrl = (r.json())['url']
    radioName = (r.json())['title']

    try:
        r = requests.get(radioUrl, timeout=10, verify=False, stream=True)
        r = requests.get("http://172.16.0.6:3000/api/radios/" + str(id) + "?state=up", timeout=10, verify=False, stream=True)
        print (radioName + " is up")

    except:
        requests.get("http://172.16.0.6:3000/api/radios/" + str(id) + "?state=down", timeout=10, verify=False, stream=True)
        print (radioName + " is down")

except:
    print ("API disconnected")
