'use client';

import { SiAlibabadotcom, SiShopify } from '@icons-pack/react-simple-icons';
import { Factory, Key } from 'lucide-react';

import {
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
} from 'lucide-react';

import { NavMain } from '@/components/layout/sidebar/nav-main';
import { NavProjects } from '@/components/layout/sidebar/nav-projects';
import { NavUser } from '@/components/layout/sidebar/nav-user';
import { TeamSwitcher } from '@/components/layout/sidebar/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@rogerogers/ui/sidebar';
import { IconBuildingWarehouse } from '@tabler/icons-react';
import { ElementType } from 'react';

// This is sample data.
const data = {
  teams: [
    {
      name: 'Buy & Sell',
      logo: GalleryVerticalEnd as ElementType,
      plan: 'Enterprise',
    },
  ],
  navs: [
    {
      name: '选品',
      role: 'buyer',
      items: [
        {
          title: '1688',
          url: '/selection',
          icon: SiAlibabadotcom as ElementType,
          items: [
            {
              title: '商品数据',
              url: '/selection/alibaba/goods',
            },
            {
              title: '价格监控',
              url: '/selection/alibaba/price',
            },
            {
              title: '状态监控',
              url: '/selection/alibaba/status',
            },
          ],
        },
        // {
        //   title: 'Tiktok',
        //   url: '/selection/tiktok',
        //   icon: SiTiktok as ElementType,
        //   items: [
        //     {
        //       title: 'Introduction',
        //       url: '#',
        //     },
        //     {
        //       title: 'Get Started',
        //       url: '#',
        //     },
        //     {
        //       title: 'Tutorials',
        //       url: '#',
        //     },
        //     {
        //       title: 'Changelog',
        //       url: '#',
        //     },
        //   ],
        // },
      ],
    },
    {
      name: '供应链',
      role: 'buyer',
      items: [
        {
          title: '货品管理',
          url: '/supply-chain/goods',
          icon: Factory as ElementType,
          items: [
            {
              title: '商品数据',
              url: '/supply-chain/goods',
            },
          ],
        },
      ],
    },
    {
      name: '运营',
      role: ['seller'],
      items: [
        {
          title: '三方',
          url: '/third',
          icon: Key as ElementType,
          items: [
            {
              title: '应用管理',
              url: '/third/apps',
            },
            {
              title: '店铺管理',
              url: '/third/stores',
            },
            {
              title: '订单管理',
              url: '/third/orders',
            },
          ],
        },
        {
          title: 'Shopify',
          url: '/platforms/shopify',
          icon: SiShopify as ElementType,
          items: [
            {
              title: '商品列表',
              url: '/platforms/shopify/products',
            },
            {
              title: '产品系列',
              url: '/platforms/shopify/collections',
            },
            {
              title: '标签',
              url: '/platforms/shopify/tags',
            },
            {
              title: '数据分析',
              url: '/platforms/shopify/analytics',
            },
            {
              title: '侵权词管理',
              url: '/platforms/shopify/infringement',
            },
          ],
        },
      ],
    },
    {
      name: '仓储',
      role: 'warehouse',
      items: [
        {
          title: '仓库管理',
          url: '/warehouse',
          icon: IconBuildingWarehouse as ElementType,
          items: [
            {
              title: '库存管理',
              url: '/warehouse/stock',
            },
          ],
        },
      ],
    },
    {
      name: '系统',
      role: ['admin'],
      items: [
        {
          title: '员工',
          url: '/system/users',
          icon: SquareTerminal as ElementType,
          items: [
            {
              title: '用户',
              url: '/system/users/employees',
            },
            {
              title: '角色',
              url: '/system/users/roles',
            },
            {
              title: '权限',
              url: '/system/users/permissions',
            },
            {
              title: '白名单',
              url: '/system/users/whitelist',
            },
          ],
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {data.navs.map((item) => {
          return (
            <NavMain key={item.name} groupName={item.name} items={item.items} />
          );
        })}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
