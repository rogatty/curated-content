## What is it?

There is a [cron job](https://github.com/rogatty/curated-content/blob/master/.openshift/cron/daily/curatedcontent) that runs [update.js](https://github.com/rogatty/curated-content/blob/master/update.js) script daily which:
* gets list of wikis with Curated Content from http://community.wikia.com/wikia.php?controller=CuratedContent&method=getWikisWithCuratedContent
* gets previous state from json file
* finds what's added
* finds what's removed
* if there's a change:
 * saves current state to `current.json`
 * saves changelog to timestamped file
 * sends updated message to `#x-wing`
