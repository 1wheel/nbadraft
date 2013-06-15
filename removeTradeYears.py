import json

with open('webpage/drafts.json') as data_file:    
	drafts = json.load(data_file)

for draft in drafts:
	for player in draft['players']:
		if 'stats' in player:
			s = player['stats'];
			for i in range(0, len(s)):
				for j in range(0, len(s)):
					if i != j:
						if s[i]['year'] == s[j]['year'] and int(s[i]['mp']) > int(s[j]['mp']):
							try:
								# s[i]['per'] = (float(s[i]['per'])*float(s[i]['mp']) + float(s[j]['per'])*float(s[j]['mp']))/(1 + float(s[i]['mp']) + float(s[j]['mp']))
								# s[i]['mp'] = float(s[i]['mp']) + float(s[j]['mp'])
								s[j]['per'] = 0
								s[j]['mp'] = 0
							except Exception, e:
								print e
								#raise e
							#player['stats'].pop(j)
							print player
							print 'NEXT'
			i = 0
			while i < len(s):
				if s[i]['mp'] == 0:
					s.pop(i)
				else:
					i = i + 1


with open('webpage/drafts.json', 'w') as outfile:
	json.dump(drafts, outfile)
