import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumbs
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Outlet } from "react-router-dom"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex  mt-2 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <header className="flex items-center gap-3 px-6 py-4  bg-white/70 backdrop-blur">
      <div className="flex items-center gap-3 mt-2">

        <div>
          <h1 className=" heading text-xl  font-bold">Chat Assistant</h1>
          <p className=" paragraph text-xs ">
            Smart replies • Memory • Multi-chat support
          </p>
        </div>
      </div>
    </header>
            {/* <Breadcrumbs/> */}
          </div>
        </header>
        <div className="flex  flex-1    flex-col gap-4 p-4">
          <Outlet/>
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
