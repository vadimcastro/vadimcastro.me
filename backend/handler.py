# backend/handler.py
import json
import os
import jwt
import boto3
import bcrypt
from datetime import datetime, timedelta
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])
JWT_SECRET = os.environ['JWT_SECRET']

def create_token(email):
    exp = datetime.utcnow() + timedelta(days=1)
    return jwt.encode(
        {'email': email, 'exp': exp},
        JWT_SECRET,
        algorithm='HS256'
    )

def handler(event, context):
    method = event['requestContext']['http']['method']
    path = event['requestContext']['http']['path']
    
    # Parse request body if it exists
    body = {}
    if 'body' in event:
        body = json.loads(event['body'])
    
    # CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }
    
    # Handle sign up
    if method == 'POST' and path == '/auth/signup':
        email = body.get('email')
        password = body.get('password')
        
        # Check if user exists
        response = table.get_item(Key={'email': email})
        if 'Item' in response:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'message': 'User already exists'})
            }
        
        # Hash password and save user
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        table.put_item(Item={
            'email': email,
            'password_hash': password_hash.decode('utf-8'),
            'created_at': datetime.utcnow().isoformat()
        })
        
        token = create_token(email)
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'token': token})
        }
    
    # Handle sign in
    if method == 'POST' and path == '/auth/signin':
        email = body.get('email')
        password = body.get('password')
        
        # Get user
        response = table.get_item(Key={'email': email})
        if 'Item' not in response:
            return {
                'statusCode': 401,
                'headers': headers,
                'body': json.dumps({'message': 'Invalid credentials'})
            }
        
        user = response['Item']
        
        # Verify password
        if not bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
            return {
                'statusCode': 401,
                'headers': headers,
                'body': json.dumps({'message': 'Invalid credentials'})
            }
        
        token = create_token(email)
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'token': token})
        }
    
    # Handle OPTIONS (CORS)
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    return {
        'statusCode': 404,
        'headers': headers,
        'body': json.dumps({'message': 'Not Found'})
    }
