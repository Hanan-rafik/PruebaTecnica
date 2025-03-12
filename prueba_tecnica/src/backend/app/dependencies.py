from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


COGNITO_USER_POOL_ID = "tu-user-pool-id"
COGNITO_REGION = "tu-region"  # Ej: us-east-1

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        
        jwks_url = f"https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{COGNITO_USER_POOL_ID}/.well-known/jwks.json"
        jwks = requests.get(jwks_url).json()
        public_key = jwt.get_unverified_header(token)["kid"]
        key = next(k for k in jwks["keys"] if k["kid"] == public_key)
        decoded_token = jwt.decode(token, key, algorithms=["RS256"], audience=COGNITO_CLIENT_ID)
        return decoded_token
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado",
        )