# Google Sheets API Credentials Setup

## Para desarrolladores nuevos:

1. Solicita el archivo `credentials.json` al líder del equipo
2. Copia el archivo recibido a esta carpeta: `apps/investment-tracker-api/config/credentials.json`
3. Verifica que tu `.env` apunte correctamente:
   ```
   GOOGLE_SHEET_KEYFILE=apps/investment-tracker-api/config/credentials.json
   ```

## Cómo obtener credenciales (si necesitas crear nuevas):

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Sheets
4. Ve a **Credentials** → **Create Credentials** → **Service Account**
5. Descarga el archivo JSON de credenciales
6. Renómbralo a `credentials.json` y colócalo en esta carpeta

## Seguridad

⚠️ **NUNCA** subas `credentials.json` a Git
- El archivo está en `.gitignore`
- Comparte credenciales solo vía canales seguros (1Password, email encriptado, etc.)
