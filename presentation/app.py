from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/nlp.html')
def nlp():
    return render_template('nlp-yeon.html')

@app.route('/lstm.html')
def lstm():
    return render_template('stock-lstm.html')

@app.route('/monica.html')
def monica():
    return render_template('monica.html')

if __name__ == '__main__':
  app.run(debug=True)
