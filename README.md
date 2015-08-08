run from cron:

* get list from http://community.wikia.com/wikia.php?controller=CuratedContent&method=getCuratedContentQuality
* get old list from json file
* find what's added
* find what's removed
* if there's a change:
  * save new list to json file
  * send message to #x-wing
  * add a screenshot maybe?
  * save changelog to json file