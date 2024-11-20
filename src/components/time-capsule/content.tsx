import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Section {
  sectionId: string;
  title: string;
  content: string;
}

interface UseCaseProps {
  useCase: {
    title: string;
    sections: Section[];
  };
}

export default function Component({ useCase }: UseCaseProps) {
  const processContent = (content: string) => {
    return content.replace(/\\n/g, "\n").replace(/\\"/g, '"');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{useCase.title}</h1>
      {useCase.sections.map((section) => (
        <Card key={section.sectionId} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactMarkdown
              className="prose dark:prose-invert max-w-none"
              components={{
                code({
                  inline,
                  className,
                  children,
                  ...props
                }: {
                  inline?: boolean;
                  className?: string;
                  children?: React.ReactNode;
                } & React.HTMLAttributes<HTMLElement>) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={atomDark as any}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {processContent(section.content)}
            </ReactMarkdown>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
