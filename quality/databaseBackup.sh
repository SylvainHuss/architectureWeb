#!/bin/bash

(mongoexport --authenticationDatabase admin --forceTableScan --host="172.16.0.3:27017" -u root -p 123 -d radios -c radios -o /database/radio_backup_`date +%d-%m-%Y`.json --jsonArray --pretty && \
mongoexport --authenticationDatabase admin --forceTableScan --host="172.16.0.2:27017" -u root -p 123 -d users -c users -o /database/user_backup_`date +%d-%m-%Y`.json --jsonArray --pretty && \
mongoexport --authenticationDatabase admin --forceTableScan --host="172.16.0.4:27017" -u root -p 123 -d logs -c logs -o /database/log_backup_`date +%d-%m-%Y`.json --jsonArray --pretty ) && \
echo $(TZ="Europe/Amsterdam" date '+%d/%m/%Y') $(date +"%T") $(echo " - Database backup saved") || \
echo $(TZ="Europe/Amsterdam" date '+%d/%m/%Y') $(date +"%T") $(echo " - Database backup failed to save, can't connect to at least one database")
