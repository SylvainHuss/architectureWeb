#!/usr/bin/env python


# todo : backup db
import requests
import json
from random import *
from datetime import datetime
import pytz

date = datetime.now(pytz.timezone('Europe/Amsterdam')).strftime("%d/%m/%Y %H:%M:%S") + " - "

try:
    r = requests.get("http://teststack_API:3000/api/radios", timeout=5, verify=False, stream=True)
    length = len(r.json())
    log = date

    for i in range (0,3):
        id = randint(0,length)
        r = requests.get("http://teststack_API:3000/api/radios/" + str(id), timeout=5, verify=False, stream=True)
        radioUrl = (r.json())['url']
        radioName = (r.json())['title']
        
        try:
            r = requests.get(radioUrl, timeout=5, verify=False, stream=True)
            r = requests.get("http://teststack_API:3000/api/radios/" + str(id) + "?state=up", timeout=5, verify=False, stream=True)
            log = log + radioName + " is up"

        except:
            r = requests.get("http://teststack_API:3000/api/radios/" + str(id) + "?state=down", timeout=5, verify=False, stream=True)
            log = log + radioName + " is down"            
        
        if (i!=2):
            log = log + ", "
    
    print (log)

except:
    print (date + "API disconnected")
