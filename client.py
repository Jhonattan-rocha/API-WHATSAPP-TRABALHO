import socket

def send_file(filename, host, port):
    # Criar um objeto socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        # Conectar ao servidor
        s.connect((host, port))
        
        # Abrir o arquivo para ler em modo binário
        with open(filename, 'rb') as file:
            # Enviar o arquivo em partes (chunks)
            while True:
                data = file.read(1024)  # Ler 1024 bytes do arquivo
                if not data:
                    break  # Se não houver mais dados, sair do loop
                s.sendall(data)  # Enviar dados lidos

        print("Arquivo enviado com sucesso.")

# Uso da função
if __name__ == "__main__":
    send_file('./projeto.zip', '10.150.1.73', 65432)  # Substitua pelo caminho do arquivo e detalhes do servidor
