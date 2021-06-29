from flask import Flask
from flask_sqlalchemy import SQLAlchemy



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///salario.db'
app.config['SECRET_KEY'] = 'salario'
db = SQLAlchemy(app)

from API.Admin import rotas