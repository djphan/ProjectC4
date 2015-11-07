#!/bin/bash

LOG_FILE="update_school_emails.log"

echo "----- $(date '+%Y-%m-%d %H:%M:%S') -----" | tee -a ${LOG_FILE}

# Download latest dataset of university emails & import to temporary collection in mongo
echo "Downloading Latest Data..." | tee -a ${LOG_FILE}
curl -L https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json | mongoimport --collection temp_schools --jsonArray | tee -a ${LOG_FILE}

# Update dataset
echo "Updating school informations..."
mongo update_school_emails.js | tee -a ${LOG_FILE}

# Done
echo "Complete!"
echo "" | tee -a ${LOG_FILE}
