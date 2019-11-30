#!/usr/bin/env python

import requests
import json
from random import *
from datetime import datetime
import pytz

date = datetime.now(pytz.timezone('Europe/Amsterdam')).strftime("%d/%m/%Y %H:%M:%S") + " - "
print (date + "2nd python script working")

# try:
#     # Get untested radios
#     r = requests.get("http://172.16.0.6:3000/api/radios?type=untested", timeout=5, verify=False, stream=True)

#     radioWorkingNumber = 0
#     testedRadioNumber = len(r.json())

#     for radio in r.json():
#         # Test radio url
#         try:
#             r = requests.get(radio['url'], timeout=1, verify=False, stream=True)
#             r = requests.get("http://172.16.0.6:3000/api/radios/" + str(radio['_id']) + "?state=up", timeout=5, verify=False, stream=True)
#             radioWorkingNumber += 1
#         except:
#             r = requests.get("http://172.16.0.6:3000/api/radios/" + str(radio['_id']) + "?state=down", timeout=5, verify=False, stream=True)
    
#     print (date + "All the radios have been tested - " + str(radioWorkingNumber) + "/" + str(testedRadioNumber) + " radios working")

# except:
#     print (date + "API disconnected")