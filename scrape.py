import urllib
import json
from BeautifulSoup import BeautifulSoup


def dlDraft(year):
	url = 'http://www.basketball-reference.com/draft/NBA_' + str(year) + '.html'
	f = urllib.urlopen(url)
	soup = BeautifulSoup(f)
	rows = soup.findAll("tr")

	players = []
	for row in rows:
		try:		
			columns = row.findAll("td")
			num = int(columns[0].text)
			if  (1<= num and num <= 61):
				player = {}
				player['num'] = num
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

def dlPlayer(name, url):
	a = 'bing'
	#nothing yet

playerArray = dlDraft(2000)