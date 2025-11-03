import React, { useState, useEffect } from 'react';
import { CloudSun, X, Wind, Droplets, Eye, Gauge, Sunrise, Sunset, ArrowLeft, LogOut, User } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

export default function WeatherDashboard() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading: authLoading } = useAuth0();
  
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchWeatherData();
    }
  }, [isAuthenticated]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api-weather-app-papv.onrender.com/api/weather');
      const result = await response.json();
      
      if (result.success) {
        setWeatherData(result.data);
        setError(null);
      } else {
        setError('Failed to fetch weather data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
      month: 'short', 
      day: 'numeric'
    });
  };

  const removeCity = (cityId) => {
    setWeatherData(weatherData.filter(city => city.id !== cityId));
  };

  const handleAddCity = () => {
    if (newCity.trim()) {
      console.log('Add city:', newCity);
      setNewCity('');
    }
  };

  const getRandomColor = (cityId) => {
    const colors = [
      'from-yellow-500 to-orange-600',
      'from-purple-500 to-pink-600',
      'from-blue-500 to-cyan-600',
      'from-red-500 to-rose-600',
      'from-green-500 to-emerald-600',
      'from-orange-500 to-amber-600',
      'from-indigo-500 to-purple-600',
      'from-teal-500 to-green-600',
      'from-pink-500 to-fuchsia-600',
      'from-lime-500 to-green-600',
      'from-sky-500 to-blue-600',
      'from-rose-500 to-red-600',
      'from-violet-500 to-purple-600',
      'from-amber-500 to-yellow-600',
      'from-emerald-500 to-teal-600',
      'from-fuchsia-500 to-pink-600',
    ];
    const index = cityId % colors.length;
    return colors[index];
  };

  // Auth0 Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-gray-900 to-black flex flex-col">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="flex items-center justify-center gap-3 mb-6">
              <CloudSun className="w-16 h-16 text-purple-500" />
              <h1 className="text-5xl font-bold text-white">Weather App</h1>
            </div>
            <p className="text-gray-300 mb-8 text-lg">
              Sign in to access real-time weather information for cities worldwide
            </p>
            <button
              onClick={() => loginWithRedirect()}
              className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-lg shadow-lg"
            >
              Sign In / Sign Up
            </button>
          </div>
        </div>
        <footer className="py-6 text-center bg-gray-800 bg-opacity-50">
          <p className="text-gray-400">Rvvshid04</p>
        </footer>
      </div>
    );
  }

  // Data Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-300">Loading weather data...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-gray-900 to-black flex items-center justify-center">
        <div className="bg-red-900 bg-opacity-50 border border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-red-200 text-xl font-bold mb-2">Error</h2>
          <p className="text-red-300">{error}</p>
          <button 
            onClick={fetchWeatherData}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Detail View
  if (selectedCity) {
    const city = selectedCity;
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-gray-900 to-black flex flex-col">
        <div className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => setSelectedCity(null)}
              className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>

            {/* Same Card Design as Dashboard */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden">
              {/* Top - Colored Section */}
              <div className={`bg-gradient-to-br ${getRandomColor(city.id)} p-5 relative`}>
                <div className="mb-3">
                  <h3 className="text-2xl font-bold text-white">{city.name}, {city.sys.country}</h3>
                  <p className="text-sm text-white text-opacity-80 mt-1">{formatDate()}</p>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={getWeatherIcon(city.weather[0].icon)} 
                      alt={city.weather[0].description}
                      className="w-14 h-14"
                    />
                    <div>
                      <p className="text-white capitalize font-medium text-sm">{city.weather[0].description}</p>
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white">{city.main.temp}°C</div>
                </div>

                <div className="text-white space-y-1 text-xs">
                  <p>Temp Min: {kelvinToCelsius(city.main.temp_min)}°C</p>
                  <p>Temp Max: {kelvinToCelsius(city.main.temp_max)}°C</p>
                </div>
              </div>

              {/* Bottom - Dark Grey Section - 3 Columns */}
              <div className="bg-gray-800 p-5">
                <div className="grid grid-cols-3 gap-4 text-xs">
                  {/* Left Column */}
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <span className="text-gray-400">Pressure:</span>
                      <span className="text-white font-semibold">{city.main.pressure}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400">Humidity:</span>
                      <span className="text-white font-semibold">{city.main.humidity}%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400">Visibility:</span>
                      <span className="text-white font-semibold">{(city.visibility / 1000).toFixed(1)} km</span>
                    </div>
                  </div>

                  {/* Middle Column - Wind */}
                  <div className="flex flex-col items-center justify-center border border-gray-700 rounded-lg py-3">
                    <Wind className="w-7 h-7 text-purple-400 mb-1" />
                    <p className="text-white font-semibold text-sm">{city.wind.speed} m/s</p>
                    <p className="text-gray-400 text-xs">{city.wind.deg} degrees</p>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <span className="text-gray-400">Sunrise:</span>
                      <span className="text-white font-semibold">{formatTime(city.sys.sunrise)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400">Sunset:</span>
                      <span className="text-white font-semibold">{formatTime(city.sys.sunset)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-6 text-center bg-gray-800 bg-opacity-50">
          <p className="text-gray-400">Rvvshid04</p>
        </footer>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-gray-900 to-black flex flex-col">
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with User Info */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center justify-center gap-3 flex-1">
                <CloudSun className="w-8 h-8 text-purple-500" />
                <h1 className="text-3xl font-bold text-white">Weather App</h1>
              </div>
              
              {/* User Profile & Logout */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="w-5 h-5" />
                  <span className="text-sm">{user.name || user.email}</span>
                </div>
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Add City Bar */}
          <div className="max-w-2xl mx-auto mb-8 flex gap-3">
            <input
              type="text"
              placeholder="Enter a city"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCity()}
              className="flex-1 px-4 py-3 bg-transparent text-white rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 placeholder-gray-400"
            />
            <button
              onClick={handleAddCity}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              Add City
            </button>
          </div>

          {/* Weather Cards Grid - 2 columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {weatherData.map((city) => (
              <div
                key={city.id}
                className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
              >
                {/* Card Portrait Layout */}
                <div onClick={() => setSelectedCity(city)}>
                  {/* Top - Colored Section */}
                  <div className={`bg-gradient-to-br ${getRandomColor(city.id)} p-5 relative`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCity(city.id);
                      }}
                      className="absolute top-3 right-3 text-white hover:text-red-300 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="mb-3">
                      <h3 className="text-2xl font-bold text-white">{city.name}, {city.sys.country}</h3>
                      <p className="text-sm text-white text-opacity-80 mt-1">{formatDate()}</p>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={getWeatherIcon(city.weather[0].icon)} 
                          alt={city.weather[0].description}
                          className="w-14 h-14"
                        />
                        <div>
                          <p className="text-white capitalize font-medium text-sm">{city.weather[0].description}</p>
                        </div>
                      </div>
                      <div className="text-4xl font-bold text-white">{kelvinToCelsius(city.main.temp)}°C</div>
                    </div>

                    <div className="text-white space-y-1 text-xs">
                      <p>Temp Min: {kelvinToCelsius(city.main.temp_min)}°C</p>
                      <p>Temp Max: {kelvinToCelsius(city.main.temp_max)}°C</p>
                    </div>
                  </div>

                  {/* Bottom - Dark Grey Section - 3 Columns */}
                  <div className="bg-gray-800 p-5">
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      {/* Left Column */}
                      <div className="space-y-3">
                        <div className="flex flex-col">
                          <span className="text-gray-400">Pressure:</span>
                          <span className="text-white font-semibold">{city.main.pressure}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-400">Humidity:</span>
                          <span className="text-white font-semibold">{city.main.humidity}%</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-400">Visibility:</span>
                          <span className="text-white font-semibold">{(city.visibility / 1000).toFixed(1)} km</span>
                        </div>
                      </div>

                      {/* Middle Column - Wind */}
                      <div className="flex flex-col items-center justify-center border border-gray-700 rounded-lg py-3">
                        <Wind className="w-7 h-7 text-purple-400 mb-1" />
                        <p className="text-white font-semibold text-sm">{city.wind.speed} m/s</p>
                        <p className="text-gray-400 text-xs">{city.wind.deg} degrees</p>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-3">
                        <div className="flex flex-col">
                          <span className="text-gray-400">Sunrise:</span>
                          <span className="text-white font-semibold">{formatTime(city.sys.sunrise)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-400">Sunset:</span>
                          <span className="text-white font-semibold">{formatTime(city.sys.sunset)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Cities */}
          {weatherData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No cities added yet. Add a city to get started!</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-800 bg-opacity-50">
        <p className="text-gray-400">Rvvshid04</p>
      </footer>
    </div>
  );
}