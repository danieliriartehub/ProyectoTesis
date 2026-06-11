import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQuery, a as useQueryClient, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useRouterState, O as Outlet, H as HeadContent, S as Scripts, d as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root$3 } from "../_libs/radix-ui__react-separator.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { P as Provider, R as Root3, T as Trigger, a as Portal$1, C as Content2 } from "../_libs/radix-ui__react-tooltip.mjs";
import { R as Root$1, F as Fallback, I as Image } from "../_libs/radix-ui__react-avatar.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { R as Root$2, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { B as Box, L as LayoutDashboard, R as Radio, F as FileText, A as Activity, S as Settings, C as ChevronDown, a as Search, P as Plus, b as Bell, T as TriangleAlert, c as Cpu, d as FileCheck, e as TrendingUp, f as ArrowUpRight, g as PanelLeft, X } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip$1, a as Area, B as BarChart, b as Bar, c as Cell } from "../_libs/recharts.mjs";
import { o as objectType, s as stringType, c as coerce, e as enumType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const appCss = "/assets/styles-D3fClt1c.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Separator = reactExports.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$3,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  }
));
Separator.displayName = Root$3.displayName;
const Sheet = Root;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("animate-pulse rounded-md bg-primary/10", className), ...props });
}
const TooltipProvider = Provider;
const Tooltip = Root3;
const TooltipTrigger = Trigger;
const TooltipContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = Content2.displayName;
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = reactExports.createContext(null);
function useSidebar() {
  const context = reactExports.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
const SidebarProvider = reactExports.forwardRef(
  ({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
  }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = reactExports.useState(false);
    const [_open, _setOpen] = reactExports.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = reactExports.useCallback(
      (value) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );
    const toggleSidebar = reactExports.useCallback(() => {
      return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
    }, [isMobile, setOpen, setOpenMobile]);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);
    const state = open ? "expanded" : "collapsed";
    const contextValue = reactExports.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style
        },
        className: cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
          className
        ),
        ref,
        ...props,
        children
      }
    ) }) });
  }
);
SidebarProvider.displayName = "SidebarProvider";
const Sidebar = reactExports.forwardRef(
  ({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...props
  }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    if (collapsible === "none") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
            className
          ),
          ref,
          ...props,
          children
        }
      );
    }
    if (isMobile) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SheetContent,
        {
          "data-sidebar": "sidebar",
          "data-mobile": "true",
          className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
          style: {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE
          },
          side,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "sr-only", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Sidebar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Displays the mobile sidebar." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full flex-col", children })
          ]
        }
      ) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref,
        className: "group peer hidden text-sidebar-foreground md:block",
        "data-state": state,
        "data-collapsible": state === "collapsed" ? collapsible : "",
        "data-variant": variant,
        "data-side": side,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
                "group-data-[collapsible=offcanvas]:w-0",
                "group-data-[side=right]:rotate-180",
                variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
                side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                // Adjust the padding for floating and inset variants.
                variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
                className
              ),
              ...props,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-sidebar": "sidebar",
                  className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
                  children
                }
              )
            }
          )
        ]
      }
    );
  }
);
Sidebar.displayName = "Sidebar";
const SidebarTrigger = reactExports.forwardRef(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      ref,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: cn("h-7 w-7", className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeft, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
const SidebarRail = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        ref,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: toggleSidebar,
        title: "Toggle Sidebar",
        className: cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          className
        ),
        ...props
      }
    );
  }
);
SidebarRail.displayName = "SidebarRail";
const SidebarInset = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        ref,
        className: cn(
          "relative flex w-full flex-1 flex-col bg-background",
          "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
          className
        ),
        ...props
      }
    );
  }
);
SidebarInset.displayName = "SidebarInset";
const SidebarInput = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input,
    {
      ref,
      "data-sidebar": "input",
      className: cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      ),
      ...props
    }
  );
});
SidebarInput.displayName = "SidebarInput";
const SidebarHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "header",
        className: cn("flex flex-col gap-2 p-2", className),
        ...props
      }
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";
const SidebarFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "footer",
        className: cn("flex flex-col gap-2 p-2", className),
        ...props
      }
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";
const SidebarSeparator = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Separator,
    {
      ref,
      "data-sidebar": "separator",
      className: cn("mx-2 w-auto bg-sidebar-border", className),
      ...props
    }
  );
});
SidebarSeparator.displayName = "SidebarSeparator";
const SidebarContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "content",
        className: cn(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
          className
        ),
        ...props
      }
    );
  }
);
SidebarContent.displayName = "SidebarContent";
const SidebarGroup = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "group",
        className: cn("relative flex w-full min-w-0 flex-col p-2", className),
        ...props
      }
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";
const SidebarGroupLabel = reactExports.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "group-label",
      className: cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
