#!python
import cherrypy 
import MySQLdb 
import os

class Root: 
    def index(self): 
        # Sample page that displays the number of records in "table" 
        # Open a cursor, using the DB connection for the current thread 
        db = MySQLdb.connect('127.0.0.1', 'root', 'fall12', 'users', port=3306)
        c = db.cursor() 
        c.execute('select count(*) from users') 
        res = c.fetchone() 
        c.close()
        f = file('index.html')
        html = f.read() % res[0]
        f.close()
        return html
    index.exposed = True 

    def about(self): 
        f = file('about.html')
        html = f.read()
        f.close()
        return html
    about.exposed = True

    def display(self, url, urlText, username, token): 
        f = file('display.php')
        html = f.read() % {"url":url}
        f.close()
        return html
    display.exposed = True

conf = "config.txt"
cherrypy.quickstart(Root(), config=conf)