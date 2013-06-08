import pyBingSearchAPI

key = 'uzMuSoVwFFEbXSo/lRT89rvLlFy6KG2C8q2s+PyN4h4'
bing = pyBingSearchAPI.BingSearchAPI(key)

params = {'ImageFilters':'"Face:Face+Aspect:Square"',
          '$format': 'json',
          '$top': 50,
          '$skip': 0}


r = bing.search('image', 'Tim Duncan nba', params)


with open('webpage/drafts.json') as data_file:    
	drafts = json.load(data_file)


draftPics = {}

for draft in drafts:
	for player in draft['players']:
		if url in player:
			key = player['url']
		else:
			key = player['name']

		draftPics[key] = r = bing.search('image', player['name'] + 'nba', params)
		print key
