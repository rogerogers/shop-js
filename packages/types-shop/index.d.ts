declare interface ServerParams {
  params: { slug: string; handle: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

declare type Attribute = {
  attribute_id: string;
  attribute_name: string;
  visible_in_storefront: boolean;
  filterable_in_dashboard: boolean;
  filterable_in_storefront: boolean;
  storefront_search_position: number;
};

declare type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

declare type PageHeaderProps = {
  title: string;
  description: string;
  breadcrumbs: {
    title: string;
    href: string;
  }[];
};

declare module '@rogerogers/platform-shopify' {
  export type ShopifyProduct = {
    id: number;
    shopify_product_id: string;
    title: string;
    handle: string;
    description: string;
    descriptionHtml: string;
    mediaCount: number;
    imageUrl: string;
    created_at: string;
  };
}

declare type ThirdStore = {
  id: number;
  name: string;
};