const SidebarGroupAction = reactExports.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "group-action",
      className: cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";
const SidebarGroupContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  )
);
SidebarGroupContent.displayName = "SidebarGroupContent";
const SidebarMenu = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      ref,
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  )
);
SidebarMenu.displayName = "SidebarMenu";
const SidebarMenuItem = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "li",
    {
      ref,
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  )
);
SidebarMenuItem.displayName = "SidebarMenuItem";
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring cursor-pointer transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const SidebarMenuButton = reactExports.forwardRef(
  ({
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    className,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();
    const button = /* @__PURE__ */ jsxRuntimeExports.jsx(
      Comp,
      {
        ref,
        "data-sidebar": "menu-button",
        "data-size": size,
        "data-active": isActive,
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
        ...props
      }
    );
    if (!tooltip) {
      return button;
    }
    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip
      };
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: button }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TooltipContent,
        {
          side: "right",
          align: "center",
          hidden: state !== "collapsed" || isMobile,
          ...tooltip
        }
      )
    ] });
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";
const SidebarMenuAction = reactExports.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "menu-action",
      className: cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";
const SidebarMenuBadge = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      "data-sidebar": "menu-badge",
      className: cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  )
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";
const SidebarMenuSkeleton = reactExports.forwardRef(({ className, showIcon = false, ...props }, ref) => {
  const width = reactExports.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      "data-sidebar": "menu-skeleton",
      className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-4 rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "h-4 max-w-(--skeleton-width) flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    }
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
const SidebarMenuSub = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      ref,
      "data-sidebar": "menu-sub",
      className: cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  )
);
SidebarMenuSub.displayName = "SidebarMenuSub";
const SidebarMenuSubItem = reactExports.forwardRef(
  ({ ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { ref, ...props })
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
const SidebarMenuSubButton = reactExports.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
const __vite_import_meta_env__ = {};
const BASE_URL = __vite_import_meta_env__?.VITE_API_URL?.replace(/\/$/, "") ?? "https://proyectotesisbackend-production.up.railway.app";
const TOKEN_KEY = "infrainspect_token";
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
function setToken(token) {
  if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token);
}
function clearToken() {
  if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
}
class ApiError extends Error {
  constructor(status, detail) {
    super(detail);
    this.status = status;
    this.detail = detail;
    this.name = "ApiError";
  }
  status;
  detail;
}
function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}
function keysToCamel(obj) {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToCamel(v));
  } else if (obj !== null && typeof obj === "object" && !(obj instanceof Date)) {
    return Object.keys(obj).reduce((result, key) => {
      result[toCamelCase(key)] = keysToCamel(obj[key]);
      return result;
    }, {});
  }
  return obj;
}
async function handleResponse(res) {
  if (res.status === 401) {
    clearToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new ApiError(401, "Session expired");
  }
  if (!res.ok) {
    let detail = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      detail = body.detail ?? detail;
    } catch {
    }
    throw new ApiError(res.status, detail);
  }
  if (res.status === 204) return void 0;
  const json = await res.json();
  return keysToCamel(json);
}
function authHeaders(extra) {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...token ? { Authorization: `Bearer ${token}` } : {},
    ...extra
  };
}
const api = {
  get(path) {
    return fetch(`${BASE_URL}${path}`, {
      method: "GET",
      headers: authHeaders()
    }).then((r) => handleResponse(r));
  },
  post(path, body) {
    return fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: authHeaders(),
      body: body !== void 0 ? JSON.stringify(body) : void 0
    }).then((r) => handleResponse(r));
  },
  patch(path, body) {
    return fetch(`${BASE_URL}${path}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: body !== void 0 ? JSON.stringify(body) : void 0
    }).then((r) => handleResponse(r));
  },
  delete(path) {
    return fetch(`${BASE_URL}${path}`, {
      method: "DELETE",
      headers: authHeaders()
    }).then((r) => handleResponse(r));
  },
  /** Multipart upload — does NOT set Content-Type so browser adds boundary */
  upload(path, formData) {
    const token = getToken();
    return fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData
    }).then((r) => handleResponse(r));
  }
};
const sessionsApi = {
  list(params) {
    const qs = new URLSearchParams();
    if (params?.skip != null) qs.set("skip", String(params.skip));
    if (params?.limit != null) qs.set("limit", String(params.limit));
    const q = qs.toString();
    return api.get(`/api/v1/sessions${q ? `?${q}` : ""}`);
  },
  get(id) {
    return api.get(`/api/v1/sessions/${id}`);
  },
  create(data) {
    return api.post("/api/v1/sessions", data);
  },
  update(id, data) {
    return api.patch(`/api/v1/sessions/${id}`, data);
  },
  evidences(sessionId) {
    return api.get(`/api/v1/sessions/${sessionId}/evidences`);
  },
  findings(sessionId) {
    return api.get(`/api/v1/sessions/${sessionId}/findings`);
  },
  jobs(sessionId) {
    return api.get(`/api/v1/sessions/${sessionId}/jobs`);
  },
  report(sessionId) {
    return api.get(`/api/v1/sessions/${sessionId}/report`);
  }
};
const infrastructureApi = {
  list() {
    return api.get("/api/v1/infrastructure");
  },
  get(id) {
    return api.get(`/api/v1/infrastructure/${id}`);
  },
  create(data) {
    return api.post("/api/v1/infrastructure", data);
  },
  update(id, data) {
    return api.patch(`/api/v1/infrastructure/${id}`, data);
  }
};
const evidencesApi = {
  /**
   * Upload a file as multipart/form-data.
   * The backend triggers a Celery job automatically (Fase 3+).
   */
  upload(file, meta) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("session_id", meta.session_id);
    if (meta.type) fd.append("type", meta.type);
    if (meta.captured_at) fd.append("captured_at", meta.captured_at);
    if (meta.geo_lat != null) fd.append("geo_lat", String(meta.geo_lat));
    if (meta.geo_lng != null) fd.append("geo_lng", String(meta.geo_lng));
    if (meta.geo_alt != null) fd.append("geo_alt", String(meta.geo_alt));
    if (meta.tags) fd.append("tags", meta.tags);
    return api.upload("/api/v1/evidences", fd);
  },
  /** Register an RTMP drone stream (Fase 4) */
  registerRtmp(data) {
    return api.post("/api/v1/evidences/rtmp", data);
  },
  get(id) {
    return api.get(`/api/v1/evidences/${id}`);
  },
  updateStatus(id, status) {
    return api.patch(`/api/v1/evidences/${id}/status`, { status });
  }
};
const findingsApi = {
  list(params) {
    const qs = new URLSearchParams();
    if (params?.session_id) qs.set("session_id", params.session_id);
    if (params?.evidence_id) qs.set("evidence_id", params.evidence_id);
    const q = qs.toString();
    return api.get(`/api/v1/findings${q ? `?${q}` : ""}`);
  },
  get(id) {
    return api.get(`/api/v1/findings/${id}`);
  },
  create(data) {
    return api.post("/api/v1/findings", data);
  },
  update(id, data) {
    return api.patch(`/api/v1/findings/${id}`, data);
  }
};
const jobsApi = {
  create(data) {
    return api.post("/api/v1/analysis-jobs", data);
  },
  get(id) {
    return api.get(`/api/v1/analysis-jobs/${id}`);
  },
  update(id, data) {
    return api.patch(`/api/v1/analysis-jobs/${id}`, data);
  }
};
const reportsApi = {
  generate(sessionId) {
    return api.post(`/api/v1/reports/generate/${sessionId}`, {});
  },
  get(id) {
    return api.get(`/api/v1/reports/${id}`);
  },
  update(id, data) {
    return api.patch(`/api/v1/reports/${id}`, data);
  }
};
const authApi = {
  async login(data) {
    const res = await api.post("/api/v1/auth/login", data);
    setToken(res.accessToken);
    return res;
  },
  async register(data) {
    return api.post("/api/v1/auth/register", data);
  },
  async me() {
    return api.get("/api/v1/auth/me");
  }
};
const QK = {
  me: ["me"],
  sessions: (params) => ["sessions", params],
  session: (id) => ["sessions", id],
  sessionEvidences: (id) => ["sessions", id, "evidences"],
  sessionFindings: (id) => ["sessions", id, "findings"],
  sessionJobs: (id) => ["sessions", id, "jobs"],
  sessionReport: (id) => ["sessions", id, "report"],
  findings: (params) => ["findings", params],
  jobs: ["jobs"],
  infrastructure: ["infrastructure"]
};
function useMe() {
  return useQuery({ queryKey: QK.me, queryFn: authApi.me, retry: false });
}
function useSessions(params) {
  return useQuery({
    queryKey: QK.sessions(params),
    queryFn: () => sessionsApi.list(params)
  });
}
function useSession(id) {
  return useQuery({
    queryKey: QK.session(id),
    queryFn: () => sessionsApi.get(id),
    enabled: !!id
  });
}
function useCreateSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => sessionsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sessions"] })
  });
}
function useSessionEvidences(sessionId) {
  return useQuery({
    queryKey: QK.sessionEvidences(sessionId),
    queryFn: () => sessionsApi.evidences(sessionId),
    enabled: !!sessionId
  });
}
function useUploadEvidence(sessionId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ file, meta }) => evidencesApi.upload(file, meta),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QK.sessionEvidences(sessionId) });
      qc.invalidateQueries({ queryKey: QK.session(sessionId) });
      qc.invalidateQueries({ queryKey: QK.sessionJobs(sessionId) });
    }
  });
}
function useSessionFindings(sessionId) {
  return useQuery({
    queryKey: QK.sessionFindings(sessionId),
    queryFn: () => sessionsApi.findings(sessionId),
    enabled: !!sessionId
  });
}
function useFindings(params) {
  return useQuery({
    queryKey: QK.findings(params),
    queryFn: () => findingsApi.list(params)
  });
}
function useUpdateFinding(sessionId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => findingsApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["findings"] });
      if (sessionId) qc.invalidateQueries({ queryKey: QK.sessionFindings(sessionId) });
    }
  });
}
function useSessionJobs(sessionId) {
  return useQuery({
    queryKey: QK.sessionJobs(sessionId),
    queryFn: () => sessionsApi.jobs(sessionId),
    enabled: !!sessionId,
    // Poll every 5s while there are active jobs
    refetchInterval: (query) => {
      const jobs = query.state.data;
      if (!jobs) return false;
      const active = jobs.some((j) => j.status === "queued" || j.status === "running");
      return active ? 5e3 : false;
    }
  });
}
function useCreateJob(sessionId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => jobsApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QK.sessionJobs(sessionId) });
      qc.invalidateQueries({ queryKey: QK.sessionEvidences(sessionId) });
    }
  });
}
function useAllJobs(sessionIds) {
  return useQuery({
    queryKey: [...QK.jobs, sessionIds],
    queryFn: async () => {
      const all = await Promise.all(sessionIds.map((id) => sessionsApi.jobs(id)));
      return all.flat();
    },
    enabled: sessionIds.length > 0,
    refetchInterval: 5e3
  });
}
function useInfrastructure() {
  return useQuery({
    queryKey: QK.infrastructure,
    queryFn: infrastructureApi.list
  });
}
function useCreateInfrastructure() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => infrastructureApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.infrastructure })
  });
}
function useSessionReport(sessionId) {
  return useQuery({
    queryKey: QK.sessionReport(sessionId),
    queryFn: () => sessionsApi.report(sessionId),
    enabled: !!sessionId,
    retry: false
  });
}
function useGenerateReport(sessionId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => reportsApi.generate(sessionId),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.sessionReport(sessionId) })
  });
}
const nav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Sesiones", url: "/sessions", icon: Radio },
  { title: "Reportes", url: "/reports", icon: FileText },
  { title: "Procesamiento IA", url: "/jobs", icon: Activity }
];
const secondary = [
  { title: "Configuración", url: "/settings", icon: Settings }
];
function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: me } = useMe();
  const isActive = (url) => url === "/" ? pathname === "/" : pathname.startsWith(url);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sidebar, { collapsible: "icon", className: "border-r-0 bg-[#0d1321]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarHeader, { className: `border-b-0 py-6 ${collapsed ? "px-2" : "px-4"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center ${collapsed ? "justify-center" : "gap-3"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-transparent border border-primary/30 glow-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "h-5 w-5 text-primary" }) }),
      !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-lg font-bold tracking-tight text-white leading-tight", children: "InfraInspect" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-xs text-muted-foreground leading-tight", children: "v2.0" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarContent, { className: "px-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { className: "gap-2", children: nav.map((item) => {
        const active = isActive(item.url);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SidebarMenuButton,
          {
            asChild: true,
            isActive: active,
            className: `h-11 rounded-lg transition-all duration-200 ${active ? "bg-primary/10 text-primary font-medium border-l-2 border-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground border-l-2 border-transparent"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.url, className: `flex items-center h-full w-full ${collapsed ? "justify-center" : "gap-3 px-3"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: `h-5 w-5 shrink-0 ${active ? "text-primary" : ""}` }),
              !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title })
            ] })
          }
        ) }, item.url);
      }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupLabel, { className: "font-sans text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-2 px-3", children: "Administración" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { className: "gap-2", children: secondary.map((item) => {
          const active = isActive(item.url);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SidebarMenuButton,
            {
              asChild: true,
              isActive: active,
              className: `h-11 rounded-lg transition-all duration-200 ${active ? "bg-primary/10 text-primary font-medium border-l-2 border-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground border-l-2 border-transparent"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.url, className: `flex items-center h-full w-full ${collapsed ? "justify-center" : "gap-3 px-3"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: `h-5 w-5 shrink-0 ${active ? "text-primary" : ""}` }),
                !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title })
              ] })
            }
          ) }, item.url);
        }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarFooter, { className: "border-t-0 p-4 space-y-4", children: [
      !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-xl bg-gradient-subtle border border-glass p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-8 -mt-8 opacity-20 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "120", height: "120", viewBox: "0 0 100 100", className: "text-primary stroke-current", fill: "none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z", strokeWidth: "2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M50 10 L50 50 L90 30", strokeWidth: "2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 30 L50 50 L50 90", strokeWidth: "2" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-white text-sm relative z-10", children: "Plan Profesional" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 mb-3 relative z-10", children: "Activo hasta 12/12/2026" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 rounded-lg py-2 text-xs font-semibold transition-colors relative z-10 glow-primary", children: "Mejorar plan" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center ${collapsed ? "justify-center pb-2" : "justify-between pt-2"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center ${collapsed ? "justify-center w-full" : "gap-3"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary", children: me?.full_name?.[0]?.toUpperCase() || me?.email?.[0]?.toUpperCase() || "U" }),
          !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-white leading-tight truncate", children: me?.full_name || "Usuario" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-tight truncate", children: me?.role === "admin" ? "Administrador" : "Inspector" })
          ] })
        ] }),
        !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground shrink-0" })
      ] })
    ] })
  ] });
}
const Avatar = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$1,
  {
    ref,
    className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
    ...props
  }
));
Avatar.displayName = Root$1.displayName;
const AvatarImage = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = Image.displayName;
const AvatarFallback = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = Fallback.displayName;
function AppHeader() {
  const { data: me } = useMe();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarTrigger, { className: "text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-severity-low animate-pulse" }),
      "Sistema operativo"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden md:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Buscar sesión, hallazgo, activo…",
            className: "h-9 w-72 pl-8 font-mono text-xs"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "font-mono uppercase tracking-wider text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/sessions/new", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
        " Nueva sesión"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "icon", variant: "ghost", className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-severity-critical" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-8 w-8 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/20 text-primary text-xs font-semibold", children: me?.full_name?.[0]?.toUpperCase() || me?.email?.[0]?.toUpperCase() || "U" }) })
    ] })
  ] });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const AuthContext = reactExports.createContext(null);
