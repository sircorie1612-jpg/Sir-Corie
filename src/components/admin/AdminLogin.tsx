import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import { DROP_LOGO_IMAGE } from '../../data/mockData';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToStore }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setErrorMessage('Incorrect passcode. Please enter the valid administrator PIN (1234).');
      setPassword('');
    }
  };

  const handleKeypadPress = (digit: string) => {
    if (password.length < 8) {
      const next = password + digit;
      setPassword(next);
      setError(false);
      if (next === '1234') {
        setTimeout(() => {
          onSuccess();
        }, 200);
      }
    }
  };

  const handleBackspace = () => {
    setPassword((prev) => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E8DFD5] shadow-xl p-8 sm:p-10 space-y-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Brand Logo & Shield Header */}
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            <div className="w-16 h-16 rounded-full bg-[#153823] p-2 mx-auto flex items-center justify-center border-2 border-[#E07A1E]/40 shadow-md">
              <img
                src={DROP_LOGO_IMAGE}
                alt="Drop Palm Oil"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/Y7vQLWph/Whats-App-Image-2026-09-28-at-5-17-47-PM-1-removebg-preview.png';
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#E07A1E] text-white flex items-center justify-center shadow-xs">
              <Lock className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B85D0D] block">
              Restricted Access
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153823] mt-1">
              Admin Portal
            </h2>
            <p className="text-xs text-[#6B6154] mt-1">
              Drop Palm Oil · Store Management & Sales Tracker
            </p>
          </div>
        </div>

        {/* Passcode Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#241F17] text-center">
              Enter Administrator Passcode
            </label>

            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#8C8274] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                placeholder="Enter 1234"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`w-full pl-10 pr-11 py-3 text-center text-lg tracking-widest font-mono bg-[#FAF7F2] border rounded-2xl text-[#153823] focus:outline-none focus:bg-white transition-all ${
                  error
                    ? 'border-rose-400 ring-2 ring-rose-200'
                    : 'border-[#D5C6B5] focus:border-[#153823]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C8274] hover:text-[#153823] p-1 cursor-pointer"
                title={showPassword ? 'Hide passcode' : 'Show passcode'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 justify-center animate-in fade-in duration-150">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Quick Keypad for Mobile or Touch */}
          <div className="grid grid-cols-3 gap-2 pt-1 max-w-[240px] mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleKeypadPress(digit)}
                className="py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EAE2D7] text-[#153823] font-bold text-base transition-colors cursor-pointer border border-[#E8DFD5]"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setPassword('1234');
                setTimeout(() => onSuccess(), 150);
              }}
              className="py-2.5 rounded-xl bg-[#E7F3EC] hover:bg-[#D5EADF] text-[#153823] font-bold text-xs transition-colors cursor-pointer border border-[#C5DEC9]"
              title="Autofill passcode 1234"
            >
              1234
            </button>
            <button
              type="button"
              onClick={() => handleKeypadPress('0')}
              className="py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EAE2D7] text-[#153823] font-bold text-base transition-colors cursor-pointer border border-[#E8DFD5]"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EAE2D7] text-[#8C8274] hover:text-[#153823] font-bold text-xs transition-colors cursor-pointer border border-[#E8DFD5]"
            >
              ⌫
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#153823] hover:bg-[#0D2216] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Unlock Admin Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Hint banner & Back to store */}
        <div className="pt-4 border-t border-[#F0EBE1] space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8F0] border border-[#E07A1E]/30 text-[11px] text-[#B85D0D] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E07A1E]" />
            <span>Passcode: <strong className="font-bold text-[#153823]">1234</strong></span>
          </div>

          <div>
            <button
              type="button"
              onClick={onBackToStore}
              className="inline-flex items-center gap-1.5 text-xs text-[#5C554B] hover:text-[#153823] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Store</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
