import requests

response = requests.get("http://10.150.53.228:5001/monitoring/")

print(response.text)
