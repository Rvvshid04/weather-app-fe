# Weather App 

Head to this link to check it out: [Weather App](https://rvvshid04.github.io/weather-app-fe/)

## Technologies
- React
- Tailwindcss
- Express 
- Axios
- Cors
- Dotenv
- OpenWeatherMap API
- Lucide React
- Auth0
- GitHub for repo and frontend hosting.
- Render for backend.

### Development Acknowledgement :
I used documentation, YT tutorials, and AI-assisted development using Claude AI and ChatGPT.

## Features
- Retrieves and displays weather information integrating authentication and authorization mechanisms.
- Responsive to both Desktop and Mobile UI.
- Data caching (5-minute expiration) 
- Login/ Logout to access weather app
- MFA authentication using **OTP via Authenticator, Email, Recovery Code** on Auth0.
    - Couldn't implement Email without another form hence MFA - so I went with Authenticator. As opposed to SMS (which required SMS provider like Twilio), FIDO security keys (overkill), etc.

---

## Setup Instructions

Follow these steps to run the Weather App locally:

1. Clone the repository
```bash
git clone https://github.com/rvvshid04/weather-app-fe.git
```

2. Install dependencies
**Frontend**:
```bash
cd weather-app-fe
npm install
```

**Backend**:
```bash
cd weather-app-be
npm install
```

3. Create a .env file in the backend folder with the following:
```bash
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
```
The app uses OpenWeatherMap for live weather data.

4. Run the application
In two separate terminals - 
**Start backend**
```bash
cd weather-app-be
npm run dev
```

**Start frontend**
```bash
cd weather-app-fe
npm run dev
```

### Additional notes:
- Ensure you have Node.js installed (v16+ recommended).
- The app caches weather data for 5 minutes to reduce API calls.
- Login is required to access the weather information. Multi-factor authentication (MFA) is enabled.
