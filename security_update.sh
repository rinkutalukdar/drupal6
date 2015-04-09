#!/bin/bash

# Get all Drupal sites
#log_file = "SU-1-$(date +%Y%m%d_%H%M%S)-"
#datestr = $(date +%Y%m%d_%H%M%S)

echo "Script starts..."

echo "Git operation for base site............."
GIT checkout development >> "base-SU-1.log" 2>&1
GIT pull >> $site"-SU-1.log" 2>&1
GIT checkout -b 'SU-1' >> "base-SU-1.log" 2>&1
echo "Git operation ends for base site............."

echo "Security Update for base site........"
drush pm-update --security-only n >> "base-SU-1.log" 2>&1
drush updatedb >> $site"-DBUpdate-1.log" 2>&1
echo "Security Update ends for base site..........."

sites=`find . -maxdepth 1 -type d -print | grep -v '/all$' | grep -v '/default$' | grep -v '\.$'`
#sites=`find . -maxdepth 1 -type d -print | grep -v '/sites$'`

echo "Choose the commande to execute : "
echo "1. Security Update"
echo "2. Clear all Cache"
echo -n "Input [1,2] ? "
read choice

# For each site, execute the command
for site in $sites
do
  echo ----------
  cd $site
  echo $site
  if [ $choice -eq 1 ] ; then
    #drush updatedb
    echo "Security Update for $site........"
    drush pm-update --security-only n >> $site"-SU-1.log" 2>&1
    drush updatedb >> $site"-DBUpdate-1.log" 2>&1
    echo "Security Update for $site........"
  elif [ $choice -eq 4 ] ; then
    drush cc all >> $site"-SU-1.log" 2>&1
  fi
  cd ../
done

echo "Git commit and push starts Here........."
GIT cmmit -m "Security Update 1"
echo -n "Enter git repo-name for site: "
read repo_name
GIT push $repo_name 'SU-1'
GIT checkout development
GIT merge 'SU-1'
echo "Git commit and push starts Here........."
