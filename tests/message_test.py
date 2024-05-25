import requests

response = requests.post("http://localhost:8000/message/", data={"conteudo": "Teste de api", "telefone": "55 11 93765-7501", "nome_cliente": "Dinho"})

print(response.text)
