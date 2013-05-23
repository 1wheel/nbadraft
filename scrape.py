import urllib
import json
from BeautifulSoup import BeautifulSoup


def dlDraft(year):
	url = 'http://www.basketball-reference.com/draft/NBA_' + str(year) + '.html'
	f = urllib.urlopen(url)
	soup = BeautifulSoup(f)
	rows = soup.findAll('tr')

	players = []
	for row in rows:
		try:		
			columns = row.findAll('td')
			num = int(columns[0].text)
			if  (1<= num and num <= 61):
				player = {}
				player['num'] = num				
				player['team'] = columns[1].text
				player['name'] = columns[2].text
				try:
					player['url'] = columns[2].findAll('a')[0]['href']
				except Exception, e:
					player['url'] = ''
				players.append(player)
		except Exception, e:
			print e
			print row
	return players

def dlPlayer(url):
	url = 'http://www.basketball-reference.com/' + url
	f = urllib.urlopen(url)
	soup = BeautifulSoup(f)
	advancedTable = soup.findAll('div', id = 'all_advanced')[0]
	rows = advancedTable.findAll('tr')

	yearlyStats = []
	for row in rows:
		try: 
			columns = row.findAll('td')
			year = int(columns[0].text[0:4])
			league = columns[3].text
			if (1970 <= year and year <= 2014 and league == 'NBA'):
				stats = {}
				stats['year'] = year
				stats['mp'] = columns[6].text
				stats['per'] = columns[7].text 
				yearlyStats.append(stats)
		except Exception, e:
			print e
			print row
			print 

	return yearlyStats

years = []
for year in range(1970, 2012):
	print year
	draft = dlDraft(year)
	for player in draft:
		print player['name']
		if len(player['url']) > 0:
			player['stats'] = dlPlayer(player['url'])