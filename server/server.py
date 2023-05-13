from http.server import SimpleHTTPRequestHandler, HTTPServer

from flask import Flask, render_template
import socket
app = Flask(__name__)

def get_local_ip():
    return socket.gethostbyname(socket.gethostname())
@app.route('/')
def index():
    return render_template('index.html')
    
if __name__ == '__main__':
    app.run(host=get_local_ip(), port=5000)
