import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../shared/hooks/useToast';
import { useDemoSession } from './useDemoSession';

export function useDemoProfileForm() {
  const { profile, enterDemo, leaveDemo } = useDemoSession();
  const [name, setName] = useState(profile?.name || '');
  const { notify } = useToast();
  const navigate = useNavigate();

  const handleNameChange = (event) => setName(event.target.value);
  const submit = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    if (enterDemo(name)) {
      notify('Selamat datang, ' + name.trim() + '!');
      navigate('/store');
    }
  };
  const handleUseGuest = () => {
    leaveDemo();
    setName('');
    notify('Kamu sekarang menjelajah sebagai tamu.');
  };

  return { profile, name, handleNameChange, submit, handleUseGuest };
}