function AuthProvider({ children }) {
  const [state, setState] = reactExports.useState({ user: null, isLoading: true });
  reactExports.useEffect(() => {
    if (!getToken()) {
      setState({ user: null, isLoading: false });
      return;
    }
    authApi.me().then((user) => setState({ user, isLoading: false })).catch(() => {
      clearToken();
      setState({ user: null, isLoading: false });
    });
  }, []);
  async function login(email, password) {
    const res = await authApi.login({ email, password });
    setState({ user: res.user, isLoading: false });
  }
  function logout() {
    clearToken();
    setState({ user: null, isLoading: false });
    window.location.href = "/login";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: { ...state, login, logout }, children });
}
function useAuth() {
  const ctx = reactExports.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "InfraInspect AI — Inspección de Infraestructura con IA" },
      { name: "description", content: "Plataforma SaaS de inspección de infraestructura crítica con IA, sesiones, evidencias y reportes." },
      { property: "og:title", content: "InfraInspect AI" },
      { property: "og:description", content: "Inspección de infraestructura crítica con IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "es", className: "dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "font-sans antialiased", children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLogin = pathname === "/login";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    isLogin ? /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen w-full bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen w-full bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppSidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] }) });
}
const $$splitComponentImporter$6 = () => import("./settings-BMXBSyjo.mjs");
const Route$7 = createFileRoute("/settings")({
  head: () => ({
    meta: [{
      title: "Configuración — InfraInspect AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./reports-DpRhBE_a.mjs");
const Route$6 = createFileRoute("/reports")({
  head: () => ({
    meta: [{
      title: "Reportes — InfraInspect AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./login-BCiMJcnt.mjs");
const Route$5 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Iniciar sesión — InfraInspect AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
objectType({
  email: stringType().email("Email inválido"),
  password: stringType().min(6, "Mínimo 6 caracteres")
});
const $$splitComponentImporter$3 = () => import("./jobs-DcSEsIMb.mjs");
const Route$4 = createFileRoute("/jobs")({
  head: () => ({
    meta: [{
      title: "Procesamiento IA — InfraInspect AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$2,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root$2.displayName;
const sessionStatusMap = {
  Draft: "bg-destructive/15 text-destructive border-destructive/40",
  Capturing: "bg-[#f97316]/15 text-[#f97316] border-[#f97316]/40",
  Processing: "bg-[#eab308]/15 text-[#eab308] border-[#eab308]/40",
  Review: "bg-primary/15 text-primary border-primary/40",
  Completed: "bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/40"
};
function SessionStatusBadge({ status, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn(
    "inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-xs font-mono uppercase tracking-wider",
    sessionStatusMap[status],
    className
  ), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-current animate-pulse" }),
    status
  ] });
}
const findingStatusMap = {
  pending: { label: "Pendiente", cls: "bg-muted text-muted-foreground border-border" },
  validated: { label: "Validado", cls: "bg-severity-low/15 text-severity-low border-severity-low/40" },
  rejected: { label: "Rechazado", cls: "bg-destructive/15 text-destructive border-destructive/40" },
  needs_review: { label: "Revisar", cls: "bg-severity-medium/15 text-severity-medium border-severity-medium/40" }
};
function FindingStatusBadge({ status }) {
  const s = findingStatusMap[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex items-center rounded border px-2 py-0.5 text-xs font-mono uppercase tracking-wider", s.cls), children: s.label });
}
const jobStatusMap = {
  queued: { label: "En cola", cls: "bg-muted text-muted-foreground border-border" },
  running: { label: "Ejecutando", cls: "bg-primary/15 text-primary border-primary/40" },
  succeeded: { label: "Completado", cls: "bg-severity-low/15 text-severity-low border-severity-low/40" },
  failed: { label: "Fallido", cls: "bg-destructive/15 text-destructive border-destructive/40" }
};
function JobStatusBadge({ status }) {
  const s = jobStatusMap[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex items-center rounded border px-2 py-0.5 text-xs font-mono uppercase tracking-wider", s.cls), children: s.label });
}
const Route$3 = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — InfraInspect AI" },
      { name: "description", content: "Estado operativo de inspecciones, hallazgos y reportes." }
    ]
  }),
  component: Dashboard
});
const trendData = [
  { day: "Vie", findings: 12, critical: 1 },
  { day: "Sáb", findings: 18, critical: 2 },
  { day: "Dom", findings: 9, critical: 0 },
  { day: "Lun", findings: 24, critical: 3 },
  { day: "Mar", findings: 31, critical: 4 },
  { day: "Mié", findings: 28, critical: 2 },
  { day: "Jue", findings: 41, critical: 5 }
];
function Dashboard() {
  const { data: sessionsData } = useSessions({ limit: 100 });
  const { data: findingsData } = useFindings();
  const sessions = sessionsData?.items ?? [];
  const findings = findingsData ?? [];
  const sessionIds = sessions.map((s) => s.id);
  const { data: allJobs = [] } = useAllJobs(sessionIds);
  const activeSessions = sessions.filter(
    (s) => ["Capturing", "Processing", "Review"].includes(s.status)
  );
  const critical = findings.filter((f) => f.severity === "critical").length;
  const high = findings.filter((f) => f.severity === "high").length;
  const medium = findings.filter((f) => f.severity === "medium").length;
  const low = findings.filter((f) => f.severity === "low").length;
  const info = findings.filter((f) => f.severity === "info").length;
  const runningJobs = allJobs.filter((j) => j.status === "running").length;
  const queuedJobs = allJobs.filter((j) => j.status === "queued").length;
  const severityData = [
    { name: "Crítico", value: critical, color: "var(--severity-critical)" },
    { name: "Alto", value: high, color: "var(--severity-high)" },
    { name: "Medio", value: medium, color: "var(--severity-medium)" },
    { name: "Bajo", value: low, color: "var(--severity-low)" },
    { name: "Info", value: info, color: "var(--severity-info)" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
          "Centro de operaciones · ",
          (/* @__PURE__ */ new Date()).toLocaleDateString("es-PE", { dateStyle: "full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight mt-1", children: "Dashboard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sessions", children: "Ver sesiones" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sessions/new", children: "Nueva inspección" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          icon: Radio,
          label: "Inspecciones activas",
          value: activeSessions.length,
          hint: `${sessions.length} totales`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          icon: TriangleAlert,
          label: "Hallazgos detectados",
          value: findings.length,
          hint: `${critical} críticos`,
          accent: "critical"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          icon: Cpu,
          label: "Jobs IA en ejecución",
          value: runningJobs,
          hint: `${queuedJobs} en cola`,
          accent: "info"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          icon: FileCheck,
          label: "Sesiones completadas",
          value: sessions.filter((s) => s.status === "Completed").length,
          hint: `${sessions.length} totales`
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "flex flex-row items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-mono uppercase tracking-widest text-muted-foreground", children: "Hallazgos · últimos 7 días" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-baseline gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold font-mono", children: findings.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-severity-low flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
              " en tiempo real"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: trendData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "g1", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "var(--primary)", stopOpacity: 0.4 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "var(--primary)", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", stroke: "var(--muted-foreground)", fontSize: 11, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip$1,
            {
              contentStyle: {
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                fontSize: 12
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "findings", stroke: "var(--primary)", fill: "url(#g1)", strokeWidth: 2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "critical", stroke: "var(--severity-critical)", fill: "transparent", strokeWidth: 2 })
        ] }) }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-mono uppercase tracking-widest text-muted-foreground", children: "Riesgo por severidad" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: severityData, layout: "vertical", margin: { left: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", horizontal: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", stroke: "var(--muted-foreground)", fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { dataKey: "name", type: "category", stroke: "var(--muted-foreground)", fontSize: 11, width: 60 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip$1,
            {
              contentStyle: {
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                fontSize: 12
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", radius: [0, 4, 4, 0], children: severityData.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, i)) })
        ] }) }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-mono uppercase tracking-widest text-muted-foreground", children: "Inspecciones activas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/sessions", className: "font-mono text-xs uppercase tracking-wider", children: [
          "Ver todas ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        activeSessions.slice(0, 5).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/sessions/$sessionId",
            params: { sessionId: s.id },
            className: "block rounded border border-border p-3 hover:border-primary/40 hover:bg-muted/30 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: s.code }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SessionStatusBadge, { status: s.status })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mt-1 truncate", children: s.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    s.infrastructure.type,
                    " · ",
                    s.infrastructure.location
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-2xl font-bold", children: [
                    s.progress,
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: [
                    s.evidenceCount,
                    " evidencias · ",
                    s.findingsCount,
                    " hallazgos"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: s.progress, className: "mt-3 h-1" })
            ]
          },
          s.id
        )),
        activeSessions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-8", children: "No hay inspecciones activas" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5" }),
        " Estado IA"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        allJobs.slice(0, 5).map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: j.model }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              j.progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: j.progress, className: "h-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10px] uppercase text-muted-foreground", children: [
            j.status,
            " · ",
            j.findingsProduced,
            " hallazgos"
          ] })
        ] }, j.id)),
        allJobs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center py-4", children: "Sin jobs activos" })
      ] })
    ] })
  ] });
}
function KpiCard({
  icon: Icon,
  label,
  value,
  hint,
  trend,
  accent
}) {
  const accentCls = accent === "critical" ? "text-severity-critical" : accent === "info" ? "text-accent" : "text-primary";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${accentCls}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold font-mono", children: value }),
      trend && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-severity-low", children: trend })
    ] }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: hint })
  ] }) });
}
const $$splitComponentImporter$2 = () => import("./sessions.index-BIhC4o2g.mjs");
const Route$2 = createFileRoute("/sessions/")({
  head: () => ({
    meta: [{
      title: "Sesiones de Inspección — InfraInspect AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./sessions.new-C4c5VYqD.mjs");
const Route$1 = createFileRoute("/sessions/new")({
  head: () => ({
    meta: [{
      title: "Nueva sesión — InfraInspect AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
objectType({
  title: stringType().min(4, "Mínimo 4 caracteres").max(120),
  location: stringType().max(120).optional(),
  description: stringType().max(500).optional(),
  scheduledFor: stringType().optional(),
  infraMode: enumType(["existing", "new"]),
  infraId: stringType().optional(),
  infraName: stringType().max(80).optional(),
  infraType: stringType().optional(),
  assetCode: stringType().max(40).optional(),
  lat: coerce.number().min(-90).max(90).optional(),
  lng: coerce.number().min(-180).max(180).optional()
});
const $$splitComponentImporter = () => import("./sessions._sessionId-DK3hDkEd.mjs");
const Route = createFileRoute("/sessions/$sessionId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SettingsRoute = Route$7.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$8
});
const ReportsRoute = Route$6.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => Route$8
});
const LoginRoute = Route$5.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$8
});
const JobsRoute = Route$4.update({
  id: "/jobs",
  path: "/jobs",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const SessionsIndexRoute = Route$2.update({
  id: "/sessions/",
  path: "/sessions/",
  getParentRoute: () => Route$8
});
const SessionsNewRoute = Route$1.update({
  id: "/sessions/new",
  path: "/sessions/new",
  getParentRoute: () => Route$8
});
const SessionsSessionIdRoute = Route.update({
  id: "/sessions/$sessionId",
  path: "/sessions/$sessionId",
  getParentRoute: () => Route$8
});
const rootRouteChildren = {
  IndexRoute,
  JobsRoute,
  LoginRoute,
  ReportsRoute,
  SettingsRoute,
  SessionsSessionIdRoute,
  SessionsNewRoute,
  SessionsIndexRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  Card as C,
  FindingStatusBadge as F,
  Input as I,
  JobStatusBadge as J,
  Progress as P,
  Route as R,
  SessionStatusBadge as S,
  CardHeader as a,
  CardTitle as b,
  cn as c,
  CardContent as d,
  CardDescription as e,
  useAuth as f,
  useAllJobs as g,
  useMe as h,
  useInfrastructure as i,
  useCreateSession as j,
  useCreateInfrastructure as k,
  useSession as l,
  useSessionEvidences as m,
  useSessionFindings as n,
  useSessionJobs as o,
  useSessionReport as p,
  useCreateJob as q,
  useGenerateReport as r,
  sessionsApi as s,
  useUpdateFinding as t,
  useSessions as u,
  useUploadEvidence as v,
  router as w
};
