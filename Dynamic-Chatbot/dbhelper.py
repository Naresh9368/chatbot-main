import mysql.connector
import sys

class DBHelper:
    def __init__(self):
        # Establish a database connection
        try:
            self.db = mysql.connector.connect(host="localhost", user="root", password="", database="virtual")
            self.cursor = self.db.cursor(dictionary=True)
        except mysql.connector.Error as error:
            print("Some error occurred. Could not connect to the database.")
            print(error)
            sys.exit(0)
        else:
            print("Connected to the database.")
        #self.fetch_chatbot_data()

    def fetch_chatbot_data(self):
        # Fetch data from the chat_data table
        self.cursor.execute("SELECT * FROM chat_data")
        chat_data_rows = self.cursor.fetchall()

        chatbot_data = {}

        # Fetch options and URL links for each chat_data entry
        for entry in chat_data_rows:
            chat_key = entry['chat_key']
            chatbot_data[chat_key] = {
                'title': entry['title'],
                'options': []
            }

            # Fetch options for this chat_data entry
            self.cursor.execute("SELECT option_text FROM chat_options WHERE chat_data_id = %s", (entry['id'],))
            options_rows = self.cursor.fetchall()
            chatbot_data[chat_key]['options'] = [row['option_text'] for row in options_rows]

            # Fetch URL links if present
            if entry['url_more']:
                chatbot_data[chat_key]['url'] = {
                    'more': entry['url_more'],
                    'link': []
                }

                # Fetch URL links for this chat_data entry
                self.cursor.execute("SELECT link_text FROM chat_url_links WHERE chat_data_id = %s", (entry['id'],))
                links_rows = self.cursor.fetchall()
                chatbot_data[chat_key]['url']['link'] = [row['link_text'] for row in links_rows]

        # Close the cursor and the database connection (if needed)
        # self.cursor.close()
        # self.db.close()

        # Return the structured chatbot data
        return chatbot_data
        #print(chatbot_data)

#obj=DBHelper()