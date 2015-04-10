#!/bin/bash

# Get all Drupal sites
#log_file = "SU-1-$(date +%Y%m%d_%H%M%S)-"
#datestr = $(date +%Y%m%d_%H%M%S)

echo "Script starts..."

echo "Git operation for base site............."$'\r' >> "base-SU-1.log" 2>&1
echo -n "Enter git repo-name for site: "
read repo_name
GIT checkout production >> "base-SU-1.log" 2>&1
GIT pull $repo_name production>> "base-SU-1.log" 2>&1
if GIT checkout -b 'SU-1' >> "base-SU-1.log" 2>&1; then
  echo "Git Checkout done"
else
  GIT checkout 'SU-1'
  echo "Already SU-1 that Branch exist"
fi
echo "Git operation ends for base site............."$'\r' >> "base-SU-1.log" 2>&1

echo "Security Update for base site........"$'\r' >> "base-SU-1.log" 2>&1
#drush pm-update --security-only y >> "base-SU-1.log" 2>&1
drush pm-update -y >> "base-SU-1.log" 2>&1
drush updatedb >> "base-SU-1.log" 2>&1
echo "Security Update ends for base site..........."$'\r' >> "base-SU-1.log" 2>&1



echo "Git commit and push starts Here........."$'\r' >> "base-SU-1.log" 2>&1
GIT commit -m "Security Update 1"
GIT push $repo_name 'SU-1'
GIT checkout development
GIT merge 'SU-1' $'\r' >> "base-SU-1.log" 2>&1
GIT push $repo_name development $'\r' >> "base-SU-1.log" 2>&1
echo "Git commit and push starts Here........."$'\r' >> "base-SU-1.log" 2>&1



exit;
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
    echo "Security Update for $site........"$'\r' >> $site"-SU-1.log" 2>&1
	drush pm-update -y >> $site"-SU-1.log" 2>&1
    #drush pm-update --security-only >> $site"-SU-1.log" 2>&1
    drush updatedb >> $site"-DBUpdate-1.log" 2>&1
    echo "Security Update for $site is completed........"$'\r' >> $site"-SU-1.log" 2>&1
  elif [ $choice -eq 4 ] ; then
    drush cc all >> $site"-SU-1.log" 2>&1
  fi
  cd ../
done

echo "Git commit and push starts Here........."$'\r' >> "base-SU-1.log" 2>&1
GIT cmmit -m "Security Update 1"
GIT push $repo_name 'SU-1'
GIT checkout development
GIT merge 'SU-1' $'\r' >> "base-SU-1.log" 2>&1
echo "Git commit and push starts Here........."$'\r' >> "base-SU-1.log" 2>&1
