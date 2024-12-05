import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@rogerogers/ui/breadcrumb';
import { Separator } from '@rogerogers/ui/separator';
import { SidebarTrigger } from '@rogerogers/ui/sidebar';
import React, { Fragment } from 'react';

const PageHeader: React.FC<PageHeaderProps> = ({ breadcrumbs }) => {
  const breadcrumbsLen = breadcrumbs.length;
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => {
              return index < breadcrumbsLen - 1 ? (
                <Fragment key={item.title}>
                  <BreadcrumbItem className="hidden md:block" key={item.title}>
                    <BreadcrumbLink href={item.href} key={item.title}>
                      {item.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </Fragment>
              ) : (
                <BreadcrumbItem key={item.title}>
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default PageHeader;
