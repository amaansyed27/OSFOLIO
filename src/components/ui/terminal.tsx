
import React from 'react';
import { cn } from '@/lib/utils';

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
}

interface TerminalCommandProps {
  prompt: string;
  command: string;
  className?: string;
}

interface TerminalResponseProps {
  children: React.ReactNode;
  className?: string;
}

interface TerminalPromptProps {
  prompt: string;
  className?: string;
}

// Define the Terminal component type with its subcomponents
type TerminalComponent = React.ForwardRefExoticComponent<
  TerminalProps & React.RefAttributes<HTMLDivElement>
> & {
  Command: React.ForwardRefExoticComponent<
    TerminalCommandProps & React.RefAttributes<HTMLDivElement>
  >;
  Response: React.ForwardRefExoticComponent<
    TerminalResponseProps & React.RefAttributes<HTMLDivElement>
  >;
  Prompt: React.ForwardRefExoticComponent<
    TerminalPromptProps & React.RefAttributes<HTMLDivElement>
  >;
};

const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('bg-black/30 text-white p-4 rounded-lg font-mono text-sm overflow-y-auto', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
) as TerminalComponent;

Terminal.displayName = 'Terminal';

const TerminalCommand = React.forwardRef<HTMLDivElement, TerminalCommandProps>(
  ({ prompt, command, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-start mb-2', className)} {...props}>
        <span className="text-green-400 mr-2">{prompt} $</span>
        <span className="text-white">{command}</span>
      </div>
    );
  }
);

TerminalCommand.displayName = 'TerminalCommand';

const TerminalResponse = React.forwardRef<HTMLDivElement, TerminalResponseProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('pl-4 mb-4 text-white/80', className)} {...props}>
        {children}
      </div>
    );
  }
);

TerminalResponse.displayName = 'TerminalResponse';

const TerminalPrompt = React.forwardRef<HTMLDivElement, TerminalPromptProps>(
  ({ prompt, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center', className)} {...props}>
        <span className="text-green-400 mr-2">{prompt} $</span>
        <span className="w-2 h-4 bg-white/80 animate-pulse-slow"></span>
      </div>
    );
  }
);

TerminalPrompt.displayName = 'TerminalPrompt';

// Attach subcomponents to main component
Terminal.Command = TerminalCommand;
Terminal.Response = TerminalResponse;
Terminal.Prompt = TerminalPrompt;

export { Terminal };
