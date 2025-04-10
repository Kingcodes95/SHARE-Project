# Imports the create engine function to create connection to Database
from sqlalchemy import create_engine

# Import the declarative_base for defining database models
from sqlalchemy.ext.declarative import declarative_base

# Import session maker to manage the databases sessions (The connections)
from sqlalchemy.orm import sessionmaker

# Import Dotenv for eni variables/ keeps them out of Git
from dotenv import load_dotenv
import os # in order to interact with .env

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL) # Creates the engine for the database

# Define a session, autocommit=False: explicitly commit transactions
# autoflush=False: Changes aren't auto flushed to the db
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base() # Base class for defining ORM tables

def get_db():
    db = SessionLocal() # Creates a new db session
    try:
        yield db
    finally:
        db.close() 