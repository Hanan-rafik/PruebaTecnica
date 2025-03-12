from fastapi import APIRouter, HTTPException
import boto3
from botocore.exceptions import ClientError

router = APIRouter()

# Configuración de Cognito
COGNITO_CLIENT_ID = "tu-client-id"  # Reemplaza con tu Client ID
COGNITO_USER_POOL_ID = "tu-user-pool-id"  # Reemplaza con tu User Pool ID
cognito = boto3.client("cognito-idp")

@router.post("/register")
async def register(email: str, password: str):
    try:
        response = cognito.sign_up(
            ClientId=COGNITO_CLIENT_ID,
            Username=email,
            Password=password,
            UserAttributes=[{"Name": "email", "Value": email}],
        )
        return {"message": "Usuario registrado, verifica tu email"}
    except ClientError as e:
        raise HTTPException(status_code=400, detail=e.response["Error"]["Message"])

@router.post("/login")
async def login(email: str, password: str):
    try:
        response = cognito.initiate_auth(
            ClientId=COGNITO_CLIENT_ID,
            AuthFlow="USER_PASSWORD_AUTH",
            AuthParameters={"USERNAME": email, "PASSWORD": password},
        )
        return {"token": response["AuthenticationResult"]["IdToken"]}
    except ClientError as e:
        raise HTTPException(status_code=400, detail=e.response["Error"]["Message"])