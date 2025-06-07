from flask_jwt_extended import create_access_token, decode_token
from datetime import timedelta

def create_token(identity, expires_in=60):
    return create_access_token(identity=identity, expires_delta=timedelta(minutes=expires_in))

def decode_user_token(token):
    try:
        return decode_token(token)
    except Exception:
        return None
