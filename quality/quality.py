#!/usr/bin/env python

import requests
import json
from random import *
from datetime import datetime

try:
    r = requests.get("http://172.16.0.6:3000/api/radios", timeout=5, verify=False, stream=True)
    length = len(r.json())
    print (datetime.now().strftime("%d/%m/%Y %H:%M:%S") + " - ")

    for i in range (0,3):
        id = randint(0,length)
        r = requests.get("http://172.16.0.6:3000/api/radios/" + str(id), timeout=5, verify=False, stream=True)
        radioUrl = (r.json())['url']
        radioName = (r.json())['title']
        
        try:
            r = requests.get(radioUrl, timeout=5, verify=False, stream=True)
            r = requests.get("http://172.16.0.6:3000/api/radios/" + str(id) + "/up", timeout=5, verify=False, stream=True)
            print (radioName + " is up")

        except:
            requests.get("http://172.16.0.6:3000/api/radios/" + str(id) + "/down", timeout=5, verify=False, stream=True)
            print (radioName + " is down")
        
        print (", ")

except:
    print ("API disconnected")