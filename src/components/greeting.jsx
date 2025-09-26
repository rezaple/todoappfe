import { useState, useEffect } from 'react';
import { Sun, Moon, Sunrise, Sunset } from 'lucide-react';

export default function Greeting({name}) {
  const [greeting, setGreeting] = useState('');
  const [icon, setIcon] = useState(null);

  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting('Selamat Pagi');
      setIcon(<Sunrise className="w-8 h-8 text-orange-500" />);
    } else if (hour >= 12 && hour < 15) {
      setGreeting('Selamat Siang');
      setIcon(<Sun className="w-8 h-8 text-yellow-500" />);
    } else if (hour >= 15 && hour < 18) {
      setGreeting('Selamat Sore');
      setIcon(<Sunset className="w-8 h-8 text-orange-600" />);
    } else {
      setGreeting('Selamat Malam');
      setIcon(<Moon className="w-8 h-8 text-blue-400" />);
    }
  };

  useEffect(() => {
    // Set greeting pertama kali
    getGreeting();
    
    // Update setiap detik
    const interval = setInterval(getGreeting, 1000);
    
    // Cleanup interval
    return () => clearInterval(interval);
  }, []);

  // Tentukan background gradient berdasarkan waktu
  const getBackgroundClass = () => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return ' text-black bg-orange-100 from-orange-100 to-yellow-100'; // Pagi
    } else if (hour >= 12 && hour < 15) {
      return ' text-black bg-yellow-100 from-yellow-100 to-orange-100'; // Siang
    } else if (hour >= 15 && hour < 18) {
      return ' text-black bg-orange-200 from-orange-200 to-red-100'; // Sore
    } else {
      return ' text-white bg-blue-900 from-blue-900 to-purple-900'; // Malam
    }
  };

  return (
        <div className={`rounded-lg shadow p-4  ${getBackgroundClass()} `}>
            <div className='flex flex-row items-center space-x-2'>{icon} <h1 className='text-3xl'>{greeting}, {name} !</h1></div>
            <small>Apa rencanamu hari ini?</small>
        </div>
  );
}