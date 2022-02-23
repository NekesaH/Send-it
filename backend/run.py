from app import create_app
from config import TestConfig

if __name__=="__main__":
    app=create_app(TestConfig)
    app.run()