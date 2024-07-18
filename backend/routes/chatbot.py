
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

import logging
from bson import ObjectId
app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)

class ChatBot:
    def __init__(self, db):
        self.state = "INITIAL"
        self.db = db
        self.tag_number = None  # Add a variable to store the tag number

    def process_text(self, text):
        if self.state == "INITIAL":
            self.state = "ASKED_NAME"
            return "What is your name?", []
        elif self.state == "ASKED_NAME":
            self.state = "GREETED"
            return "Write your tag number", []
        elif self.state == "GREETED":
            # Store the tag number in the instance variable
            self.tag_number = text
            tag_data = self.db.tagToBeVerified.find_one({"tagNo": self.tag_number})
            if tag_data:
                self.state = "DETAIL"
                return f"Tag details: {self.to_json_serializable(tag_data)}", []
            else:
                self.state = "GREETED"
                return "Tag number not found. Please try again.", []

        # Other conditions for handling different inputs
        # ...
        return "Sorry, I don't understand that.", []

    @staticmethod
    def to_json_serializable(document):
        if isinstance(document, ObjectId):
            return str(document)
        elif isinstance(document, dict):
            return {key: ChatBot.to_json_serializable(value) for key, value in document.items()}
        elif isinstance(document, list):
            return [ChatBot.to_json_serializable(item) for item in document]
        else:
            return document

# Setup MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
print("hello")
db = client.maharastra

# Create an instance of the chatbot
bot = ChatBot(db)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    response, buttons = bot.process_text(user_input)
    app.logger.debug(f"Chatbot response: {response}")

    if bot.state == "DETAIL" and bot.tag_number:
        app.logger.debug(f"Searching for tag number: {bot.tag_number}")
        tag_data = bot.db.tagToBeVerified.find_one({"tagNo": bot.tag_number})
        if tag_data:
            tag_data_serializable = bot.to_json_serializable(tag_data)
            app.logger.debug(f"Tag data found: {tag_data_serializable}")
            formatted_tag_data = format_tag_data(tag_data_serializable)
            return jsonify({"response": response, "buttons": buttons, "seedDetails": formatted_tag_data})
        else:
            app.logger.debug(f"No tag data found for: {bot.tag_number}")

    return jsonify({"response": response, "buttons": buttons})

def format_tag_data(data):
    formatted_data = {
        "Tag Number": data.get('tagNo'),
        "Lot Number": data.get('lotNo'),
        "Year": data.get('year'),
        "Season": data.get('season'),
        "SPA Name": data.get('spaName'),
        "SPA Code": data.get('spaCode'),
        "Source of Seed": data.get('sourceOfSeed'),
        "Variety Name": data.get('varietyName'),
        "Variety Code": data.get('varietyCode'),
        "Source Class": data.get('sourceClass'),
        "Crop Name": data.get('cropName'),
        "Crop Code": data.get('cropCode'),
        "District Name": data.get('districtName'),
        "District Code": data.get('districtCode'),
        "Block Name": data.get('blockName'),
        "Block Code": data.get('blockCode'),
        "Godown Name": data.get('godownName'),
        "Godown ID": data.get('godownId'),
        "Source Type": data.get('sourceType'),
        "Bag Size": data.get('bagSize'),
        "Previous Bill Number": data.get('previousBillNo'),
        "Previous Bill Date": data.get('previousBillDate'),
        "Addition Date": data.get('additionDate'),
        "Status": data.get('status'),
        "RO Code": data.get('roCode'),
        "RO Name": data.get('roName'),
        "App Number": data.get('appNo'),
        "App Number Count": data.get('appNoCount'),
        "Payment Status": data.get('paymentStatus'),
    }
    return formatted_data

if __name__ == '__main__':
    app.run(debug=True)


# import transformers
# import numpy as np
# import codecs
# import tensorflow as tf
# import pandas as pd
# import ast
# import tqdm
# import matplotlib.pyplot as plt
# %matplotlib inline
# # import seaborn as sns
# import pandas as pd
# import re
# import tensorflow as tf
# from tensorflow.keras.layers import Embedding, LSTM, Dense
# from tensorflow.keras.models import Model
# from tensorflow.keras.preprocessing.text import Tokenizer
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# import numpy as np
# import re
# import warnings
# import tensorflow_datasets as tfds
# import tensorflow as tf
# import joblib
# import time
# import numpy as np
# import matplotlib.pyplot as plt
# from tensorflow.keras.utils import Progbar
# warnings.filterwarnings('ignore')









 