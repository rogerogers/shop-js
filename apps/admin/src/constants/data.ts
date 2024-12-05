import { NavItemWithOptionalChildren } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export type Attribute = {
  attribute_id: string;
  attribute_name: string;
  visible_in_storefront: boolean;
  filterable_in_dashboard: boolean;
  filterable_in_storefront: boolean;
  storefront_search_position: number;
};

export type Platform = {
  id: number;
  name: string;
  description: string;
  platform: {
    id: number;
    name: string;
    logo: string;
  };
};

export type Application = {
  name: string;
  id: number;
  app_key: string;
  scope: string;
  callback_url: string;
};

export type Store = {
  id: number;
  name: string;
  store_url: string;
  application: Application;
};

export type SalesChannel = {
  id: number;
  name: string;
  description?: string;
  is_enabled: boolean;
};

export type AttributeValue = {
  attribute_id: string;
  is_enabled: boolean;
  name_cn: string;
  name_en: string;
  rank: number;
};

export const users: User[] = [];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItemWithOptionalChildren[] = [
  {
    title: '面板',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
  },
  {
    title: '员工',
    href: '/users',
    icon: 'users',
    label: 'users',
    items: [
      {
        title: '用户',
        href: '/users/employees',
        icon: 'user',
        label: 'employees',
      },
      {
        title: '角色',
        href: '/users/roles',
        icon: 'usersGroup',
        label: 'role',
      },
      {
        title: '权限',
        href: '/users/permissions',
        icon: 'shield',
        label: 'permissions',
      },
      {
        title: '白名单',
        href: '/users/whitelist',
        icon: 'userCheck',
        label: 'whitelist',
      },
    ],
  },
  {
    title: '选品',
    href: '/selection',
    icon: 'tools',
    label: 'selection',
    items: [
      {
        title: '1688',
        href: '/selection/alibaba',
        icon: 'shoppingBag',
        label: 'selectionAlibaba',
        items: [
          {
            title: '商品数据',
            href: '/selection/alibaba/goods',
            icon: 'shoppingBag',
            label: 'selectionAlibabaList',
          },
          {
            title: '价格监控',
            href: '/selection/alibaba/price',
            icon: 'chartLine',
            label: 'selectionAlibabaPrice',
          },
        ],
      },
      {
        title: 'Tiktok',
        href: '/selection/tiktok',
        icon: 'tiktok',
        label: 'selectionTiktok',
      },
    ],
  },
  {
    title: '供应链',
    href: '/supply-chain',
    icon: 'package',
    label: 'goods',
    items: [
      {
        title: '货品管理',
        href: '/supply-chain/goods',
        icon: 'barcode',
        label: 'goodsManagement',
      },
    ],
  },
  {
    title: '三方',
    href: '/third',
    icon: 'robot',
    label: 'third',
    items: [
      {
        title: '应用管理',
        href: '/third/apps',
        icon: 'appstore',
        label: 'thirdApps',
      },
      {
        title: '店铺管理',
        href: '/third/stores',
        icon: 'store',
        label: 'thirdStores',
      },
      {
        title: '订单管理',
        href: '/third/orders',
        icon: 'list',
        label: 'thirdOrders',
      },
    ],
  },
  {
    title: '平台',
    href: '/platforms',
    icon: 'arrowsV',
    label: 'discount',
    items: [
      {
        title: 'Shopify',
        href: '/platforms/shopify',
        icon: 'point',
        label: 'platformsShopify',
        items: [
          {
            title: '商品数据',
            href: '/selection/alibaba/goods',
            icon: 'shoppingBag',
            label: 'selectionAlibabaList',
          },
        ],
      },
      {
        title: 'Wholesale',
        href: '/platforms/wholesale',
        icon: 'point',
        label: 'platformsWholesale',
        items: [
          {
            title: '商品',
            href: '/products',
            icon: 'shoppingBag',
            label: 'products',
          },
          {
            title: '属性',
            href: '/attributes',
            icon: 'employee',
            label: 'attributes',
          },
          {
            title: '分类',
            href: '/categories',
            icon: 'category',
            label: 'categories',
          },
          {
            title: '折扣',
            href: '/discount',
            icon: 'discount',
            label: 'discount',
          },
          {
            title: '订单',
            href: '/orders',
            icon: 'list',
            label: 'orders',
          },
          {
            title: '履约',
            href: '/shippings',
            icon: 'truck',
            label: 'shippings',
          },
          {
            title: '顾客',
            href: '/customers',
            icon: 'user',
            label: 'customers',
          },
          {
            title: '分析',
            href: '/analytics',
            icon: 'analytics',
            label: 'analytics',
          },
          {
            title: '渠道',
            href: '/sales-channels',
            icon: 'spider',
            label: 'sales-channels',
          },
        ],
      },
    ],
  },
  {
    title: '采购',
    href: '/purchase',
    icon: 'contract',
    label: 'purchase',
    items: [
      {
        title: '仓库地址',
        href: '/purchase/address',
        icon: 'warehouse',
        label: 'purchaseAddress',
      },
      {
        title: '采购订单',
        href: '/purchase/orders',
        icon: 'list',
        label: 'purchaseOrders',
      },
    ],
  },
];
