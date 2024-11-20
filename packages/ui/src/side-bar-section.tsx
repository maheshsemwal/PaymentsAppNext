import { Sidebar } from "./components/ui/sidebar";

export const SideBarSection = ({ children }: { children: React.ReactNode }) => {
    return (
      <div>
        <Sidebar children={children}/>
      </div>
    );
  };