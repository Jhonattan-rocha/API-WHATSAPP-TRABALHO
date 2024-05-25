import requests

url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCCRTwk4RURmDDKeI_i7jpL6JsE9CKq31wVWPmnM1qYg&s'

with open("./img.png", 'wb') as file: 
    data = requests.get(url)
    file.write(data.content)
