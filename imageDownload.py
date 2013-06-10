import json
import urllib 
import os

with open('imgSearchResult.json') as data_file2:    
	imgSearchResult = json.load(data_file2)

downloaded = os.listdir('pics/')

for key in imgSearchResult:
	if key not in downloaded and len(key) > 0:
		imageArray = imgSearchResult[key]['d']['results'][0]['Image']
		if len(imageArray) > 0:
			try:
				url = imageArray[0]['MediaUrl']
				print key
				print url
				urllib.urlretrieve(url, 'pics/' + key)

			except Exception, e:
				print e
				if len(imageArray) > 1:
					url = imageArray[1]['MediaUrl']
					print "try again"
					url = imageArray[1]['MediaUrl']
					urllib.urlretrieve(url, 'pics/' + key)
		else:
			print "no image for " + key