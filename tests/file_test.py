import requests

url = 'http://localhost:8000/file/'

file_path = './teste.pdf'

with open(file_path, 'rb') as file:
    files = {'file': (file_path, file, 'application/pdf')}
    
    # Parâmetros adicionais se necessário, como autenticação ou outros dados de formulário
    data = {
        'originalname': 'teste.pdf',  # Substitua com dados reais necessários
    }

    # Envia a requisição POST com o arquivo e dados
    response = requests.post(url, files=files, data=data)

    # Imprime a resposta da API
    print(response.text)

# Trata erros de conexão ou de HTTP
response.raise_for_status()
