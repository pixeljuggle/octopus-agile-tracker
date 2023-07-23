/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Popover, PopoverContent, PopoverTrigger } from 'components/Popover/Popover';
import { useVibrate } from 'hooks/useVibrate';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UnknownObject } from 'types';
import { classnames } from 'utils';

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const vibrate = useVibrate();

  const toggleOpen = () => {
    vibrate(20);
    setOpen((prev) => !prev);
  };

  const navItems = [
    { label: 'Agile Rates', icon: <TrendingUpIcon />, to: '/rates' },
    { label: 'Consumption', icon: <MoneyIcon />, to: '/consumption' },
    { label: 'EV Charger', icon: <FuelIcon />, to: '/charger' },
    { label: 'Settings', icon: <SettingsIcon />, to: '/settings' },
  ];
  return (
    <>
      <div className="z-20">
        <Popover open={open} onOpenChange={setOpen} modal={true} placement="bottom-end">
          <PopoverTrigger
            onClick={() => toggleOpen()}
            className="flex h-11 w-11 flex-grow-0 items-center justify-center rounded bg-electric-violet-900 text-electric-violet-200"
          >
            <BurgerIcon open={open} />
          </PopoverTrigger>
          <PopoverContent className=" z-20 rounded bg-electric-violet-900 px-3 py-5">
            <nav className="flex flex-col items-start justify-start gap-2">
              {navItems.map((e, i) => {
                const active = location?.pathname === e.to;
                const linkStyles = classnames(
                  'flex',
                  'w-full',
                  'select-none',
                  'items-center',
                  'gap-4',
                  'rounded',
                  'px-4',
                  'py-3',
                  'text-left',
                  'font-semibold',
                  active ? 'text-electric-violet-900' : 'text-gray-300',
                  active ? '' : 'hover:bg-electric-violet-800',
                  active ? '' : 'hover:text-white',
                  active ? '' : 'hover:active:bg-heliotrope',
                  active ? '' : 'hover:active:text-electric-violet-900',
                  active ? 'bg-heliotrope' : ''
                );
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (active) return;
                      vibrate(50);
                      navigate(e.to);
                      setOpen(false);
                    }}
                    className={linkStyles}
                  >
                    {e.icon}
                    {e.label}
                  </button>
                );
              })}
            </nav>
          </PopoverContent>
        </Popover>
      </div>
      {open && <div className="pointer-events-all fixed left-0 top-0 z-10 h-screen w-screen overflow-hidden bg-electric-violet-950 bg-opacity-70"></div>}{' '}
    </>
  );
};

const BurgerIcon = ({ open }: { open: boolean }) => {
  const burgerStyles = /*tw*/ classnames('burger-icon', open ? 'open' : '');
  return (
    <div className={burgerStyles}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

const TrendingUpIcon = (props: UnknownObject) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-trending-up"
      {...props}
    >
      <path d="M22 7L13.5 15.5 8.5 10.5 2 17" />
      <path d="M16 7L22 7 22 13" />
    </svg>
  );
};

const MoneyIcon = (props: UnknownObject) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-pound-sterling"
      {...props}
    >
      <path d="M18 7c0-5.333-8-5.333-8 0M10 7v14M6 21h12M6 13h10" />
    </svg>
  );
};

const FuelIcon = (props: UnknownObject) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-fuel"
      {...props}
    >
      <path d="M3 22L15 22" />
      <path d="M4 9L14 9" />
      <path d="M14 22V4a2 2 0 00-2-2H6a2 2 0 00-2 2v18M14 13h2a2 2 0 012 2v2a2 2 0 002 2h0a2 2 0 002-2V9.83a2 2 0 00-.59-1.42L18 5" />
    </svg>
  );
};

const SettingsIcon = (props: UnknownObject) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-settings"
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" />
      <circle cx={12} cy={12} r={3} />
    </svg>
  );
};
