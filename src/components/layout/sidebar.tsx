import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

import logo from "@/assets/logo.svg";

const Sidebar = ({
  isCollapsed,
  onToggle
}: {
  isCollapsed: boolean;
  onToggle: () => void;
}) => {
  const location = useLocation();

  const renderNavItem = (to: string, icon: string, label: string) => {
    const isActive = location.pathname === to;
    const linkClasses = `flex items-center gap-2 p-2 rounded transition-colors ${
      isCollapsed
        ? "justify-center hover:bg-gray-200 hover:text-black w-10 h-10"
        : "hover:bg-gray-200 hover:text-black w-full"
    } ${isActive ? "bg-[hsl(var(--custom-teal))] text-white" : ""}`;

    return (
      <li className={`${isCollapsed ? "" : "h-8 w-full"}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to={to} className={linkClasses}>
              <Icon
                icon={icon}
                width={24}
                height={24}
                className="text-lg transition-all duration-300"
              />
              {!isCollapsed && (
                <span className="whitespace-nowrap transition-opacity duration-300">
                  {label}
                </span>
              )}
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">
              <p>{label}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </li>
    );
  };

  return (
    <TooltipProvider>
      <div
        className={`relative h-full ${
          isCollapsed ? "w-24" : "w-48"
        } bg-white text-black flex flex-col border-r border-gray-300 transition-all duration-300`}
      >
        {/* Botão de colapso no topo */}
        <Button
          onClick={onToggle}
          className="absolute top-4 -right-4 bg-white border border-gray-200 text-black w-6 h-6 rounded-full flex items-center justify-center shadow hover:bg-gray-100"
        >
          {isCollapsed ? (
            <Icon icon="ci:chevron-right-duo" />
          ) : (
            <Icon icon="ci:chevron-left-duo" />
          )}
        </Button>

        {/* Conteúdo da Sidebar */}
        <a
          href="#"
          className={`flex items-center p-4 gap-2 text-lg font-bold ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <img
            src={logo}
            alt="Logo"
            className="flex-shrink-0 transition-all duration-300 w-8 h-8"
          />
          {!isCollapsed && (
            <span
              className={`whitespace-nowrap transition-opacity duration-300 ${
                isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
              }`}
            >
              FluxFi
            </span>
          )}
        </a>

        {/* Navegação */}
        <nav className="flex-1 flex flex-col items-center p-2">
          <ul className="flex flex-col items-center space-y-4 h-8 w-full">
            {renderNavItem("/", "cuida:chart-column-outline", "Dashboard")}
            {renderNavItem("/swap", "mage:exchange-a", "Swap")}
            {renderNavItem("/pools", "fluent:swimming-pool-48-filled", "Pools")}
            {renderNavItem("/loan", "ph:hand-coins-light", "Empréstimo")}
            {renderNavItem("/account", "solar:wallet-linear", "Conta")}
          </ul>
        </nav>

        {/* Botão de logout */}
        <div
          className={`p-2 ${
            isCollapsed ? "flex items-center justify-center" : "w-full"
          }`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={`flex items-center justify-center gap-2 p-2 bg-red-400 rounded hover:bg-red-700 transition-all duration-300 ${
                  isCollapsed
                    ? "justify-center w-10 h-10"
                    : "justify-start w-full"
                }`}
              >
                <Icon
                  icon="cuida:logout-outline"
                  width={24}
                  height={24}
                  className="text-lg"
                />
                {!isCollapsed && <span>Logout</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
