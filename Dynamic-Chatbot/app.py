from flask import Flask, render_template, jsonify
from dbhelper import DBHelper

app = Flask(__name__)
db_helper = DBHelper()

@app.route("/")
def index():
    return render_template("base.html")

@app.route("/chatbot", methods=["GET"])
def chatbot():
    try:
        # Fetch chatbot data using the DBHelper
        chatbot_data = db_helper.fetch_chatbot_data()
        return jsonify(chatbot_data)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
