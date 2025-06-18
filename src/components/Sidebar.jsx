import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, FilePlus2, BarChart3, Info, Settings2, LogOut } from 'lucide-react';

const NavigationItem = ({ to, icon: IconComponent, label, isActive = false, onClick }) => {
  // Menambahkan transisi agar perubahan warna saat hover menjadi halus
  const baseClasses = "flex gap-5 items-center py-1.5 pl-2.5 w-full rounded-md cursor-pointer transition-colors duration-200";
  
  // Item yang TIDAK AKTIF sekarang punya efek hover dengan latar abu-abu samar
  const activeClasses = isActive ? "bg-neutral-800" : "hover:bg-neutral-100";
  
  const textClasses = isActive ? "text-slate-100" : "text-gray-500";
  const iconClasses = isActive ? "text-slate-100" : "text-gray-500";

  const content = (
    <>
      <div className="flex gap-2.5 justify-center items-center p-3 rounded-md min-h-12 w-[51px]">
        {IconComponent && <IconComponent className={`object-contain w-6 aspect-square ${iconClasses}`} strokeWidth={1.5} />}
      </div>
      <div className={`flex-1 text-base leading-none uppercase ${textClasses} flex items-center`}>
        {label}
      </div>
    </>
  );

  return onClick ? (
    <div onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      {content}
    </div>
  ) : (
    <Link to={to} className={`${baseClasses} ${activeClasses}`}>
      {content}
    </Link>
  );
};


export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const checkActive = (path) => location.pathname === path;

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-white border-r border-solid border-r-[color:var(--Neutral-200,#E3E8EF)] z-10 max-md:hidden">
      <div className="flex flex-col justify-between h-full py-8 px-16 max-md:px-5">
        <header className="flex gap-1.5 items-center text-gray-900">
          <Link to="/dashboard" className="flex gap-1.5 items-center">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-medium leading-none text-gray-900">KEUKU</h1>
              <p className="text-base leading-none text-center text-gray-900">Keuanganku</p>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c3f9725fb17cd42cb51d0c0a85e6ece351b26e75"
              className="object-contain shrink-0 aspect-square w-[41px]"
              alt="Keuku logo"
            />
          </Link>
        </header>

        <nav className="flex-1 flex flex-col justify-center">
          <NavigationItem
            to="/dashboard"
            icon={LayoutGrid}
            label="DASHBOARD"
            isActive={checkActive('/dashboard')}
          />
          <div className="mt-2.5">
            <NavigationItem
              to="/catat-transaksi"
              icon={FilePlus2}
              label="CATAT TRANSAKSI"
              isActive={checkActive('/catat-transaksi')}
            />
          </div>
          <div className="mt-2.5">
            <NavigationItem
              to="/statistik"
              icon={BarChart3}
              label="STATISTIK"
              isActive={checkActive('/statistik')}
            />
          </div>
          <div className="mt-2.5">
            <NavigationItem
              to="/tentang-keuku"
              icon={Info}
              label="TENTANG KEUKU"
              isActive={checkActive('/tentang-keuku')}
            />
          </div>
        </nav>

        <div className="space-y-2.5">
          <NavigationItem
            to="/pengaturan"
            icon={Settings2}
            label="PENGATURAN"
            isActive={checkActive('/pengaturan')}
          />
          <NavigationItem
            icon={LogOut}
            label="LOG OUT"
            onClick={handleLogout}
          />
        </div>
      </div>
    </aside>
  );
};