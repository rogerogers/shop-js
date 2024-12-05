'use client';

import { usePathname } from '@rogerogers/i18n/routing';
import { ChevronRight } from 'lucide-react';

import { Link } from '@rogerogers/i18n/routing';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@rogerogers/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@rogerogers/ui/sidebar';
import { ElementType } from 'react';

export function NavMain({
  groupName,
  items,
}: {
  groupName: string;
  items: {
    title: string;
    url: string;
    icon?: ElementType;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const { toggleSidebar, isMobile } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={
              typeof item.items === 'undefined'
                ? false
                : item.items.some((subItem) => {
                    return subItem.url.startsWith(pathname);
                  })
            }
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} isActive={false}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname == subItem.url}
                      >
                        <Link
                          href={subItem.url}
                          onClick={() => {
                            isMobile && toggleSidebar();
                          }}
                        >
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
