# A Crypto Portfolio Tracker
Track your crypto portfolio effortlessly — analyze performance, monitor returns, and stay in control of your investments.

## Create `.env` Files

Inside the `/api` directory, create a new file named `.env` and add the following line, replacing the placeholder with your actual CoinGecko API key:

```
API_KEY=<your_coin_gecko_api_key>
```

To setup the backend, navigate to the `/ui` directory, create a new file named `.env` and add the following line, replacing the placeholder with your actual API base URL:

```
REACT_APP_PROJECT_API_URL=<your_api_url>
```

## Linting & Code Quality

This project uses:

- ESLint for JavaScript/React linting (`/ui` folder)

- Pylint for Python linting (`/api` folder)

Below are the instructions for installing and running both.

### ESLint (React Frontend)

#### Install dependencies
```
cd ui
npm install
```
#### Run ESLint
```
npm run lint
```
To automatically fix problems where possible:
```
npm run lint:fix
```

### Pylint (Python Backend)

#### Install dependencies
```
pip install -r requirements.txt
```
#### Run Pylint
```
pylint api
```