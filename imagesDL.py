import pyBingSearchAPI
import json
from time import sleep

key = 'uzMuSoVwFFEbXSo/lRT89rvLlFy6KG2C8q2s+PyN4h4'
bing = pyBingSearchAPI.BingSearchAPI(key)

params = {'ImageFilters':'"Face:Face+Aspect:Square"',
          '$format': 'json',
          '$top': 50,
          '$skip': 0}


r = bing.search('image', 'Tim Duncan nba', params)

with open('imgSearchResult.json') as data_file2:    
	imgSearchResults = json.load(data_file2)

with open('webpage/drafts.json') as data_file:    
	drafts = json.load(data_file)

for draft in drafts:
	for player in draft['players']:
		if 'url' in player:
			key = player['url'][11:-5]
		else:
			key = player['name']

		try:
			if key not in imgSearchResults:
				print key
				imgSearchResults[key] = bing.search('image', player['name'] + 'nba', params)
				sleep(.1)

		except Exception, e:
			print e
			with open('imgSearchResult.json', 'w') as outfile:
				json.dump(imgSearchResults, outfile)
			print "!!!!" + key + "!!!!"
			sleep(10)

with open('imgSearchResult.json', 'w') as outfile:
	json.dump(imgSearchResults, outfile)
