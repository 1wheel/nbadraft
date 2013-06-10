from PIL import Image
import os

def parseImage(name):
	i = Image.open('pics/' + name)
	size = 100,100
	i.thumbnail(size, Image.ANTIALIAS)
	if i.mode != "RGB":
		i = i.convert("RGB")
	i.save("webpage/thumbnails/" + name +".jpg", "JPEG")

for name in os.listdir('pics/'):
	try:
		parseImage(name)
	except Exception, e:
		print e
		print name