import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Login,
  Mail,
  Lock,
  Loader2,
  Eye,
  EyeOff,
  ArrowRight,
  Film,
  Sparkles,
  MessageSquare,
  Users,
  AlertCircle,
} from "lucide-react";
import AuthBackground from "@/components/auth/AuthBackground";
import SupportWidget from "@/components/components/SupportWidget";
import DownloadButtons from "@/components/downloadButtons";
import { safeReturnTo } from "@/lib/authReturnTo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const returnTo = safeReturnTo();
  const bannedParam = new URLSearchParams(window.location.search).get("banned");
  const isBanned = bannedParam === "1";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginWithEmailPassword(email, password);
      const me = await base44.auth.me();
      if (me.membership_status === "suspended") {
        await base44.auth.logout();
        setError("Hesabınız askıya alınmıştır. Giriş yapamazsınız. İletişime geçin.");
        setLoading(false);
        return;
      }
      window.location.href = returnTo;
    } catch (err) {
      setError(err.message || "Geçersiz e-posta veya şifre");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Sparkles, label: "Yüksek Kalite" },
    { icon: MessageSquare, label: "Canlı Sohbeti" },
    { icon: Lock, label: "Şifreli & Şifresiz Odalar" },
    { icon: Users, label: "Arkadaşlarla İzle" },
  ];

  return (
    <AuthBackground>
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e50914]/10 border border-[#e50914]/20 text-white">
          <Film className="w-5 h-5 text-white" />
          <h1 className="text-2xl font-bold tracking-tight">FİLMKEYFİ</h1>
        </div>
        <p className="text-sm text-[#a0a0a0] mt-2">
          Sinematik deneyimi sosyal etkileşimle birleştiren, gerçek zamanlı izleme odaları ve profesyonel içerik yönetimi sunan premium film ve dizi izleme platformu.
        </p>
      </div>

      {/* Login Box */}
      <div className="bg-[#141414]/95 backdrop-blur-sm rounded-2xl border border-[#2a2a2a] p-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white">Hoş Geldiniz!</h2>
        <p className="text-sm text-[#a0a0a0] mt-1">Hesabınıza giriş yaparak devam edin.</p>

        {isBanned && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-sm flex items-start gap-2 mt-4">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Hesabınız Askıya Alındı</p>
              <p className="text-xs mt-1">Hesabınız site yöneticileri tarafından askıya alınmıştır. Lütfen destekle iletişime geçin.</p>
            </div>
          </div>
        )}

        {error && !isBanned && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <Label htmlFor="email" className="text-[#a0a0a0] text-xs">E-posta</Label>
            <div className="relative mt-1">
              <Mail className="w-4 h-4 text-[#a0a0a0] absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                autoFocus
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-9 bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-[#555] focus:border-[#e50914]"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-[#a0a0a0] text-xs">Şifre</Label>
            <div className="relative mt-1">
              <Lock className="w-4 h-4 text-[#a0a0a0] absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-9 pr-10 bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-[#555] focus:border-[#e50914]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0a0a0] hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-[#e50914] w-4 h-4"
              />
              <span className="text-[#a0a0a0] text-xs">Beni hatırla</span>
            </label>
            <Link to="/forgot-password" className="text-xs text-[#a0a0a0] hover:underline hover:text-white">
              Şifremi Unuttum?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e50914] hover:bg-[#b80710] text-white font-medium py-2 rounded-lg transition"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Giriş Yap
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#2a2a2a]" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#141414] px-2 text-[#a0a0a0]">Veya</span></div>
        </div>

        <Link to="/register">
          <Button variant="outline" className="w-full border-[#2a2a2a] text-white hover:bg-[#1a1a1a]">
            Hesap Oluştur
          </Button>
        </Link>
      </div>

      {/* Footer Features */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-[#141414]/60 border border-[#2a2a2a]">
            <f.icon className="w-4 h-4 text-[#e50914]" />
            <span className="text-xs text-[#a0a0a0]">{f.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-[#a0a0a0]">Mobil indirme butonları</p>
        <DownloadButtons variant="light" />
      </div>

      <div className="mt-6 text-center text-xs text-[#555]">
        <p>© 2026 FilmKeyfi. Tüm hakları saklıdır.</p>
      </div>

      <SupportWidget />
    </AuthBackground>
  );
}
