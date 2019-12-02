#!/bin/bash

if [ ! -e var.log ] || [ $(cat var.log) = "false" ]; then
    echo "true" > var.log
    /usr/local/bin/python /home/testNewRadio.py
    echo "false" > var.log
fi