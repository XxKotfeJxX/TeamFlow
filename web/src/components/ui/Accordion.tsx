import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/utils";

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  collapsible?: boolean;
  children: React.ReactNode;
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
}

interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// ----------------------------------------------------------------
// Основний Accordion
// ----------------------------------------------------------------
export function Accordion({
  type = "single",
  collapsible = true,
  children,
  className,
  ...props
}: AccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  const context = React.useMemo(
    () => ({ openItem, setOpenItem, type, collapsible }),
    [openItem, type, collapsible]
  );

  return (
    <AccordionContext.Provider value={context}>
      <div className={cn("w-full space-y-2", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// ----------------------------------------------------------------
// Контекст для керування станом
// ----------------------------------------------------------------
interface AccordionContextValue {
  openItem: string | null;
  setOpenItem: (val: string | null) => void;
  type: "single" | "multiple";
  collapsible: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null
);

function useAccordionContext() {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used inside Accordion");
  return ctx;
}

// ----------------------------------------------------------------
// Item
// ----------------------------------------------------------------
interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export function AccordionItem({
  value,
  children,
  className,
  ...props
}: AccordionItemProps) {
  return (
    <div
      data-accordion-item={value}
      className={cn(
        "border border-gray-200 rounded-xl bg-white shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}


// ----------------------------------------------------------------
// Trigger
// ----------------------------------------------------------------
export function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionTriggerProps) {
  const ctx = useAccordionContext();

  // 🧩 Замість parent ref – зберігаємо item через контекст або DOM dataset
  const [itemValue, setItemValue] = React.useState<string | null>(null);
  const ref = React.useRef<HTMLButtonElement>(null);

  // шукаємо data-accordion-item у батьківському div
  React.useEffect(() => {
    const parent = ref.current?.closest("[data-accordion-item]");
    if (parent && parent instanceof HTMLElement) {
      setItemValue(parent.dataset.accordionItem || null);
    }
  }, []);

  const isOpen = ctx.openItem === itemValue;

  const toggle = () => {
    if (!itemValue) return;
    if (ctx.type === "single") {
      if (ctx.openItem === itemValue && ctx.collapsible) {
        ctx.setOpenItem(null);
      } else {
        ctx.setOpenItem(itemValue);
      }
    }
  };

  return (
    <button
      ref={ref}
      onClick={toggle}
      className={cn(
        "w-full flex items-center justify-between px-5 py-4 text-left font-medium text-gray-800 hover:bg-gray-100 rounded-t-xl transition",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "w-5 h-5 text-gray-500 transition-transform",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

// ----------------------------------------------------------------
// Content
// ----------------------------------------------------------------
export function AccordionContent({
  children,
  className,
  ...props
}: AccordionContentProps) {
  const ctx = useAccordionContext();
  const ref = React.useRef<HTMLDivElement>(null);
  const [itemValue, setItemValue] = React.useState<string | null>(null);

  React.useEffect(() => {
    const parent = ref.current?.closest("[data-accordion-item]");
    if (parent && parent instanceof HTMLElement) {
      setItemValue(parent.dataset.accordionItem || null);
    }
  }, []);

  const isOpen = ctx.openItem === itemValue;

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden transition-[max-height] duration-300 ease-in-out",
        isOpen ? "max-h-96" : "max-h-0"
      )}
      {...props}
    >
      <div
        className={cn(
          "px-5 py-4 text-gray-700 bg-gray-50 border-t border-gray-200 rounded-b-xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
