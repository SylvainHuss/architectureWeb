#!/bin/bash

mongoexport --authenticationDatabase admin --forceTableScan --host="172.16.0.3:27017" -u root -p 123 -d radios -c radios -o radio_backup_`date +%d-%m-%Y`.json --jsonArray --pretty
mongoexport --authenticationDatabase admin --forceTableScan --host="172.16.0.2:27017" -u root -p 123 -d users -c users -o user_backup_`date +%d-%m-%Y`.json --jsonArray --pretty
mongoexport --authenticationDatabase admin --forceTableScan --host="172.16.0.4:27017" -u root -p 123 -d logs -c logs -o log_backup_`date +%d-%m-%Y`.json --jsonArray --pretty